const express = require('express');
const router = express.Router();
const Article = require('../schema/Article');
// const jwt = require('../middleware/jwtAuth');

router.put('/approve-article/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const articleToApprove = await Article.findById(id);
        if (!articleToApprove) {
            return res.status(404).json({ error: 'Article not found' });
        }

        if (articleToApprove.isApproved) {
            return res.status(400).json({ error: 'Article already approved' });
        }

        articleToApprove.isApproved = true;
        // articleToApprove.approvedBy = req.user.username;
        articleToApprove.approvedAt = new Date();

        await articleToApprove.save();

        res.json(articleToApprove);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/reject/:id', async(req, res) => {
    try {
        const articleId = req.params.id;
        const { rejectionReason } = req.body;
        const rejectedArticle = await Article.findByIdAndUpdate(articleId, { isApproved: false, rejectionReason }, { new: true });
        if (!rejectedArticle) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json(rejectedArticle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/pending-articles', async(req, res) => {
    try {
        const pendingArticles = await Article.find({ isApproved: false });
        res.json(pendingArticles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const lastArticleIndex = 0;
router.get('/articles', async(req, res) => {
    const articlesPerBatch = 20;
    try {
        const articles = await Article.find().skip(lastArticleIndex).limit(articlesPerBatch);
        if(articles.length == 0){
            res.json("No more articles");
        }
        lastArticleIndex += articles.length;
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/article/:id', async(req, res) => {
    const articleId = req.params.id;

    try {
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/article/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const deletedArticle = await Article.findByIdAndDelete(id);
        if (!deletedArticle) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json(deletedArticle);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
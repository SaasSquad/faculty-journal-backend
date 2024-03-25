const express = require('express');
const router = express.Router();
const Article = require('../schema/Article');
const multer = require('multer');
const adminStatus = require('../middleware/adminStatus');
const path = require("path");
const User = require('../schema/signupSchema');
const jwt = require("jsonwebtoken");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

router.post('/create-article/:token', adminStatus, upload.single('file'), async(req, res) => {
    // const token = req.cookies.jwt;
    const token = req.params.token

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.userId;
    const user = await User.findById(userId);

    const { title, description } = req.body;
    Article.create({
            title: title,
            description: description,
            file: req.file.path,
            isApproved: true,
            author: { firstName: user.firstName, lastName: user.lastName },
            userId: userId
        })
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(error => res.status(500).json({ error: 'Internal Server Error' }))

});

router.put('/approve-article/:id', async(req, res) => {
    const { _id } = req.params;

    try {
        const articleToApprove = await Article.findById(_id);
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

        return res.json(articleToApprove);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
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
        return res.json(rejectedArticle);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/pending-articles/:token', adminStatus, async(req, res) => {
    try {
        const pendingArticles = await Article.find({ isApproved: false });
        return res.json(pendingArticles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/articles/:token', async(req, res) => {
    const token = req.params.token

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.userId;

    let lastArticleIndex = 0;
    try {
        let articles = await Article.find({ userId }).skip(lastArticleIndex).limit(20);
        if (articles.length == 0) {
            return res.json("No more articles");
        }
        lastArticleIndex += articles.length;
        return res.json(articles);
    } catch (error) {
        return res.status(500);
    }
});

// router.get('/articles', async(req, res) => {
//     try {
//         const articles = await Article.find();
//         res.json(articles);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

router.get('/file/:id', async(req, res) => {

    const articleId = req.params.id;

    try {
        const article = await Article.findById(articleId);
        const rootDir = path.resolve(__dirname, '../../Public/Images')
        const pdfPath = path.join(rootDir, article.file)

        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        return res.json(pdfPath);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})


router.get('/article/:id', async(req, res) => {
    const articleId = req.params.id;

    try {
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        return res.json(article);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/article/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const deletedArticle = await Article.findByIdAndDelete(id);
        if (!deletedArticle) {
            return res.status(404).json({ error: 'Article not found' });
        }
        return res.json(deletedArticle);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
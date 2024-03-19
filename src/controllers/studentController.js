const express = require('express');
const router = express.Router();
const Article = require('../schema/Article');
const app = express();
const bodyParser = require('body-parser');
// const jwt = require('../middleware/jwtAuth');
const multer = require("multer");
const authenticateToken = require('../middleware/jwtAuth');
const User = require('../schema/signupSchema');

app.use(bodyParser.json());

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

router.post('/create-article', authenticateToken, (req, res) => {
    const author = req.user.username;

    const { title, description } = req.body
    Article.create({ title: title, description: description, author: author })
        .then(result => {
            res.status(201).json(result)
        })
        .catch(error => res.status(500).json({ error: 'Internal Server Error' }))

});


router.get('/articles', async(req, res) => {
    const lastArticleIndex = 0;
    const articlesPerBatch = 20;
    try {
        const articles = await Article.find({ isApproved: true }).skip(lastArticleIndex).limit(articlesPerBatch);
        if(articles.length == 0){
            res.json("No more articles");
        }
        lastArticleIndex += articles.length;
        res.json(articles);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// router.get('/articles', async(req, res) => {
//     try {
//         const articles = await Article.find({ isApproved: true });
//         res.json(articles);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

router.get('/article/:id', async(req, res) => {
    const articleId = req.params.title;

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

router.put('/article/:id', authenticateToken, async(req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const file = req.file.filename;

    try {
        const updatedArticle = await Article.findByIdAndUpdate(id, { title, description, file }, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.json(updatedArticle);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/article/:id', authenticateToken, async(req, res) => {
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
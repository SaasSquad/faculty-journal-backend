const express = require('express');
const router = express.Router();
const Article = require('../schema/Article');
const app = express();
const bodyParser = require('body-parser');
const multer = require("multer");
const authenticateToken = require('../middleware/jwtAuth');
const User = require('../schema/signupSchema');
const jwt = require("jsonwebtoken");
const path = require("path")

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

router.post('/create-article/:token', authenticateToken, upload.single('file'), async(req, res) => {
    // const token = req.cookies.jwt;
    const token = req.params.token

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.userId;
    const user = await User.findById(userId);

    const { title, description } = req.body
    Article.create({
            title: title,
            description: description,
            file: req.file.path,
            author: { firstName: user.firstName, lastName: user.lastName },
            userId: userId
        })
        .then(result => {
            return res.status(201).json(result)
        })
        .catch(error => res.status(500).json({ error: 'Internal Server Error' }))

});


router.get('/articles/:token', async(req, res) => {
    const token = req.params.token

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.userId;

    let lastArticleIndex = 0;
    try {
        let articles = await Article.find({ userId: userId }).skip(lastArticleIndex).limit(20);
        if (articles.length == 0) {
            return res.json("No more articles");
        }
        lastArticleIndex += articles.length;
        return res.json(articles);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/articles', async(req, res) => {
    let lastArticleIndex = 0;
    try {
        let articles = await Article.find({ isApproved: true }).skip(lastArticleIndex).limit(20);
        if (articles.length == 0) {
            return res.json("No more articles");
        }
        lastArticleIndex += articles.length;
        return res.json(articles);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/article/:id', async(req, res) => {
    const articleId = req.params.title;

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

router.put('/article/:id', async(req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const file = req.file.filename;

    try {
        const updatedArticle = await Article.findByIdAndUpdate(id, { title, description, file }, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({ error: 'Article not found' });
        }
        return res.json(updatedArticle);
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
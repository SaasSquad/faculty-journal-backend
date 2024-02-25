const express = require('express');
const router = express.Router();
const Post = require('../schema/Post');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

router.post('/create-post', async(req, res) => {
    const { title, content } = req.body;
    // const author = req.user.username;

    try {
        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/posts', async(req, res) => {
    try {
        const posts = await Post.find({ isApproved: true });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/posts/:id', async(req, res) => {
    const postId = req.params.title;

    try {
        const post = await Posttest.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/post/:id', async(req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/post/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(deletedPost);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
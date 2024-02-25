const express = require('express');
const router = express.Router();
const Post = require('../schema/Post');

router.put('/approve-post/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const postToApprove = await Post.findById(id);
        if (!postToApprove) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (postToApprove.isApproved) {
            return res.status(400).json({ error: 'Post already approved' });
        }

        postToApprove.isApproved = true;
        // postToApprove.approvedBy = req.user.username;
        postToApprove.approvedAt = new Date();

        await postToApprove.save();

        res.json(postToApprove);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/reject/:id', async(req, res) => {
    try {
        const postId = req.params.id;
        const { rejectionReason } = req.body;
        const rejectedPost = await Post.findByIdAndUpdate(postId, { isApproved: false, rejectionReason }, { new: true });
        if (!rejectedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(rejectedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/pending-posts', async(req, res) => {
    try {
        const pendingPosts = await Post.find({ isApproved: false });
        res.json(pendingPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/posts', async(req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/post/:id', async(req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
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
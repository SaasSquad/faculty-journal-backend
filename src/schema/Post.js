const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true,
    },
    content: {
        type: String,
        require: true,
        unique: true,
    },
    author: String,
    approvedBy: String,
    rejectionReason: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    approvedAt: Date,
    isApproved: { type: Boolean, default: false },
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
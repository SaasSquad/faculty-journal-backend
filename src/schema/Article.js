const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true,
    },
    description: {
        type: String,
        unique: true,
    },
    file: {
        type: String,
        // require: true,
        unique: true,
    },
    author: String,
    approvedBy: String,
    rejectionReason: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    approvedAt: Date,
    isApproved: {
        type: Boolean,
        default: false
    },
});


const Article = mongoose.model('articles', articleSchema);

module.exports = Article;
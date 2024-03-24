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
        type: Buffer,
        // require: true,
        // unique: true,
    },
    author: mongoose.Schema.Types.Mixed,
    userId: {
        type: String,
        require: true
    },
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
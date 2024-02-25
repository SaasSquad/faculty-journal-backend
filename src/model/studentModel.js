const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
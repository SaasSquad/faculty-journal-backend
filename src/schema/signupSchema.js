const mongoose = require("mongoose");
//login schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    }
});

const User = mongoose.model("users", userSchema);

module.exports = User;
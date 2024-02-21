const mongoose = require("mongoose");
//login schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    fullName: {
        type: String,
        require: true,
    },
    studentEmail: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    dateCreated: {
        type: String,
        require: true,
        default: new Date(),
    }
});

const UserStudent = mongoose.model("users-student", userSchema);

module.exports = UserStudent;
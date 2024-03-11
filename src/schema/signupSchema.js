const mongoose = require("mongoose");
//login schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        unique: true,
    },
    lastName: {
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
    confirmPassword: {
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
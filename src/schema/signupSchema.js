const mongoose = require("mongoose");
//login schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        unique: false,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    role: {
        type : String,
        default: "not admin",
    },
    academicStatus: {
        type: String,
        require: true,
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

const User = mongoose.model("users", userSchema);

module.exports = User;
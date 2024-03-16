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
<<<<<<< HEAD
        type : String,
        default: "not admin",
    },
    academicStatus: {
        type: String,
        require: true,
=======
        type: String,
>>>>>>> 2b74f6a2c5c3020d5b62722c2486b612184ba2c6
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
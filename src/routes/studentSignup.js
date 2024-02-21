const { Router } = require("express");
const UserStudent = require("../schema/signupSchema");
const router = Router();
const { hashPassword } = require("../middleware/hashPassword");


router.post("/signup/student", async (req, res) => {
    const password = hashPassword(req.body.password);
    const { username, fullName, studentEmail, dateCreated } = req.body;
    const newUser = await UserStudent.create({ username, fullName, studentEmail, password, dateCreated });
    newUser.save();
});

module.exports = router;

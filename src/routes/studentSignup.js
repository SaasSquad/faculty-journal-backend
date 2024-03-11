const { Router } = require("express");
const UserStudent = require("../schema/signupSchema");
const router = Router();
const { hashPassword } = require("../middleware/hashPassword");


router.post("/signup/student", async (req, res) => {
    if(req.body.password === !req.body.comfirmPassword) {
        return res.sendStatus(403)
    }
    const password = hashPassword(req.body.password)
    const { firstName, lastName, studentEmail, dateCreated } = req.body;
    const newUser = await UserStudent.create({ firstName, lastName, studentEmail, password, dateCreated });
    newUser.save();
});

module.exports = router;

const { Router } = require("express");
const User = require("../schema/signupSchema");
const router = Router();
const { hashPassword } = require("../middleware/hashPassword");


router.post("/signup", async(req, res) => {
    if (req.body.password === !req.body.comfirmPassword) {
        return res.sendStatus(403)
    }
    const password = hashPassword(req.body.password)
    const { firstName, lastName, email, role, academicStatus, dateCreated } = req.body;
    const newUser = await User.create({ firstName, lastName, email, role, academicStatus, password, dateCreated });
    newUser.save();
    return res.sendStatus(200);
});

module.exports = router;
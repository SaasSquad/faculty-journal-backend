const { Router } = require("express");
const User = require("../schema/signupSchema");
const router = Router();
const { hashPassword } = require("../middleware/hashPassword");


router.post("/signup", async (req, res) => {
    if(req.body.password === !req.body.comfirmPassword) {
        return res.sendStatus(403)
    }
    const password = hashPassword(req.body.password)
    const { firstName, lastName, email, role, dateCreated } = req.body;
    const newUser = await User.create({ firstName, lastName, email, role, password, dateCreated });
    newUser.save();
});

module.exports = router;

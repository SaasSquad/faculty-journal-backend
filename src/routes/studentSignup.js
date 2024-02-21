const { Router } = require("express");
const User = require("../schema/signupSchema");
const router = Router()


router.post("/signup", async (req, res) => {
    const { username, fullName, email, password } = req.body;
    const newUser = await User.create({ username, fullName, email, password });
    newUser.save();
});

module.exports = router;

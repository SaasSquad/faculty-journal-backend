const { Router } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../schema/signupSchema");
const { comparePassword } = require("../middleware/hashPassword");
const router = Router();

router.post("/login", async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) { return res.sendStatus(400) };
    //find user in database
    const userDB = await User.findOne({ email });
    if (!userDB) { return res.status(401).json({ error: 'Incorrect email' }) };
    //compare password
    const isValid = comparePassword(password, userDB.password);
    if (!isValid) {
        return res.status(401).json({ error: 'Incorrect password' });
    }
    //generate Jwt token
    const token = jwt.sign({ userId: userDB._id }, process.env.JWT_SECRET_KEY, { expiresIn: "48h" });
    res.cookie("jwt", token, { httpOnly: false });

    //send success respond

    return res.status(200).json({ userDB, token });
})

module.exports = router;
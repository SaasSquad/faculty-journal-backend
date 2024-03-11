const { Router } = require("express");
const router = Router();
const User = require("../schema/signupSchema");

router.get("/users", async ( req, res) => {
    try {
        const Users = await User.find({}, "firstName lastName email role dateCreated");
        res.json(Users);
    } catch(err) {
        res.sendStatus(401);
    }
});

module.exports = router;

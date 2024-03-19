const { Router } = require("express");
const router = Router();
const User = require("../schema/signupSchema");
const routeAuth = require("../middleware/jwtAuth");


router.get("/users", routeAuth, async(req, res) => {
    try {
        const Users = await User.find({}, "firstName lastName email role dateCreated");
        res.json(Users);
    } catch (err) {
        res.sendStatus(401);
    }
});

module.exports = router;
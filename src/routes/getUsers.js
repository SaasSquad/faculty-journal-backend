const { Router } = require("express");
const router = Router();
const User = require("../schema/signupSchema");
const routeAuth = require("../middleware/jwtAuth");


router.get("/users/:token", routeAuth, async(req, res) => {
    const token = req.params.token;
    try {
        const Users = await User.find({}, "firstName lastName email role academicStatus dateCreated");
        res.json(Users);
    } catch (err) {
        res.sendStatus(401);
    }
});

module.exports = router;
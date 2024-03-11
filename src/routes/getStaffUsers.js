const { Router } = require("express");
const router = Router();
const staffUsers = require("../schema/staffSignupSchema");

router.get("/staffs", async (req, res) => {
    try {
        const Users = await staffUsers.find({}, "firstName lastName email dateCreated");
        res.json(Users);
    } catch (err) {
        res.sendStatus(400);
    }
});

module.exports = router;
const { Router } = require("express");
const router = Router();
const studentUsers = require("../schema/signupSchema");

router.get("/students", async ( req, res) => {
    try {
        const Users = await studentUsers.find({}, "firstName lastName studentEmail dateCreated");
        res.json(Users);
    } catch(err) {
        res.sendStatus(401);
    }
});

module.exports = router;

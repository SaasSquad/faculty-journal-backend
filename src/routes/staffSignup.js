const { Router } = require("express");
const UserStaff = require("../schema/staffSignupSchema");
const router = Router();
const { hashPassword } = require("../middleware/hashPassword");


router.post("/signup/staff", async (req, res) => {
    const password = hashPassword(req.body.password);
    const { username, fullName, email, dateCreated } = req.body;
    const newUser = await UserStaff.create({ username, fullName, email, password, dateCreated });
    newUser.save();
});

module.exports = router;
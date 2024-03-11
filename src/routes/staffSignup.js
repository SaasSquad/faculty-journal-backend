const { Router } = require("express");
const UserStaff = require("../schema/staffSignupSchema");
const router = Router();
const { hashPassword } = require("../middleware/hashPassword");


router.post("/signup/staff", async (req, res) => {
    if(req.body.password === !req.body.comfirmPassword) {
        return res.sendStatus(403)
    }
    const password = hashPassword(req.body.password);
    const { firstName, lastName, email, dateCreated } = req.body;
    const newUser = await UserStaff.create({ firstName, lastName, email, password, dateCreated });
    newUser.save();
});

module.exports = router;
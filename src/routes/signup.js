const { Router } = require("express");
const User = require("../schema/signupSchema");
const router = Router();
const { hashPassword } = require("../middleware/hashPassword");


router.post("/signup", async(req, res) => {
    // if (req.body.password === !req.body.comfirmPassword) {
    //     return res.sendStatus(403)
    // }
    const password = hashPassword(req.body.password)
    const { firstName, lastName, email, role, academicStatus, dateCreated } = req.body;
    const newUser = await User.create({ firstName, lastName, email, role, academicStatus, password, dateCreated });
    newUser.save();
<<<<<<< HEAD
    return res.sendStatus(200)
=======

    return res.sendStatus(200);
>>>>>>> 2b74f6a2c5c3020d5b62722c2486b612184ba2c6
});

module.exports = router;
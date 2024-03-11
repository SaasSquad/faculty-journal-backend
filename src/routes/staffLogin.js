const { Router } = require("express");
const UserStaff = require("../schema/staffSignupSchema");
const { comparePassword } = require("../middleware/hashPassword");
const router = Router();

router.post("/login/staff", async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {return res.sendStatus(400)};
    //find user in database
    const userDB = await UserStaff.findOne({ email });
    if(!userDB) {return res.sendStatus(401)};
    //compare password
    const isValid = comparePassword(password, userDB.password);
    if(!isValid){
        return res.sendStatus(401);
    }
    //generate Jwt token
    const token = jwt.sign({ userId: userDB._id }, process.env.JWT_SECRET_KEY, { expiresIn: "48h"});
    res.cookie("token", token, 
    { httpOnly : true });
})

module.exports = router;
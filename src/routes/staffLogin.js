const { Router } = require("express");
const UserStaff = require("../schema/staffSignupSchema");
const { comparePassword } = require("../middleware/hashPassword");
const router = Router();

router.post("/login/staff", async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {return res.sendStatus(400)};
    const userDB = await UserStaff.findOne({ email });
    if(!userDB) {return res.sendStatus(401)};
    const isValid = comparePassword(password, userDB.password);
    if(isValid){
        return res.sendStatus(200);
    } else {
        return res.sendStatus(401);
    }
})

module.exports = router;
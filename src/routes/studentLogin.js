const { Router } = require("express");
const UserStudent = require("../schema/signupSchema");
const { comparePassword } = require("../middleware/hashPassword");
const router = Router();

router.post("/login/student", async (req, res) => {
    const { studentEmail, password } = req.body;
    if(!studentEmail || !password) {return res.sendStatus(400)};
    const userDB = await UserStudent.findOne({ studentEmail });
    if(!userDB) {return res.sendStatus(401)};
    const isValid = comparePassword(password, userDB.password);
    if(isValid){
        return res.sendStatus(200);
    } else {
        return res.sendStatus(401);
    }
})

module.exports = router;
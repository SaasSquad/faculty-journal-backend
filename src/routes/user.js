const { Router } = require("express");
const router = Router();
const User = require("../schema/signupSchema");
const jwt = require("jsonwebtoken");

router.get("/user", async(req, res) => {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(404).json("not authorize");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const userId = decoded.userId;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json("user not found")
        }
        const userInfos = { 
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            role : user.role,
            academicStatus : user.academicStatus,
            dateCreated : user.dateCreated,
        }
        return res.json(userInfos);
    } catch (error) {
        res.status(500).json("internal server error");
    }
});

module.exports = router;
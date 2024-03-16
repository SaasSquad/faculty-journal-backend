const express = require('express');
const router = express.Router();
const User = require("../schema/signupSchema");
const app = express();
const bodyParser = require('body-parser');

router.put("/assignadmin/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id)
        if(!user){
            res.sendStatus(403);
        }
        const adminStatus = user.role;
        if(adminStatus == "admin"){
            res.sendStatus(403);
        }
        user.role = "admin"
        await user.save();
        return res.sendStatus(200);
    } catch (error){
        res.sendStatus(500);
    }
})

module.exports = router;
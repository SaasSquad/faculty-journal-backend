const express = require('express');
const router = express.Router();
const User = require("../schema/signupSchema")
const app = express();
const bodyParser = require('body-parser');
const adminStatus = require("../middleware/adminStatus");

router.put("/disadmin/:token", adminStatus, async(req, res) => {
    const id = req.query.id;
    try {
        const user = await User.findById(id)
        if (!user) {
            res.sendStatus(403);
        }
        const adminStatus = user.role;
        if (adminStatus == "admin") {
            user.role = "not admin"
            await user.save();
            return res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;
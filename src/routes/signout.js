const { Router } = require("express");
const router = Router();

router.post("/signout", (req, res) => {
    res.clearCookie("jwt");

    return res.sendStatus(200)
});

module.exports = router;
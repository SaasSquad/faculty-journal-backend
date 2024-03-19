const { Router } = require("express");
const router = Router();

router.post("/signout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");

    return res.sendStatus(200)
});

module.exports = router;
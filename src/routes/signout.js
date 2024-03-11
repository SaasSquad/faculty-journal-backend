const { Router } = require("express");
const router = Router();

router.post("/signout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});

module.exports = router;
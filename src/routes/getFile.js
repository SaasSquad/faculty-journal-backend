const express = require("express");
const { Router } = require("express");
const router = Router();
const routeAuthn = require("../middleware/jwtAuth");
const Articles = require("../schema/Article")
const path = require("path")

router.get("/files", async(req, res) => {
    // const { id } = req.params;
    try {
        const article = await Articles.find();
        const file = article

        res.json(file)
    } catch (error) {
        res.status(500);
    }
});

module.exports = router;
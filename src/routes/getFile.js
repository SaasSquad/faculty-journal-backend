const express = require("express");
const { Router } = require("express");
const router = Router();
const routeAuthn= require("../middleware/jwtAuth");
const Articles = require("../schema/Article")

router.get("/file/:id", async(req, res) => {
    const { id } = req.params;
    try{
        const article = await Articles.findById(id);
        const file = article.file;

        if(!file) {
            res.status(404).json({ error: "file not found" });
        } else{
            res.send(file);
        }
    } catch(error) {
        req.status(500);
    }
});

module.exports = router;
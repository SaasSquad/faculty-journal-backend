const express = require("express");
const { Router } = require("express");
const router = Router();
const routeAuthn = require("../middleware/jwtAuth");
const Articles = require("../schema/Article")
const path = require("path")

router.get("/file/:id", async(req, res) => {
    const { id } = req.params;
    try {
        const article = await Articles.findById(id);
        const rootDir = path.resolve(__dirname, '../../Public/Images/')
        const file = path.join(rootDir, article.file)

        if (!file) {
            res.status(404).json({ error: "file not found" });
        } else {
            res.setHeader("content-Type", "application/pdf");
            res.setHeader("content-Disposition", `attachment: filename="${article.title}.pdf"`)
            res.sendFile(file);
        }
    } catch (error) {
        res.status(500);
    }
});

module.exports = router;
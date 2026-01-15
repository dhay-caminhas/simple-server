const express = require("express");
const router = express.Router();
const articlesController = require("../controllers/articlesController");

router.post("/articles", articlesController.createArticle);
router.get("/articles", articlesController.getAllArticles);
router.get("/articles/:id", articlesController.getArticleById);
router.put("/articles/:id", articlesController.updateArticle);
router.delete("/articles/:id", articlesController.deleteArticle);

module.exports = router;

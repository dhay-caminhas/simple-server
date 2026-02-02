const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articleController');
const authenticate = require('../middlewares/authMiddleware');

router.get('/', ArticleController.getArticles);
router.get('/:id', ArticleController.getArticleById);
router.post('/', authenticate, ArticleController.createArticle);
router.put('/:id', authenticate, ArticleController.updateArticle);
router.delete('/:id', authenticate, ArticleController.deleteArticle);

module.exports = router;




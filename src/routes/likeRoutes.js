const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/likeController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/', authenticate, LikeController.createLike);
router.delete('/:id', authenticate, LikeController.deleteLike);
router.get('/:articleId', LikeController.getArticleLikes);

module.exports = router;

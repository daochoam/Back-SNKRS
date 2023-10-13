const { Router } = require('express');
const controller = require('../controllers/review/index');

const reviewRoutes = Router();

reviewRoutes.post('/', validateAuthUserSession("user"), controller.createReview);
reviewRoutes.patch('/', validateAuthUserSession("user"), controller.updateReview);
reviewRoutes.get('/', controller.getReviews);

module.exports = reviewRoutes;

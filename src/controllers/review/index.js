const getReviews = require('./getReviews');
const createReview = require('./createReview');
const updateReview = require('./updateReview');
const getReviewByUser = require('./getReviewByUser');

const controller = {
    createReview,
    getReviews,
    updateReview,
    getReviewByUser
};

module.exports = controller;
const getReviews = require('./getReviews');
const createReview = require('./createReview');
const updateReview = require('./updateReview');

const controller = {
    createReview,
    getReviews,
    updateReview,
};

module.exports = controller;
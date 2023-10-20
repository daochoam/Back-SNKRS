const { Router } = require('express');
const featuresRoutes = Router();

const {
    getAllColors,
    getSizesByCategoriesAndGender,
} = require('../controllers/features');


featuresRoutes.get("/color", getAllColors)
featuresRoutes.get("/size", getSizesByCategoriesAndGender)

module.exports = featuresRoutes
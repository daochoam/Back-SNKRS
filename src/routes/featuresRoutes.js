const { Router } = require('express');
const featuresRoutes = Router();

const {
    createType,
    createCategory,
    getAllTypes,
    getAllColors,
    getAllCategories,
    getSizesByCategoriesAndGender,
} = require('../controllers/features');


featuresRoutes.get("/type", getAllTypes)
featuresRoutes.get("/category", getAllCategories)
featuresRoutes.get("/color", getAllColors)
featuresRoutes.get("/size", getSizesByCategoriesAndGender)
featuresRoutes.post("/type", createType)
featuresRoutes.post("/category", createCategory)
featuresRoutes.put("/type")
featuresRoutes.put("/category")
featuresRoutes.delete("/type")
featuresRoutes.delete("/category")

module.exports = featuresRoutes
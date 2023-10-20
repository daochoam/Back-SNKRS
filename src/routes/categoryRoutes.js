const { Router } = require('express');
const categoryRoutes = Router();

const {
    createCategory,
    deleteCategoryById,
    getAllCategories,
    updateCategoryById
} = require('../controllers/categories');


categoryRoutes.get("/", getAllCategories)
categoryRoutes.post("/", createCategory)
categoryRoutes.put("/:id", updateCategoryById)
categoryRoutes.delete("/:id", deleteCategoryById)


module.exports = categoryRoutes
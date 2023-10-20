const getAllCategories = require("./getAllCategories");
const createCategory = require("./createCategory");
const deleteCategoryById = require("./deleteCategoryById");
const updateCategoryById = require("./updateCategoryById");

module.exports = {
    createCategory,
    deleteCategoryById,
    getAllCategories,
    updateCategoryById
}
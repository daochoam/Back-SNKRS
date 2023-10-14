const { Router } = require('express');
const brandRoutes = Router();

const {
    getAllBrands,
    createBrand,
    updateBrandById,
    deleteBrandById
} = require('../controllers/brands')


brandRoutes.get("/", getAllBrands)
brandRoutes.post("/", createBrand)
brandRoutes.put("/:id", updateBrandById)
brandRoutes.delete("/:id", deleteBrandById)

module.exports = brandRoutes
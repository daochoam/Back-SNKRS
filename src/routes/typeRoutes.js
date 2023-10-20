const { Router } = require('express');
const typesRoutes = Router();

const {
    createType,
    getTypes,
    deleteTypeById,
    updateTypeById
} = require('../controllers/types');


typesRoutes.get("/", getTypes)
typesRoutes.post("/", createType)
typesRoutes.put("/:id", updateTypeById)
typesRoutes.delete("/:id", deleteTypeById)


module.exports = typesRoutes
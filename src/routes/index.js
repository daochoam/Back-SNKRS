const { Router } = require('express')
const productRoutes = require("./productsRoutes") 
const snkrsRoutes = Router(); 

snkrsRoutes.use("/products", productRoutes)


module.exports = snkrsRoutes
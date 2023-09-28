
const { Router } = require('express')
const productRoutes = require("./productsRoutes") 
const shoppingRoutes = require('./shoppingRoutes')
const snkrsRoutes = Router(); 

snkrsRoutes.use("/products", productRoutes)
snkrsRoutes.use('/shopping',shoppingRoutes)

module.exports = snkrsRoutes
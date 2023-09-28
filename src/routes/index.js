
const { Router } = require('express')
const snkrsRoutes = Router();

const authRoutes = require('./authRoutes')
const productRoutes = require("./productsRoutes")
const shoppingRoutes = require('./shoppingRoutes')

snkrsRoutes.use("/auth", authRoutes);
snkrsRoutes.use("/products", productRoutes)
snkrsRoutes.use('/shopping', shoppingRoutes)


module.exports = snkrsRoutes
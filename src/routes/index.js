
const { Router } = require('express')
const snkrsRoutes = Router();

const authRoutes = require('./authRoutes')
const productRoutes = require("./productsRoutes")
const shoppingRoutes = require('./shoppingRoutes')
const webhooks = require('../controllers/webhooks/webhooks')

snkrsRoutes.use("/auth", authRoutes);
snkrsRoutes.use("/products", productRoutes)
snkrsRoutes.use('/shopping', shoppingRoutes)
snkrsRoutes.use('/webhooks', webhooks)


module.exports = snkrsRoutes
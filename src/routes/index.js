
const { Router } = require('express')
const snkrsRoutes = Router();

const authRoutes = require('./authRoutes')
const productRoutes = require("./productsRoutes")
const shoppingRoutes = require('./shoppingRoutes')
const webhooks = require('../controllers/webhooks/webhooks')
const trolleyRoutes = require('./trolleyRoutes')

snkrsRoutes.use("/auth", authRoutes);
snkrsRoutes.use("/products", productRoutes)
snkrsRoutes.use('/shopping', shoppingRoutes)
snkrsRoutes.use('/webhooks', webhooks)
snkrsRoutes.use('/trolley', trolleyRoutes)


module.exports = snkrsRoutes
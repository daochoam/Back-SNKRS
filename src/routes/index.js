const { Router } = require('express')
const snkrsRoutes = Router();

const { validateAuthUserSession } = require('../middlewares/index')
const authRoutes = require('./authRoutes')
const productRoutes = require("./productsRoutes")
const shoppingRoutes = require('./shoppingRoutes')
const reviewRoutes = require('./reviewRoutes')
const webhooks = require('../controllers/webhooks/webhooks')
const trolleyRoutes = require('./trolleyRoutes')
const userRoutes = require('./userRoutes')
const adminRoutes = require('./adminRoutes.js')
const worldRoutes = require('./worldRoutes.js')
const bulkRoutes = require('./bulkRoutes.js')
const newsLetterRoute = require("./newsLetterRoute")
const favoritesRoutes = require('./favoritesRoutes');
const featuresRoutes = require('./featuresRoutes');
const brandRoutes = require('./brandRoutes');

snkrsRoutes.use("/auth", authRoutes);
snkrsRoutes.use("/products", productRoutes)
snkrsRoutes.use('/webhooks', webhooks)
snkrsRoutes.use('/review', reviewRoutes)
snkrsRoutes.use('/shopping', validateAuthUserSession("user"), shoppingRoutes)
snkrsRoutes.use('/trolley', validateAuthUserSession("user"), trolleyRoutes)
snkrsRoutes.use('/user', validateAuthUserSession("user"), userRoutes)
snkrsRoutes.use('/admin', validateAuthUserSession("admin"), adminRoutes)
snkrsRoutes.use('/world', worldRoutes)
snkrsRoutes.use('/features', featuresRoutes)
snkrsRoutes.use('/bulk', bulkRoutes)
snkrsRoutes.use('/brand', brandRoutes)
snkrsRoutes.use('/favorites', validateAuthUserSession("user"), favoritesRoutes)
snkrsRoutes.use("/newsletter", newsLetterRoute)

module.exports = snkrsRoutes
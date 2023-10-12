const { Router } = require('express')
const snkrsRoutes = Router();

const { validateAuthUserSession } = require('../middlewares/index')
const authRoutes = require('./authRoutes')
const productRoutes = require("./productsRoutes")
const shoppingRoutes = require('./shoppingRoutes')
const webhooks = require('../controllers/webhooks/webhooks')
const trolleyRoutes = require('./trolleyRoutes')
const userRoutes = require('./userRoutes')
const worldRoutes = require('./worldRoutes.js')
const bulkRoutes = require('./bulkRoutes.js')
const favoritesRoutes = require('./favoritesRoutes');
const purchaseMailHandler = require('../handlers/purchase/purchaseHandler');

snkrsRoutes.use("/auth", authRoutes);
snkrsRoutes.use("/products", productRoutes)
snkrsRoutes.use('/webhooks', webhooks)
snkrsRoutes.use('/shopping', validateAuthUserSession("user"), shoppingRoutes)
snkrsRoutes.use('/trolley', validateAuthUserSession("user"), trolleyRoutes)
snkrsRoutes.use('/user', userRoutes)
snkrsRoutes.use('/world', worldRoutes)
snkrsRoutes.use('/bulk', bulkRoutes)
snkrsRoutes.use('/favorites', validateAuthUserSession("user"), favoritesRoutes)
snkrsRoutes.get('/mail', purchaseMailHandler)

module.exports = snkrsRoutes
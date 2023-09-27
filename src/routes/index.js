const { Router } = require('express');
const shoppingRoutes = require('./shoppingRoutes');

const snkrsRoutes = Router();

snkrsRoutes.use('/shopping',shoppingRoutes)

module.exports = snkrsRoutes
const { Router } = require('express');
const controller = require('../controllers/bulk/index.js');

const bulkRoutes = Router();

bulkRoutes.post('/country', controller.bulkCountries);
bulkRoutes.post('/state', controller.bulkStates);
bulkRoutes.post('/city', controller.bulkCities);
bulkRoutes.post('/type', controller.bulkTypes);
bulkRoutes.post('/color', controller.bulkColors);
bulkRoutes.post('/size', controller.bulkShoes);
bulkRoutes.post('/products', controller.bulkProducts);
bulkRoutes.post('/brands', controller.bulkBrands);



module.exports = bulkRoutes;
const { Router } = require('express');
const controller = require('../controllers/bulk/index.js');

const bulkRoutes = Router();

bulkRoutes.post('/country', controller.bulkCountries);
bulkRoutes.post('/state', controller.bulkStates);
bulkRoutes.post('/city', controller.bulkCities);

module.exports = bulkRoutes;
const { Router } = require('express');
const controller = require('../controllers/worldList/index.js');
const worldRoutes = Router();

worldRoutes.get('/countryDetail', controller.countryDetail);
worldRoutes.get('/countries', controller.countryList);
worldRoutes.get('/stateByCountry', controller.stateList);
worldRoutes.get('/cityByState', controller.cityList);

module.exports = worldRoutes;

const bulkCountries = require('./bulkCountries.js');
const bulkStates = require('./bulkStates.js');
const bulkCities = require('./bulkCities.js');
const bulkShoes = require('./bulkShoes.js');
const bulkColors = require('./bulkColors.js');
const bulkTypes = require('./bulkTypes.js');
const bulkProducts = require('./bulkProducts.js');
const bulkBrands = require('./bulkBrands.js');
const controller = {
    bulkCountries,
    bulkStates,
    bulkCities,
    bulkColors,
    bulkShoes,
    bulkTypes,
    bulkProducts,
    bulkBrands
};

module.exports = controller;
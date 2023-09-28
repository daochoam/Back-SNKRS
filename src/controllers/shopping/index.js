const updateByShoppingId = require('./updateByShoppingId');
const deleteByShoppingId = require('./deleteByShoppingId');
const getShoppings   = require('./getShoppings');
const createShopping = require('./createShopping');

const controller = {
    updateByShoppingId,
    deleteByShoppingId,
    createShopping,
    getShoppings,
};

module.exports = controller;
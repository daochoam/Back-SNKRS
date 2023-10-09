
const updateByShoppingId = require('./updateByShoppingId');
const deleteByShoppingId = require('./deleteByShoppingId');
const getShoppings = require('./getShoppings');
const createShopping = require('./createShopping');
const getRecordShoppingsByUserId = require('./getRecordShoppingsByUserId');
const getRecordShoppingsByUsers = require('./getRecordShoppingsByUsers');

const controller = {
    updateByShoppingId,
    deleteByShoppingId,
    createShopping,
    getShoppings,
    getRecordShoppingsByUserId,
    getRecordShoppingsByUsers
};

module.exports = controller;
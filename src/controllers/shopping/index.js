const updateByShoppingId = require('./updateByShoppingId');
const deleteByShoppingId = require('./deleteByShoppingId');
const createShopping = require('./createShopping');
const getShoppingByUserId = require('./getShoppingByUserId');

const controller = {
    updateByShoppingId,
    deleteByShoppingId,
    createShopping,
    getShoppingByUserId,
};

module.exports = controller;
const getAllUser = require('./getAllUser');
const changeStatusByUserId = require('./changeStatusByUserId.js');
const getSales = require('./getSales');

const controller = {
    getAllUser,
    changeStatusByUserId,
    getSales,
};

module.exports = controller;
const getAllUser = require('./getAllUser.js');
const getUserById = require('./getUserById.js');
const changeStatusByUserId = require('./changeStatusByUserId.js');
const changeStatusAddressByUserId = require('./changeStatusAddressByUserId.js');
const updateUserById = require('./updateUserById.js');
const addAddressByUserId = require('./addAddressByUserId.js');
const deleteAddressByUserId = require('./deleteAddressByUserId.js');
const controller = {
    getAllUser,
    getUserById,
    changeStatusByUserId,
    changeStatusAddressByUserId,
    updateUserById,
    addAddressByUserId,
    deleteAddressByUserId
};

module.exports = controller;
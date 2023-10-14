const getUserById = require('./getUserById');
const changeStatusByUserId = require('./changeStatusByUserId');
const changeStatusAddressByUserId = require('./changeStatusAddressByUserId');
const updateUserById = require('./updateUserById');
const addAddressByUserId = require('./addAddressByUserId');
const deleteAddressByUserId = require('./deleteAddressByUserId');

const controller = {
    getUserById,
    changeStatusByUserId,
    changeStatusAddressByUserId,
    updateUserById,
    addAddressByUserId,
    deleteAddressByUserId
};

module.exports = controller;
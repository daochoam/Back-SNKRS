const getUserById = require('./getUserById');
const changeStatusByUserId = require('./changeStatusByUserId');
const changeStatusAddressByUserId = require('./changeStatusAddressByUserId');
const updateUserById = require('./updateUserById');
const addAddressByUserId = require('./addAddressByUserId');
const deleteAddressByUserId = require('./deleteAddressByUserId');
const updateImage = require('./updateImage');

const controller = {
    getUserById,
    changeStatusByUserId,
    changeStatusAddressByUserId,
    updateUserById,
    addAddressByUserId,
    deleteAddressByUserId,
    updateImage,
};

module.exports = controller;
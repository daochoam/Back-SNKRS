const createTrolley = require('./createTrolley');
const updateTrolley = require('./updateTrolley');
const emptyTrolley  = require('./emptyTrolley');
const deleteTrolley = require('./deleteTrolley');
const updatePickByPickId = require('./updatePickByPickId');
const getTrolleyByUserId = require('./getTrolleyByUserId');
const updateQuantityByPickId = require('./updateQuantityByPickId');

const controller = {
    createTrolley,
    updateTrolley,
    emptyTrolley,
    deleteTrolley,
    updatePickByPickId,
    getTrolleyByUserId,
    updateQuantityByPickId,
};

module.exports = controller;
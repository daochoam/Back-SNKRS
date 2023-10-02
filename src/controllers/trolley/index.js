const createTrolley = require('./createTrolley');
const updateTrolley = require('./updateTrolley');
const deleteByTrolleyId  = require('./deleteByTrolleyId');
const updatePickByPickId = require('./updatePickByPickId');
const getTrolleyByUserId = require('./getTrolleyByUserId');

const controller = {
    createTrolley,
    updateTrolley,
    deleteByTrolleyId,
    updatePickByPickId,
    getTrolleyByUserId,
};

module.exports = controller;
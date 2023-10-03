const { Router } = require('express');
const controller = require('../controllers/trolley/index');

const trolleyRoutes = Router();

trolleyRoutes.post  ('/', controller.createTrolley);
trolleyRoutes.put   ('/', controller.updatePickByPickId);
trolleyRoutes.put   ('/:option', controller.updateTrolley);
trolleyRoutes.get   ('/:idUser', controller.getTrolleyByUserId);
trolleyRoutes.delete('/:idTrolley', controller.deleteByTrolleyId);

module.exports = trolleyRoutes;
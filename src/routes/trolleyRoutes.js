const { Router } = require('express');
const controller = require('../controllers/trolley/index');

const trolleyRoutes = Router();

trolleyRoutes.get ('/', controller.getTrolleyByUserId);
trolleyRoutes.post('/', controller.createTrolley);
trolleyRoutes.put ('/:option', controller.updateTrolley);
trolleyRoutes.put ('/pick/:idPick', controller.updatePickByPickId);
trolleyRoutes.put ('/quantityPick/:operation/:idPick', controller.updateQuantityByPickId);
trolleyRoutes.delete('/empty', controller.emptyTrolley);
trolleyRoutes.delete('/delete', controller.deleteTrolley);

module.exports = trolleyRoutes;
const { Router } = require('express');
const controller = require('../controllers/shopping/index');

const shoppingRoutes = Router();

shoppingRoutes.post  ('/', controller.createShopping);
shoppingRoutes.get   ('/', controller.getShoppings);
shoppingRoutes.put   ('/:idShopping', controller.updateByShoppingId);
shoppingRoutes.delete('/:idShopping', controller.deleteByShoppingId);

module.exports = shoppingRoutes;
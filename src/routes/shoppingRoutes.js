const { Router } = require('express');
const controller = require('../controllers/shopping/index');
const { validateAttributes } = require('../middlewares/index');

const shoppingRoutes = Router();

shoppingRoutes.post  ('/', validateAttributes.first, validateAttributes.second, controller.createShopping);
shoppingRoutes.get   ('/', controller.getShoppings);
shoppingRoutes.put   ('/:idShopping', controller.updateByShoppingId);
shoppingRoutes.delete('/:idShopping', controller.deleteByShoppingId);

module.exports = shoppingRoutes;
const { Router } = require('express');
const controller = require('../controllers/shopping/index');
const { validateAttributes, validateAuthUserSession } = require('../middlewares/index');


const shoppingRoutes = Router();

shoppingRoutes.post('/'
    // , validateAttributes.first, validateAttributes.second 
    , controller.createShopping);
shoppingRoutes.get('/', controller.getShoppings);
shoppingRoutes.put('/:idShopping', controller.updateByShoppingId);
shoppingRoutes.delete('/:idShopping', controller.deleteByShoppingId);
shoppingRoutes.get('/record', controller.getRecordShoppingsByUsers)
// shoppingRoutes.get('/:verifyPurchase/:action', controller.verifyPurchase);

module.exports = shoppingRoutes;

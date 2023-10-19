
const { Router } = require('express');
const controller = require('../controllers/admin/index');

const adminRoutes = Router();

adminRoutes.get('/', controller.getAllUser);
adminRoutes.put('/user/:id', controller.changeStatusByUserId);
adminRoutes.get('/sales', controller.getSales);

module.exports = adminRoutes;
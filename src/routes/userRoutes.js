const multer = require("multer");
const { Router } = require('express');
const controller = require('../controllers/user/index');

const userRoutes = Router();

userRoutes.get('/', controller.getUserById);
userRoutes.patch('/', controller.changeStatusByUserId);
userRoutes.patch('/address/:idAddress', controller.changeStatusAddressByUserId);
userRoutes.put('/', multer().single("newImageUser"), controller.updateUserById);
userRoutes.post('/', controller.addAddressByUserId);
userRoutes.delete('/address/:idAddress', controller.deleteAddressByUserId);

module.exports = userRoutes;
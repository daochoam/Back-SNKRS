const multer = require("multer");
const { Router } = require('express');
const controller = require('../controllers/user/index');

const userRoutes = Router();

userRoutes.get('/', controller.getAllUser);
userRoutes.get('/:id', controller.getUserById);
userRoutes.patch('/:id', controller.changeStatusByUserId);
userRoutes.patch('/:id/address/:idAddress', controller.changeStatusAddressByUserId);
userRoutes.put('/product/:id', controller.updateUserById);
userRoutes.post('/:id', controller.addAddressByUserId);
userRoutes.delete('/:id/address/:idAddress', controller.deleteAddressByUserId);
userRoutes.put("/image", multer().single("newImageUser"), controller.updateImage);

module.exports = userRoutes;
const multer = require("multer");
const { Router } = require('express');
const controller = require('../controllers/user/index');

const userRoutes = Router();

// userRoutes.get('/', controller.getAllUser);
userRoutes.get('/', controller.getUserById);
userRoutes.patch('/', controller.changeStatusByUserId);
userRoutes.patch('/address/:idAddress', controller.changeStatusAddressByUserId);
userRoutes.put('/', controller.updateUserById);
userRoutes.post('/', controller.addAddressByUserId);
userRoutes.delete('/address/:idAddress', controller.deleteAddressByUserId);
userRoutes.put("/image", multer().single("newImageUser"), controller.updateImage);

module.exports = userRoutes;
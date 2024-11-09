const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rutas para usuarios
router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/:id', userController.updateUser);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUserById);
router.post('/:id/favorites/:productId', userController.addFavorite);
router.delete('/:id/favorites/:productId', userController.removeFavorite);
router.post('/:id/workshops/:workshopId', userController.addWorkshop);
router.delete('/:id/workshops/:workshopId', userController.removeWorkshop);

module.exports = router;

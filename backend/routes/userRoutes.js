const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// router.post('/register', userController.register);
// router.post('/login', userController.login);

router.get('/:id/favoritos', userController.obtenerFavoritos);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.post('/:id/favorites/:productId', userController.addFavorite);
router.delete('/:id/favorites/:productId', userController.removeFavorite);
router.post('/:id/workshops/:workshopId', userController.addWorkshop);
router.delete('/:id/workshops/:workshopId', userController.removeWorkshop);
router.delete('/:id', userController.deleteUserById);


module.exports = router;

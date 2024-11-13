const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
// Middleware de autenticación (debes implementarlo)
// const authMiddleware = require('../middleware/authMiddleware');

// Obtener el carrito del usuario

router.get('/', cartController.getCart);

// Agregar un producto al carrito

router.post('/add', cartController.addItemToCart);

// Eliminar un producto del carrito

router.delete('/remove/:productId', cartController.removeItemFromCart);

module.exports = router;

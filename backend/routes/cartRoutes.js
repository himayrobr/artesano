const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, cartController.addItemToCart);
router.post('/remove', authMiddleware, cartController.removeItemFromCart);
router.post('/apply-coupon', authMiddleware, cartController.applyCoupon);

// Otras rutas: actualizar cantidad, obtener carrito

module.exports = router;

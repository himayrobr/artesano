// routes/couponRoutes.js
const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController'); // Ajusta la ruta si es necesario

// Crear un cupón
router.post('/coupons', couponController.createCoupon);

// Obtener todos los cupones
router.get('/coupons', couponController.getAllCoupons);

// Obtener un cupón por su código
router.get('/coupons/:codigo', couponController.getCouponByCode);

// Aplicar un cupón al carrito
router.post('/coupons/apply', couponController.applyCoupon);

// Actualizar un cupón
router.put('/coupons/:codigo', couponController.updateCoupon);

// Eliminar un cupón
router.delete('/coupons/:codigo', couponController.deleteCoupon);

// Validar un cupón
router.get('/coupons/validate/:codigo', couponController.validateCoupon);

module.exports = router;

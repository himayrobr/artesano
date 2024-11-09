const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');

// Rutas para cupones
router.post('/', couponController.crearCupon);
router.get('/:id', couponController.verCupon);

module.exports = router;

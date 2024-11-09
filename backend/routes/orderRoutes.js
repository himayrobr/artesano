const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Rutas para pedidos
router.post('/', orderController.crearPedido);
router.get('/:id', orderController.verPedido);

module.exports = router;

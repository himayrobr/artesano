const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Rutas para pedidos
router.post('/create', orderController.createOrder);
router.get('/', orderController.getAllOrders); 
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;

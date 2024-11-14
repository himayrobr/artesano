const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');  // Verifica esta línea

// Rutas para pedidos
router.post('/create', orderController.createOrder);  // Asegúrate de que `createOrder` exista en `orderController`
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;

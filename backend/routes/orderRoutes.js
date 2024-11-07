const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/orders', orderController.createOrder);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/orders/search', orderController.searchOrders);

module.exports = router;

const Order = require('../models/order'); // Importa el modelo de Order

// Crear una nueva orden
exports.createOrder = async (req, res) => {
  try {
    const { userId, products, total, date, status } = req.body;

    const newOrder = new Order({
      userId,
      products,
      total,
      date,
      status
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las órdenes
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('products.productId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una orden por ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId').populate('products.productId');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una orden por ID
exports.updateOrder = async (req, res) => {
  try {
    const { userId, products, total, date, status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { userId, products, total, date, status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una orden por ID
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

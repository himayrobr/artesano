const mongoose = require('mongoose');
const Order = require('../models/orderModel.js'); 
const obtenerOrdenesPorUsuarioId = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.usuarioId)) {
      return res.status(400).json({ mensaje: 'ID de usuario no válido' });
    }

    const usuarioId = new mongoose.Types.ObjectId(req.params.usuarioId);
    const ordenes = await Order.find({ usuarioId });

    if (ordenes.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron órdenes para este usuario' });
    }

    res.status(200).json({
      mensaje: 'Órdenes encontradas',
      ordenes
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar las órdenes', error });
  }
};

module.exports = { obtenerOrdenesPorUsuarioId };
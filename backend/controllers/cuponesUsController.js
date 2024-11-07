const mongoose = require('mongoose');
const Coupon = require('../models/cuponUsModel.js'); 
const obtenerCuponPorUsuarioId = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.usuarioId)) {
      return res.status(400).json({ mensaje: 'ID de usuario no válido' });
    }
    const usuarioId = new mongoose.Types.ObjectId(req.params.usuarioId);
    const ordenes = await Coupon.find({ usuarioId });

    if (ordenes.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron cupones para este usuario' });
    }
    res.status(200).json({
      mensaje: 'Cupones encontrados',
      ordenes
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar los cupones', error });
  }
};

module.exports = { obtenerCuponPorUsuarioId };

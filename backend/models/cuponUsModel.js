const mongoose = require('mongoose');
const { Schema } = mongoose;

const descuentoSchema = new Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  descuento: {
    type: Number,
    required: true,
    min: 0,
  },
  tipo: {
    type: String,
    enum: ['asignado', 'general'],
    required: true,
  },
  fechaExpiracion: {
    type: Date,
    required: true,
  },
  usuarioId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
});

const Descuento = mongoose.model('Coupon', descuentoSchema, 'Coupon');

module.exports = Descuento;

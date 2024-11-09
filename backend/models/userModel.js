const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  contraseña: String,
  email: String,
  fotoPerfil: String,
  direccion: String,
  telefono: String,
  favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  talleresInscritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workshop' }],
  historialCompras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  cupones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' }],
}, { collection: 'User' });

module.exports = mongoose.model('User', userSchema);

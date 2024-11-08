const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  fotos: [{ type: String }], 
  stock: { type: Number, required: true, min: 0 },
  artesanoId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { collection: 'Product' });

module.exports = mongoose.model('Product', productSchema);

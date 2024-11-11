const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  fotos: { type: [String], required: true },
  stock: { type: Number, required: true },
  artesanoId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { collection: 'Product' }); // Especificamos 'product' como nombre de la colección

module.exports = mongoose.model('Product', productSchema);

//
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productoId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true }  // Asegúrate de que el nombre del campo coincide con el documento proporcionado
});

const OrderSchema = new Schema({
  usuarioId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  productos: { type: [ProductSchema], required: true },  // Asegúrate de que el nombre del campo es 'productos'
  total: { type: Number, required: true },
  fecha: { type: Date, required: true },  // Cambia 'date' por 'fecha'
  estado: { type: String, required: true, enum: ['pendiente', 'entregado', 'enviado'] }
}, { collection: 'Order' });  // Aquí especificamos 'order' como nombre de la colección

module.exports = mongoose.model('order', OrderSchema);

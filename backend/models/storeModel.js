const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  foto: { type: String, required: true },
  documental: { type: String, required: true },
  ciudad: { type: String, required: true },
}, { collection: 'Store' });

const Store = mongoose.model('Store', storeSchema, 'Store');
module.exports = Store;

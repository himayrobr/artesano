// backend/models/messageModel.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  remitenteId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receptorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contenido: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);

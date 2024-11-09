const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  modalidad: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  duracion: { type: String, required: true },
  materialesProporcionados: { type: [String], required: true },
  materialesRequeridos: { type: [String], required: true },
  documental: { type: String, required: false },
  artesanoId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { collection: 'Workshop' });

module.exports = mongoose.model('Workshop', workshopSchema);

//
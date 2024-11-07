const mongoose = require('mongoose');
const { Schema } = mongoose;


const tallerSchema = new Schema({
    nombre: {
      type: String,
      required: true,
    },
    descripcion: String,
    modalidad: String,
    fechaInicio: Date,
    fechaFin: Date,
    duracion: String,
    materialesProporcionados: [String],
    materialesRequeridos: [String],
    documental: String,
    artesanoId: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
    },
  });
  
  const Taller = mongoose.model('WorkShop', tallerSchema);
  module.exports = Taller;
  
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    nombre: String,
    correo: { type: String, required: true },
    contraseña: { type: String, required: true },
    fotoPerfil: String,
    direccion: String,
    telefono: String,
    tipo: { type: String, default: 'Comprador', immutable: true },
    favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    compras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Compra' }],
    talleresInscritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Taller' }],
    cupones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cupon' }]
  },
  { collection: 'User' } 
);

userSchema.methods.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = mongoose.model('User', userSchema);

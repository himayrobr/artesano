const mongoose = require('mongoose');

// Definimos el esquema del usuario
const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  discordId: { type: String, unique: true, sparse: true },
  facebookId: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true, default: null },
  phone: { type: String, unique: true, sparse: true },
  username: { type: String, required: false, unique: true },  // Asegúrate que el username sea único
  password: { type: String },
  photo: { type: String, required: false, default: null },
  address: { type: String, required: false, default: null },
  type: { type: String, required: false, default: 'comprador' },
  favorites: { type: [String], default: [] },
  workshopsEnrolled: { type: [String], default: [] },
  acceptedTerms: { type: Boolean, default: true },
  marketingConsent: { type: Boolean, default: true },
  token: String,
}, {
  collection: 'User'
});

// Eliminamos el middleware para encriptar la contraseña, ya que no se usará encriptación.

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;

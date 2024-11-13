// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchemaa = new mongoose.Schema({
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
}, {
  collection: 'User'
});

// Encriptar la contraseña antes de guardarla
userSchemaa.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchemaa);
module.exports = User;

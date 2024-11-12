// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  discordId: { type: String, unique: true, sparse: true },
  facebookId: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true, default: null },
  phone: { type: String, unique: true, sparse: true },
  displayName: String,
  username: { type: String, required: false },
  password: { type: String },
  photo: { type: String, required: false, default: null },
  address: { type: String, required: false, default: null },
  type: { type: String, required: false, default: 'comprador' },
  favorites: { type: [String], default: [] },
  workshopsEnrolled: { type: [String], default: [] },
  
  // Nuevos campos para aceptación de términos y consentimiento
  acceptedTerms: { type: Boolean, default: false },
  marketingConsent: { type: Boolean, default: false },
}, {
  collection: 'User'
});

// Encriptar la contraseña antes de guardarla
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Método estático para encontrar o crear un usuario
userSchema.statics.findOneOrCreate = async function (profile) {
  const user = await this.findOne({
    $or: [
      { googleId: profile.googleId },
      { discordId: profile.discordId },
      { facebookId: profile.facebookId },
      { email: profile.email },
      { phone: profile.phone },
    ]
  });

  if (user) {
    return user;
  }

  const newUser = await this.create({
    googleId: profile.googleId,
    discordId: profile.discordId,
    facebookId: profile.facebookId,
    email: profile.email || null,
    phone: profile.phone,
    displayName: profile.displayName,
    username: profile.username,
    password: profile.password,
    photo: profile.photo || null,
    address: profile.address || null,
    type: profile.type || 'comprador',
    favorites: profile.favorites || [],
    workshopsEnrolled: profile.workshopsEnrolled || [],
    acceptedTerms: profile.acceptedTerms || false,  // Añadido
    marketingConsent: profile.marketingConsent || false,  // Añadido
  });

  return newUser;
};

const User = mongoose.model('User', userSchema);
module.exports = User;

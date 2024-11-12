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
  username: String,  // Agregar el campo de nombre de usuario
  password: { type: String },
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
    username: profile.username,  // Asegúrate de agregar el nombre de usuario aquí
    password: profile.password,
  });

  return newUser;
};

const User = mongoose.model('User', userSchema);
module.exports = User;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Asegúrate de instalar bcrypt

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  discordId: { type: String, unique: true, sparse: true },
  facebookId: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true, default: null }, // Permitir que sea null
  phone: { type: String, unique: true, sparse: true }, // Teléfono único
  displayName: String,
  password: { type: String }, // Asegúrate de que el campo de contraseña esté presente
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
      { email: profile.email }, // Agregar esta condición para evitar duplicados de email
      { phone: profile.phone }, // Asegura que el teléfono también sea único
    ]
  });

  if (user) {
    return user; // Si ya existe, devuelve el usuario
  }

  // Si no existe, crea uno nuevo
  const newUser = await this.create({
    googleId: profile.googleId,
    discordId: profile.discordId,
    facebookId: profile.facebookId,
    email: profile.email || null, // Si no se proporciona un email, se asigna null
    phone: profile.phone,
    displayName: profile.displayName,
    password: profile.password, // Agrega la contraseña si es necesario
  });

  return newUser;
};

const User = mongoose.model('User', userSchema);
module.exports = User;

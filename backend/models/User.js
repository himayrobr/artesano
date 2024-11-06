const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  discordId: { type: String, unique: true, sparse: true },
  facebookId: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true },
  displayName: String,
});

userSchema.statics.findOneOrCreate = async function (profile) {
  const user = await this.findOne({
    $or: [
      { googleId: profile.googleId },
      { discordId: profile.discordId },
      { facebookId: profile.facebookId }
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
    email: profile.email,
    displayName: profile.displayName,
  });

  return newUser;
};

const User = mongoose.model('User', userSchema);
module.exports = User;

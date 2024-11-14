const mongoose = require('mongoose');

// Definimos el esquema del usuario
const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  discordId: { type: String, unique: true, sparse: true },
  facebookId: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true, default: null },
  phone: { type: String, unique: true, sparse: true },
  username: { type: String, unique: true, sparse: true },  // Asegúrate que el username sea único
  password: { type: String },
  photo: { type: String, required: false, default: null },
  address: { type: String, required: false, default: null },
  type: { type: String, required: false, default: 'comprador' },
  favorites: { type: [String], default: [] },
  workshopsEnrolled: { type: [String], default: [] },
  acceptedTerms: { type: Boolean, default: true },
  marketingConsent: { type: Boolean, default: true },
  token: { type: String },
}, {
  collection: 'User'
});

// Middleware para manejar la creación del username real desde Google, Facebook o Discord
userSchema.pre('save', function(next) {
  // Si el username está vacío o es null, intentamos asignar uno con el nombre real
  if (!this.username) {
    // Si tiene Google ID, asignamos el nombre real de Google
    if (this.googleId) {
      this.username = this.displayName || `google_${this.googleId}`;
    } 
    // Si tiene Discord ID, asignamos el nombre real de Discord
    else if (this.discordId) {
      this.username = this.username || this.displayName || `discord_${this.discordId}`;
    } 
    // Si tiene Facebook ID, asignamos el nombre real de Facebook
    else if (this.facebookId) {
      this.username = this.username || this.displayName || `facebook_${this.facebookId}`;
    }
  }

  // Si aún no tiene un username asignado, lo generamos basado en el timestamp
  if (!this.username) {
    this.username = `user_${Date.now()}`;
  }

  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;

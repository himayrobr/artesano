const mongoose = require('mongoose');

// Definimos el esquema del usuario
const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  discordId: { type: String, unique: true, sparse: true },
  facebookId: { type: String, unique: true, sparse: true },
  email: { type: String, unique: true, sparse: true, default: null },
  phone: { type: String, unique: true, sparse: true },
  username: { type: String, unique: true, sparse: true },  
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
  // Verificamos si el username está vacío antes de asignarlo
  if (!this.username) {
    
    if (this.googleId) {
      // Si es Google, creamos un username único basado en el id de Google
      this.username = `google_${this.googleId}`;
    } 
    
    else if (this.discordId) {
      // Si es Discord, usamos el displayName o el id
      this.username = this.username || `discord_${this.discordId}`;
    } 
    
    else if (this.facebookId) {
      // Si es Facebook, usamos el id de Facebook
      this.username = this.username || `facebook_${this.facebookId}`;
    }
  }

  // Si no se genera username, se asigna un valor por defecto único basado en la fecha
  if (!this.username) {
    this.username = `user_${Date.now()}`;
  }

  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;

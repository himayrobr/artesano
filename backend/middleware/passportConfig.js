const passport = require("passport");
const User = require("../models/User");

// Serializa el usuario para la sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializa el usuario de la sesión
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Exportar Passport
module.exports = passport;

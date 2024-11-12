const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;
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

// Estrategia de Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOneOrCreate({
          googleId: profile.id,
          nombre: profile.displayName,  // Nombre completo
          correo: profile.emails[0].value,  // Correo
          fotoPerfil: profile.photos[0]?.value || null,  // Foto de perfil
          tipo: 'comprador',  // Asumiendo que es un comprador por defecto
        });
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Estrategia de Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/facebook/callback",
      profileFields: ["id", "displayName", "email", "photos"],  // Añadir photos para foto de perfil
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOneOrCreate({
          facebookId: profile.id,
          nombre: profile.displayName,  // Nombre completo de Facebook
          correo: profile.emails ? profile.emails[0].value : null,  // Correo de Facebook
          fotoPerfil: profile.photos ? profile.photos[0].value : null,  // Foto de perfil de Facebook
          tipo: 'comprador',  // Asumiendo que es un comprador por defecto
        });
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Estrategia de Discord
passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/discord/callback",
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOneOrCreate({
          discordId: profile.id,
          nombre: profile.username,  // Nombre de usuario de Discord
          correo: profile.email,  // Correo de Discord
          fotoPerfil: profile.avatar ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png` : null,  // Foto de perfil de Discord
          tipo: 'comprador',  // Asumiendo que es un comprador por defecto
        });
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;

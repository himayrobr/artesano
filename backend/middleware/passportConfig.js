const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/userModel");

passport.serializeUser((user, done) => {
  console.log("Serializando usuario:", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log("Deserializando usuario:", user);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Configuración de Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google Profile:", profile);
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
          });
          console.log("Nuevo usuario creado con Google:", user);
        } else {
          console.log("Usuario existente con Google:", user);
        }
        return done(null, user);
      } catch (error) {
        console.error("Error en Google Strategy:", error);
        return done(error, null);
      }
    }
  )
);

// Configuración de Discord Strategy
passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: "/auth/discord/callback",
      scope: ["identify", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Discord Profile:", profile);
        let user = await User.findOne({ discordId: profile.id });
        if (!user) {
          user = await User.create({
            discordId: profile.id,
            email: profile.email,
            displayName: profile.username,
          });
          console.log("Nuevo usuario creado con Discord:", user);
        } else {
          console.log("Usuario existente con Discord:", user);
        }
        return done(null, user);
      } catch (error) {
        console.error("Error en Discord Strategy:", error);
        return done(error, null);
      }
    }
  )
);

// Configuración de Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Facebook Profile:", profile);
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
          user = await User.create({
            facebookId: profile.id,
            email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
            displayName: profile.displayName,
          });
          console.log("Nuevo usuario creado con Facebook:", user);
        } else {
          console.log("Usuario existente con Facebook:", user);
        }
        return done(null, user);
      } catch (error) {
        console.error("Error en Facebook Strategy:", error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;

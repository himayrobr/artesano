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
          email: profile.emails[0].value,
          displayName: profile.displayName,
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
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOneOrCreate({
          facebookId: profile.id,
          email: profile.emails ? profile.emails[0].value : null,
          displayName: profile.displayName,
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
          email: profile.email,
          displayName: profile.username,
        });
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;

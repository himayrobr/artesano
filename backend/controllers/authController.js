const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

// Genera un token JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Registro con correo electrónico
exports.registerByEmail = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    user = new User({ username, email, password });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ message: "Usuario registrado exitosamente.", token });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro." });
  }
};

// Registro con número de teléfono
exports.registerByPhone = async (req, res) => {
  const { username, phone, password } = req.body;
  try {
    let user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ message: "El número de teléfono ya está registrado." });
    }

    user = new User({ username, phone, password });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ message: "Usuario registrado exitosamente.", token });
  } catch (error) {
    res.status(500).json({ message: "Error en el registro." });
  }
};

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
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
          });
        }
        return done(null, user);
      } catch (error) {
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
        let user = await User.findOne({ discordId: profile.id });
        if (!user) {
          user = await User.create({
            discordId: profile.id,
            email: profile.email,
            displayName: profile.username,
          });
        }
        return done(null, user);
      } catch (error) {
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
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
          user = await User.create({
            facebookId: profile.id,
            email: profile.emails ? profile.emails[0].value : null,
            displayName: profile.displayName,
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serializar el usuario
passport.serializeUser((user, done) => {
  done(null, { id: user.id, displayName: user.displayName });
});

// Deserializar el usuario
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Exporta los métodos para los handlers en authRoutes.js
exports.loginWithGoogle = passport.authenticate("google", { scope: ["profile", "email"] });
exports.loginWithDiscord = passport.authenticate("discord");
exports.loginWithFacebook = passport.authenticate("facebook");

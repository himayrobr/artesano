const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
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
  const { username, email, password, photo, address, phone, type, favorites, workshopsEnrolled } = req.body;
  console.log("Datos de registro recibidos:", req.body);

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, email, password: hashedPassword, photo, address, phone, type, favorites, workshopsEnrolled });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ message: "Usuario registrado exitosamente.", token });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error en el registro." });
  }
};

// Registro con número de teléfono
exports.registerByPhone = async (req, res) => {
  const { username, phone, password, email, photo, address, type, favorites, workshopsEnrolled } = req.body;
  console.log("Datos de registro por teléfono recibidos:", req.body);

  try {
    let user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ message: "El número de teléfono ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, phone, password: hashedPassword, email, photo, address, type, favorites, workshopsEnrolled });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ message: "Usuario registrado exitosamente.", token });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error en el registro." });
  }
};

// Login con correo electrónico, teléfono o nombre de usuario
exports.login = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    console.log("Buscando usuario con email, teléfono o nombre de usuario:", emailOrPhone);

    // Buscar usuario por correo, teléfono o nombre de usuario
    const user = await User.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }, { username: emailOrPhone }] });

    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(400).json({ message: 'Credenciales incorrectas.' });
    }

    // Depura la contraseña
    console.log("Contraseña ingresada:", password);
    console.log("Contraseña almacenada:", user.password);

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Contraseña incorrecta");
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Crear token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("Inicio de sesión exitoso para el usuario:", user._id, token);

    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error("Error en el proceso de inicio de sesión:", error);
    res.status(500).json({ message: 'Error en el servidor' });
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
            email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
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

// Serialización y deserialización del usuario
passport.serializeUser((user, done) => {
  done(null, { id: user.id, displayName: user.displayName });
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Métodos para handlers en authRoutes.js
exports.loginWithGoogle = passport.authenticate("google", { scope: ["profile", "email"] });
exports.loginWithDiscord = passport.authenticate("discord");
exports.loginWithFacebook = passport.authenticate("facebook");

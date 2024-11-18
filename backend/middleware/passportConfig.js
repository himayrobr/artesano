/**
 * @fileoverview Configuración de Passport.js para autenticación social
 * @requires passport, jwt, User model
 */

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// * Configuración de Serialización
// ? Determina qué datos del usuario se guardan en la sesión
passport.serializeUser((user, done) => {
  console.log("Serializando usuario:", user);
  done(null, user.id);
});

// ? Recupera el usuario completo basado en los datos serializados
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log("Deserializando usuario:", user);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// * Estrategia de Autenticación con Google
// ! Asegúrate de tener las variables de entorno GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET configuradas
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

        // ? Buscar usuario existente o crear uno nuevo
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
          });
          console.log("Nuevo usuario creado con Google:", user);
        }

        // * Generación de JWT
        // ! El token expira en 1 hora - Considera ajustar según necesidades de seguridad
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        user.token = token;
        return done(null, user);
      } catch (error) {
        console.error("Error en Google Strategy:", error);
        return done(error, null);
      }
    }
  )
);

// * Estrategia de Autenticación con Discord
// ! Asegúrate de tener las variables de entorno DISCORD_CLIENT_ID y DISCORD_CLIENT_SECRET configuradas
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
        // ? Proceso similar a Google Strategy
        let user = await User.findOne({ discordId: profile.id });
        if (!user) {
          user = await User.create({
            discordId: profile.id,
            email: profile.email,
            displayName: profile.username,
          });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        user.token = token;
        return done(null, user);
      } catch (error) {
        console.error("Error en Discord Strategy:", error);
        return done(error, null);
      }
    }
  )
);

// * Estrategia de Autenticación con Facebook
// ! Asegúrate de tener las variables de entorno FACEBOOK_CLIENT_ID y FACEBOOK_CLIENT_SECRET configuradas
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
        // ? Proceso similar a las otras estrategias
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
          user = await User.create({
            facebookId: profile.id,
            email: profile.emails?.[0]?.value || null,
            displayName: profile.displayName,
          });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        user.token = token;
        return done(null, user);
      } catch (error) {
        console.error("Error en Facebook Strategy:", error);
        return done(error, null);
      }
    }
  )
);

module.exports = passport;

/**
 * @description Leyenda de Better Comments:
 * ! Advertencias y aspectos críticos de seguridad
 * ? Explicaciones de procesos importantes
 * * Secciones principales de configuración
 * TODO: Mejoras pendientes o consideraciones futuras
 */

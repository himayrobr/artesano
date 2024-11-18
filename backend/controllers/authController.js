/**
 * @fileoverview Controlador de autenticación y gestión de usuarios
 * @requires passport, jwt, User model
 */

const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const cookieParser = require("cookie-parser");

// * Utilidades de Autenticación
// ? Genera un token JWT con la información del usuario
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h", // ! Considera ajustar el tiempo de expiración según necesidades
  });
};

// * Registro de Usuarios
// ? Registro mediante correo electrónico
exports.registerByEmail = async (req, res) => {
  const { username, email, password, photo, address, phone, type, favorites, workshopsEnrolled } = req.body;
  console.log("Datos de registro recibidos:", req.body);

  try {
    // ! Validación de usuario existente
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    // ! Validación de seguridad de contraseña
    if (password.length < 8) {
      return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres." });
    }

    // ? Creación de nuevo usuario
    // TODO: Implementar encriptación de contraseña
    user = new User({
      username,
      email,
      password,  // ! ADVERTENCIA: Contraseña en texto plano
      photo,
      address,
      phone,
      type,
      favorites,
      workshopsEnrolled
    });
    await user.save();

    // * Generación y configuración de token
    const token = generateToken(user);
    res.cookie("token", token, { 
      httpOnly: true, // ! Previene XSS
      maxAge: 3600000 // ? 1 hora
    });

    res.status(201).json({ message: "Usuario registrado exitosamente.", token });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error en el registro. Intenta nuevamente." });
  }
};

// ? Registro mediante número de teléfono
exports.registerByPhone = async (req, res) => {
  const { username, phone, password, email, photo, address, type, favorites, workshopsEnrolled } = req.body;
  console.log("Datos de registro por teléfono recibidos:", req.body);

  try {
    // ! Validación de usuario existente
    let user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({ message: "El número de teléfono ya está registrado." });
    }

    // ! Validación de seguridad de contraseña
    if (password.length < 8) {
      return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres." });
    }

    // ? Creación de nuevo usuario
    // TODO: Implementar encriptación de contraseña y validación de número de teléfono
    user = new User({
      username,
      phone,
      password,  // ! ADVERTENCIA: Contraseña en texto plano
      email,
      photo,
      address,
      type,
      favorites,
      workshopsEnrolled
    });
    await user.save();

    // * Generación y configuración de token
    const token = generateToken(user);
    res.cookie("token", token, { 
      httpOnly: true,
      maxAge: 3600000 
    });

    res.status(201).json({ message: "Usuario registrado exitosamente.", token });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error en el registro. Intenta nuevamente." });
  }
};

// * Login de Usuarios
// ? Login con email, teléfono o username
exports.login = async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    console.log("Buscando usuario con email, teléfono o nombre de usuario:", emailOrPhone);

    // ? Búsqueda flexible de usuario
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }, { username: emailOrPhone }]
    });

    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(400).json({ message: 'Credenciales incorrectas.' });
    }

    // ! ADVERTENCIA: Comparación de contraseña en texto plano
    // TODO: Implementar comparación de contraseñas encriptadas
    if (user.password !== password) {
      console.log("Contraseña incorrecta");
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // * Generación de token y respuesta
    const token = generateToken(user);
    res.cookie("token", token, { 
      httpOnly: true,
      maxAge: 3600000 
    });

    res.status(200).json({ 
      userId: user.id, 
      username: user.username, 
      userPhoto: user.photo, 
      token 
    });
  } catch (error) {
    console.error("Error en el proceso de inicio de sesión:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// * Autenticación Social
// ? Callbacks para autenticación con Google
exports.googleCallback = (req, res) => {
  try {
    // ? Verifica si existe usuario y token
    if (!req.user || !req.user.token) {
      return res.redirect('/login?error=auth_failed');
    }

    // * Configuración de cookie y redirección
    res.cookie('token', req.user.token, {
      httpOnly: true,
      maxAge: 3600000
    });
    
    res.redirect(`${process.env.FRONTEND_URL}/auth/success`);
  } catch (error) {
    console.error("Error en Google callback:", error);
    res.redirect('/login?error=server_error');
  }
};

// ? Callbacks para autenticación con Discord
exports.discordCallback = (req, res) => {
  try {
    // ? Verifica si existe usuario y token
    if (!req.user || !req.user.token) {
      return res.redirect('/login?error=auth_failed');
    }

    // * Configuración de cookie y redirección
    res.cookie('token', req.user.token, {
      httpOnly: true,
      maxAge: 3600000
    });

    res.redirect(`${process.env.FRONTEND_URL}/auth/success`);
  } catch (error) {
    console.error("Error en Discord callback:", error);
    res.redirect('/login?error=server_error');
  }
};

// ? Callbacks para autenticación con Facebook
exports.facebookCallback = (req, res) => {
  try {
    // ? Verifica si existe usuario y token
    if (!req.user || !req.user.token) {
      return res.redirect('/login?error=auth_failed');
    }

    // * Configuración de cookie y redirección
    res.cookie('token', req.user.token, {
      httpOnly: true,
      maxAge: 3600000
    });

    res.redirect(`${process.env.FRONTEND_URL}/auth/success`);
  } catch (error) {
    console.error("Error en Facebook callback:", error);
    res.redirect('/login?error=server_error');
  }
};

// * Cierre de Sesión
exports.logout = (req, res) => {
  try {
    // ? Limpia la sesión y las cookies
    req.logout();
    res.clearCookie('token');
    
    // * Redirección después del logout
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    console.error("Error en logout:", error);
    res.status(500).json({ message: 'Error al cerrar sesión' });
  }
};

// * Verificación de Estado de Autenticación
// ? Endpoint para verificar si el usuario está autenticado
exports.checkAuthStatus = (req, res) => {
  try {
    // ! Verifica el token en las cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ 
        isAuthenticated: false,
        message: 'No se encontró token de autenticación' 
      });
    }

    // ? Verifica y decodifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    res.status(200).json({ 
      isAuthenticated: true,
      userId: decoded.id 
    });
  } catch (error) {
    console.error("Error en verificación de autenticación:", error);
    res.status(401).json({ 
      isAuthenticated: false,
      message: 'Token inválido o expirado' 
    });
  }
};

/**
 * @description Leyenda de Better Comments:
 * ! Advertencias y aspectos críticos de seguridad
 * ? Explicaciones de procesos importantes
 * * Secciones principales de configuración
 * TODO: Mejoras pendientes o consideraciones futuras
 */
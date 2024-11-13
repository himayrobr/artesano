const express = require("express");
const passport = require("passport");
const {
  loginWithGoogle,
  loginWithDiscord,
  loginWithFacebook,
  registerByEmail,
  registerByPhone,
  login,  // Importa el nuevo método de login
} = require("../controllers/authController");

const router = express.Router();

// Rutas para autenticación con terceros

// Google
router.get("/google", loginWithGoogle);
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
  console.log("Autenticación con Google exitosa");

  // Imprimir el token generado en la consola
  const token = req.user.token; // Asegúrate de que el token esté disponible en req.user
  console.log("Token generado con Google:", token);

  // Redirigir al frontend
  res.redirect("http://localhost:5173/home");
});

// Discord
router.get("/discord", loginWithDiscord);
router.get("/discord/callback", passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => {
  console.log("Autenticación con Discord exitosa");

  // Imprimir el token generado en la consola
  const token = req.user.token; // Asegúrate de que el token esté disponible en req.user
  console.log("Token generado con Discord:", token);

  // Redirigir al frontend
  res.redirect("http://localhost:5173/home");
});

// Facebook
router.get("/facebook", loginWithFacebook);
router.get("/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/" }), (req, res) => {
  console.log("Autenticación con Facebook exitosa");

  // Imprimir el token generado en la consola
  const token = req.user.token; // Asegúrate de que el token esté disponible en req.user
  console.log("Token generado con Facebook:", token);

  // Redirigir al frontend
  res.redirect("http://localhost:5173/home");
});

// Ruta para inicio de sesión con correo y contraseña
router.post("/login", login);

// Ruta para obtener los datos del usuario autenticado
router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "No autenticado" });
  }
});

// Rutas para registro manual
router.post("/register/email", registerByEmail);
router.post("/register/phone", registerByPhone);

module.exports = router;

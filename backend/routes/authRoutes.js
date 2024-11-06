const express = require("express");
const passport = require("passport");
const { loginWithGoogle, loginWithDiscord, loginWithFacebook } = require("../controllers/authController");

const router = express.Router();

// Rutas para autenticación
router.get("/google", loginWithGoogle);
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
  res.redirect("http://localhost:3000/home");
});

router.get("/discord", loginWithDiscord);
router.get("/discord/callback", passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => {
  res.redirect("http://localhost:3000/home");
});

router.get("/facebook", loginWithFacebook);
router.get("/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/" }), (req, res) => {
  res.redirect("http://localhost:3000/home");
});

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ displayName: req.user.displayName });
  }
  return res.status(401).json({ message: "No estás autenticado" });
});
module.exports = router;

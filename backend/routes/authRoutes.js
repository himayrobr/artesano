/**
 * @fileoverview Rutas de autenticación
 * @requires express, passport, authController
 */

const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

// * Rutas de registro y login local
router.post('/register/email', authController.registerByEmail);
router.post('/register/phone', authController.registerByPhone);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// * Rutas de autenticación social - Google
router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  authController.googleCallback
);

// * Rutas de autenticación social - Discord
router.get('/discord',
  passport.authenticate('discord', { scope: ['identify', 'email'] })
);
router.get('/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/login' }),
  authController.discordCallback
);

// * Rutas de autenticación social - Facebook
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  authController.facebookCallback
);

// * Ruta para verificar estado de autenticación
router.get('/check', authController.checkAuthStatus);

module.exports = router;

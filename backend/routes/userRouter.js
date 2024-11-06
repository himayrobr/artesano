const express = require('express');
const { updateUserProfile } = require('../controllers/userController');

const router = express.Router();
router.put('/editar-perfil/:id', updateUserProfile);

module.exports = router;

const express = require('express');
const { actualizarUsuario } = require('../controllers/userController');

const router = express.Router();

router.put('/usuarios/:id', actualizarUsuario);

module.exports = router;

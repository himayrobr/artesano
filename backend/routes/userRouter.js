const express = require('express');
const { actualizarUsuario, obtenerUsuarioPorId } = require('../controllers/userController');

const router = express.Router();

router.put('/usuarios/:id', actualizarUsuario);
router.get('/usuarios/:id', obtenerUsuarioPorId);

module.exports = router;

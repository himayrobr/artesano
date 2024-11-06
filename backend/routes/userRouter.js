const express = require('express');
const { actualizarUsuario, obtenerUsuarioPorId, eliminarUsuarioPorId } = require('../controllers/userController');

const router = express.Router();

router.put('/usuarios/:id', actualizarUsuario);
router.get('/usuarios/:id', obtenerUsuarioPorId);
router.delete('/usuarios/:id', eliminarUsuarioPorId);

module.exports = router;

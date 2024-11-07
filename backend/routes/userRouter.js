const express = require('express');
const { actualizarUsuario, obtenerUsuarioPorId, eliminarUsuarioPorId, obtenerTalleresInscritos } = require('../controllers/userController.js');

const router = express.Router();

router.put('/usuarios/:id', actualizarUsuario);
router.get('/usuarios/:id', obtenerUsuarioPorId);
router.get('/usuarios/talleres/:id', obtenerTalleresInscritos);
router.delete('/usuarios/:id', eliminarUsuarioPorId);


module.exports = router;

const express = require('express');
const { actualizarUsuario, obtenerUsuarioPorId, eliminarUsuarioPorId, obtenerTalleresInscritos, obtenerFavoritos, agregarFavorito } = require('../controllers/userController.js');

const router = express.Router();

router.put('/usuarios/:id', actualizarUsuario);
router.get('/usuarios/:id', obtenerUsuarioPorId);
router.get('/usuarios/talleres/:id', obtenerTalleresInscritos);
router.get('/usuarios/favoritos/:id', obtenerFavoritos);
router.delete('/usuarios/:id', eliminarUsuarioPorId);
router.post('/usuarios/:userId/favoritos/:productId', agregarFavorito);


module.exports = router;

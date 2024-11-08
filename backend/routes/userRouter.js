const express = require('express');
const { actualizarUsuario, obtenerUsuarioPorId, eliminarUsuarioPorId, obtenerTalleresInscritos, obtenerFavoritos, agregarFavorito, eliminarDeFavoritos, agregarTaller, eliminarTaller } = require('../controllers/userController.js');

const router = express.Router();

router.put('/usuarios/:id', actualizarUsuario);
router.get('/usuarios/:id', obtenerUsuarioPorId);
router.get('/usuarios/talleres/:id', obtenerTalleresInscritos);
router.get('/usuarios/favoritos/:id', obtenerFavoritos);
router.delete('/usuarios/:id', eliminarUsuarioPorId);
router.post('/usuarios/:userId/favoritos/:productId', agregarFavorito);
router.delete('/usuarios/:idUsuario/favoritos/:idProducto', eliminarDeFavoritos);
router.post('/usuarios/:idUsuario/talleres/:idTaller', agregarTaller);
router.delete('/usuarios/:idUsuario/talleres/:idTaller', eliminarTaller);

module.exports = router;

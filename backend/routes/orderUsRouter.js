const express = require('express');
const router = express.Router();
const { obtenerOrdenesPorUsuarioId } = require('../controllers/orderUsController');

router.get('/ordenes/usuario/:usuarioId', obtenerOrdenesPorUsuarioId);

module.exports = router;

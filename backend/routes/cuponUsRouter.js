const express = require('express');
const router = express.Router();
const { obtenerCuponPorUsuarioId } = require('../controllers/cuponesUsController');

router.get('/coupon/usuario/:usuarioId', obtenerCuponPorUsuarioId);

module.exports = router;

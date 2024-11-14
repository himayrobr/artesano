const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Rutas para mensajes
router.post('/', messageController.enviarMensaje);
router.get('/:id', messageController.verMensajes);

module.exports = router;

const Chat = require('../models/Chat');

exports.saveMessage = async (req, res) => {
    try {
        const { text } = req.body;

        // Usar un ID por defecto si no se pasa el userId
        const userId = req.body.userId || 'administrador';

        // Validar que el campo de texto esté presente
        if (!text) {
            return res.status(400).json({ error: "El mensaje es requerido" });
        }

        // Crear una nueva instancia de un mensaje de chat con el userId por defecto
        const newMessage = new Chat({
            text,
            userId, // Asignando "administrador" por defecto si no se pasa un userId
        });

        // Guardar el mensaje en la base de datos
        await newMessage.save();

        // Emitir el mensaje a todos los clientes conectados
        req.app.get('io').emit('receiveMessage', newMessage);

        res.status(201).json(newMessage);  // Responder con el mensaje guardado
    } catch (error) {
        console.error("Error al guardar el mensaje:", error);
        res.status(500).json({ error: "Error al guardar el mensaje" });
    }
};

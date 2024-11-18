const Chat = require('../models/Chat');

exports.saveMessage = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "El mensaje es requerido" });
        }

        // Guardar el mensaje del usuario
        const newMessage = new Chat({
            text,
            userId: 'usuario',
        });

        await newMessage.save();

        // Ya no emitimos el mensaje aquí
        // La respuesta se enviará manualmente desde el panel de administración

        res.status(201).json({ success: true });
    } catch (error) {
        console.error("Error al guardar el mensaje:", error);
        res.status(500).json({ error: "Error al guardar el mensaje" });
    }
};

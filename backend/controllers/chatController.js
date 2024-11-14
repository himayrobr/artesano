// backend/controllers/chatController.js
const Chat = require('../models/Chat');

exports.saveMessage = async (req, res) => {
    try {
        const { text, timestamp } = req.body;
        const newMessage = new Chat({ text, timestamp });
        await newMessage.save();
        res.status(201).json({ message: "Mensaje guardado en la base de datos" });
    } catch (error) {
        res.status(500).json({ error: "Error al guardar el mensaje" });
    }
};

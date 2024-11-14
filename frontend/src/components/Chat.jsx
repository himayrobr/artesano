import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { endpoints } from '../apiConfig';  // Asegúrate de que endpoints esté correctamente configurado
import '../styles/Chat.css';

// Establecer la conexión con el servidor WebSocket
const socket = io('http://localhost:5000');

const Chat = () => {
    const [messages, setMessages] = useState([]);  // Estado para los mensajes del chat
    const [input, setInput] = useState("");  // Estado para el mensaje de entrada

    // Cargar los mensajes desde localStorage cuando el componente se monta
    useEffect(() => {
        const savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        setMessages(savedMessages);
    }, []);

    // Guardar los mensajes en localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }, [messages]);

    // Escuchar los mensajes del servidor (cuando el backend los emite)
    useEffect(() => {
        socket.on('connect', () => {
            console.log("Conectado al servidor de WebSocket");
        });

        // Escuchar el evento 'receiveMessage' que emite el servidor
        socket.on('receiveMessage', (message) => {
            console.log("Mensaje recibido del servidor:", message);

            setMessages((prevMessages) => {
                const newMessage = { ...message, isUser: false };

                // Verificar si el mensaje con el mismo texto o timestamp ya existe
                if (!prevMessages.some(msg => msg.timestamp === newMessage.timestamp || msg.text === newMessage.text)) {
                    console.log("Actualizando mensajes:", [...prevMessages, newMessage]);
                    return [...prevMessages, newMessage];
                }
                return prevMessages;
            });
        });

        // Limpiar la suscripción cuando el componente se desmonte
        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    // Función para manejar el envío de un mensaje
    const handleSendMessage = async () => {
        if (input.trim() !== "") {
            const messageId = new Date().toISOString();  // Usar un ID único basado en la fecha
            const newMessage = { text: input, timestamp: messageId, isUser: true };

            // Agregar el mensaje a la UI antes de enviarlo (sin esperar respuesta)
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInput("");  // Limpiar el campo de entrada

            try {
                // Enviar el mensaje al backend para guardarlo
                const response = await fetch(endpoints.chat, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMessage),
                });

                if (response.ok) {
                    console.log("Mensaje guardado en el backend");

                    // Emitir el mensaje a través de WebSocket solo si el backend responde correctamente
                    socket.emit('sendMessage', newMessage);
                } else {
                    console.error("Error al guardar el mensaje en el backend");
                }
            } catch (error) {
                console.error("Error de red:", error);
            }
        }
    };

    return (
        <div className="chat-container">
            <h2>Chatea con un asesor</h2>
            <div className="chat-messages">
                {messages.map((message) => (
                    <div
                        key={message.timestamp || message.text}  // Si el timestamp no es válido, usa el texto como fallback
                        className={`chat-message ${message.isUser ? 'user' : 'other'}`}
                    >
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>
            <div className="chat-input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="chat-input"
                />
                <button onClick={handleSendMessage} className="chat-send-button">Enviar</button>
            </div>
        </div>
    );
};

export default Chat;

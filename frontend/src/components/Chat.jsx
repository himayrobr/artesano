// frontend/src/components/Chat.jsx
import React, { useState, useEffect } from 'react';
import { endpoints } from '../apiConfig';
import '../styles/Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
        setMessages(savedMessages);
    }, []);

    useEffect(() => {
        localStorage.setItem("chatMessages", JSON.stringify(messages));
    }, [messages]);

    const handleSendMessage = async () => {
        if (input.trim() !== "") {
            const newMessage = { text: input, type: 'user' };
            setMessages([...messages, newMessage]);
            setInput("");

            try {
                const response = await fetch(endpoints.chat, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMessage),
                });

                if (!response.ok) {
                    console.error("Error al enviar el mensaje al backend");
                }
            } catch (error) {
                console.error("Error de red:", error);
            }
        }
    };

    return (
        <div className="chat-container">
            <h2 className="chat-header">Chat</h2>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <p
                        key={index}
                        className={`chat-message ${message.type === 'user' ? 'user' : 'bot'}`}
                    >
                        {message.text}
                    </p>
                ))}
            </div>
            <div className="chat-input-container">
                <input
                    type="text"
                    className="chat-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe un mensaje..."
                />
                <button className="chat-send-button" onClick={handleSendMessage}>
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default Chat;

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { endpoints } from '../apiConfig';
import { Link } from 'react-router-dom';
import '../styles/Chat.css';
import Return from '../storage/img/arrow_back.svg';

const socket = io('http://localhost:5000');

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

    useEffect(() => {
        socket.on('message', (message) => {
            console.log("Mensaje recibido del servidor:", message);
            setMessages(prevMessages => [...prevMessages, { ...message, isUser: false }]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const handleSendMessage = () => {
        if (input.trim() !== "") {
            const newMessage = { 
                contenido: input,
                remitenteId: 'usuario', // O el ID real del usuario
                receptorId: 'admin',    // O el ID del destinatario
                timestamp: new Date().toISOString(),
                isUser: true 
            };

            // Emitir el mensaje via Socket.IO
            socket.emit("message", newMessage);

            setMessages(prevMessages => [...prevMessages, newMessage]);
            setInput("");
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <button className="back-buttonCHAT">
                    <Link to='/Home'>
                        <img src={Return} className="return-iconCHAT" />
                    </Link>
                <span>Chat</span> 
                </button>
            </div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`chat-message ${message.isUser ? 'user-message' : 'other-message'}`}
                    >
                        {message.contenido}
                    </div>
                ))}
            </div>
            <div className="chat-input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Mandar mensaje..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="chat-input"
                />
                <button onClick={handleSendMessage} className="send-button">
                    &#x27A4;
                </button>
            </div>
        </div>
    );
};

export default Chat;

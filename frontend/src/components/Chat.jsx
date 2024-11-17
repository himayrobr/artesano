import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { endpoints } from '../apiConfig'; 
import {Link} from 'react-router-dom';
import '../styles/Chat.css';

import Return from '../storage/img/arrow_back.svg';

// Establecer la conexión con el servidor WebSocket
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
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, { ...message, isUser: false }]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const handleSendMessage = async () => {
        if (input.trim() !== "") {
            const newMessage = { text: input, timestamp: Date.now(), isUser: true };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setInput("");

            try {
                const response = await fetch(endpoints.chat, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newMessage),
                });

                if (response.ok) {
                    socket.emit('sendMessage', newMessage);
                }
            } catch (error) {
                console.error("Error de red:", error);
            }
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
                        {message.text}
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

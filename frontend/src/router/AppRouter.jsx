import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home.jsx';
import Login from '../components/Login.jsx';
import Register from '../components/Register.jsx';
import RegisterByEmail from '../components/RegisterByEmail.jsx';
import RegisterByPhone from '../components/RegisterByPhone.jsx';
import RuraqLogin from '../components/RuraqLogin.jsx';
import PrivacyPolicy from '../components/PrivacyPolicy.jsx';
import Chat from '../components/Chat.jsx';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/registro/correo" element={<RegisterByEmail />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/registro/celular" element={<RegisterByPhone />} />
    <Route path="/ruraq-login" element={<RuraqLogin />} />
    <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
    <Route path="/chat" element={<Chat/>} />
  </Routes>
);

export default AppRouter;

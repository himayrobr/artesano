import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home.jsx';
import Login from '../components/Login.jsx';
import Register from '../components/Register.jsx';
import RegisterByEmail from '../components/RegisterByEmail.jsx';
import RegisterByPhone from '../components/RegisterByPhone.jsx';
import RuraqLogin from '../components/RuraqLogin.jsx';
import PrivacyPolicy from '../components/PrivacyPolicy.jsx';

// Puedes agregar un componente de inicio aquí si lo deseas
const AppRouter = () => (
  <Routes>
    {/* Rutas relacionadas con el login y registro */}
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/registro/correo" element={<RegisterByEmail />} />
    <Route path="/Home" element={<Home />} />
    <Route path="/registro/celular" element={<RegisterByPhone />} />
    <Route path="/ruraq-login" element={<RuraqLogin />} />
    <Route path="/politica-privacidad" element={<PrivacyPolicy />} />

  </Routes>
);

export default AppRouter;

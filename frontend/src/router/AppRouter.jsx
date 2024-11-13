import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home.jsx';
import Textileria from '../components/Textileria.jsx';
import LoadingPage from '../components/LoadingPage.jsx';
import Perfil from '../components/Perfil.jsx';
import Store from '../components/Store.jsx';
import Categoria from '../components/Categoria.jsx';
import Login from '../components/Login.jsx';
import Register from '../components/Register.jsx';
import RegisterByEmail from '../components/RegisterByEmail.jsx';
import RegisterByPhone from '../components/RegisterByPhone.jsx';
import RuraqLogin from '../components/RuraqLogin.jsx';
import PrivacyPolicy from '../components/PrivacyPolicy.jsx';
import TallerAwaq from '../components/TallerAwaq.jsx';
import Ajustes from '../components/Ajustes.jsx';
import Comentarios from '../components/Comentarios.jsx';
import AtencionCliente from '../components/AtencionCliente.jsx';

// Puedes agregar un componente de inicio aquí si lo deseas
const AppRouter = () => (
  <Routes>
    {/* Rutas relacionadas con el login y registro */}
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/registro/correo" element={<RegisterByEmail />} />
    <Route path="/registro/celular" element={<RegisterByPhone />} />
    <Route path="/ruraq-login" element={<RuraqLogin />} />
    <Route path="/politica-privacidad" element={<PrivacyPolicy />} />
    
    {/* Rutas relacionadas con la tienda y categorías */}
    <Route path="/home" element={<Home />} />
    <Route path="/perfil" element={<Perfil />} />
    <Route path="/store" element={<Store />} />
    <Route path="/taller/:id" element={<TallerAwaq />} />
    <Route path="/categoria/:categoriaId" element={<Categoria />} />
    
    {/* Otras rutas */}
    <Route path="/loading" element={<LoadingPage />} />
    <Route path="/textileria" element={<Textileria />} />
    <Route path="/Ajustes" element={<Ajustes /> } />
    <Route path="/Comentarios" element={<Comentarios /> } />  
    <Route path="/AtencionCliente" element={<AtencionCliente />} />
  </Routes>
);

export default AppRouter;

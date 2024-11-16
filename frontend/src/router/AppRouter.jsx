import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import ProductDetail from '../components/ProductDetail.jsx';
import Cart from '../components/Cart';
import Chat from '../components/Chat.jsx'

import ProductosDescuentos from '../components/ProductosDescuentos.jsx';
import CanjearCupon from '../components/CanjearCupon.jsx';
import TallerEducativo from '../components/TallerEducativo.jsx';
import FavoritosArtesanias from '../components/FavoritosArtesanias.jsx';
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
    <Route path="/chat" element={<Chat />} />
    
    {/* Rutas relacionadas con la tienda y categorías */}
    <Route path="/home" element={<Home />} />
    <Route path="/perfil" element={<Perfil />} />
    <Route path="/store" element={<Store />} />
    <Route path="/taller/:id" element={<TallerAwaq />} />
    <Route path="/categoria/:categoriaId" element={<Categoria />} />
    <Route path="/product/:productId" element={<ProductDetail />} />

    {/* Otras rutas */}
    <Route path="/loading" element={<LoadingPage />} />
    <Route path="/textileria" element={<Textileria />} />
    <Route path="/Ajustes" element={<Ajustes /> } />
    <Route path="/Comentarios" element={<Comentarios /> } />  
    <Route path="/AtencionCliente" element={<AtencionCliente />} />
    <Route path="/Cart" element={<Cart />} />
    <Route path="/ProductosDescuentos/" element={<ProductosDescuentos />} />
    <Route path="/CanjearCupon" element={<CanjearCupon />} />
    <Route path="/TallerEducativo" element={<TallerEducativo />} />
    <Route path="/FavoritosArtesanias" element={<FavoritosArtesanias />} />

    {/* Ruta por defecto */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default AppRouter;

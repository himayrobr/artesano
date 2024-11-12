// AppRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home.jsx';
import Textileria from '../components/Textileria.jsx';


import LoadingPage from '../components/LoadingPage.jsx';
import Perfil from '../components/Perfil.jsx';
import Store from '../components/Store.jsx';
import Categoria from '../components/Categoria.jsx';
import Ajustes from '../components/Ajustes.jsx';

const AppRouter = () => (
    <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/categoria/:categoriaId" element={<Categoria />} />
        <Route path="/search/" element={<search />} />
        <Route path="/Ajustes" element={<Ajustes />} />
    </Routes>
);

export default AppRouter;

// AppRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home.jsx';
import Textileria from '../components/Textileria.jsx';


import LoadingPage from '../components/LoadingPage.jsx';
import Perfil from '../components/Perfil.jsx';
import Store from '../components/Store.jsx';
import Categoria from '../components/Categoria.jsx';

const AppRouter = () => (
    <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Textileria" element={<Textileria />} />
        <Route path="/Bordado" element={<Bordado />} />
        <Route path="/Ceramica" element={<Ceramica />} />
        <Route path="/Estampado" element={<Estampado />} />
        <Route path="/Hojaleteria" element={<Hojaleteria />} />
        <Route path="/Joyeria" element={<Joyeria />} />
        <Route path="/Orfeteria" element={<Orfeteria />} />
        <Route path="/Pintura" element={<Pintura />} />
        <Route path="/TallaMadera" element={<TallaMadera />} />
        <Route path="/TallaPiedra" element={<TallaPiedra />} />

        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/categoria/:categoriaId" element={<Categoria />} />

    </Routes>
);

export default AppRouter;

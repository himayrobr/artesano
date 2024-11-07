// AppRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home.jsx';
import LoadingPage from '../components/LoadingPage.jsx';
import Perfil from '../components/Perfil.jsx';

const AppRouter = () => (
    <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Perfil" element={<Perfil />} />
    </Routes>
);

export default AppRouter;

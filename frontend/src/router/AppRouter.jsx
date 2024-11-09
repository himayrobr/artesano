// AppRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home.jsx';
import LoadingPage from '../components/LoadingPage.jsx';
import Perfil from '../components/Perfil.jsx';
import Store from '../components/Store.jsx';
import TallerAwaq from '../components/TallerAwaq.jsx'

import ArteAbedall from '../components/ArteAbedall.jsx';
import AsociacionArtesano from '../components/AsociacionArtesano.jsx';
import Lastenia from '../components/Lastenia.jsx'
import Retablo from '../components/Retablo.jsx';
import TallerSanabria from '../components/TallerSanabria.jsx';
const AppRouter = () => (
    <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Perfil" element={<Perfil />} />
        <Route path="/Store" element={<Store />} />
        <Route path="/TallerAwaq" element={<TallerAwaq />} />
        <Route path="/AsociacionArtesano" element={<AsociacionArtesano />} />
        <Route path="/ArteAbedall" element={<ArteAbedall />} />
        <Route path="/Lastenia" element={<Lastenia />} />
        <Route path="/Retablo" element={<Retablo />} />
        <Route path="/TallerSanabria" element={<TallerSanabria />} />
    </Routes>
);

export default AppRouter;

// AppRouter.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home.jsx';
import Textileria from '../components/Textileria.jsx';


import LoadingPage from '../components/LoadingPage.jsx';
import Perfil from '../components/Perfil.jsx';
import Store from '../components/Store.jsx';
import TallerAwaq from '../components/TallerAwaq.jsx'

import ArteAbedall from '../components/ArteAbedall.jsx';
import AsociacionArtesano from '../components/AsociacionArtesano.jsx';
import Lastenia from '../components/Lastenia.jsx'
import Retablo from '../components/Retablo.jsx';
import TallerSanabria from '../components/TallerSanabria.jsx';
import Bordado from '../components/Bordado.jsx';
import Ceramica from '../components/Ceramica.jsx';
import Estampado from '../components/Estampado.jsx';
import Hojaleteria from '../components/Hojaleteria.jsx';
import Joyeria from '../components/Joyeria.jsx';
import Orfeteria from '../components/Orfeteria.jsx';
import Pintura from '../components/Pintura.jsx';
import TallaMadera from '../components/TallaMadera.jsx';
import TallaPiedra from '../components/TallaPiedra.jsx';







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
        <Route path="/TallerAwaq" element={<TallerAwaq />} />
        <Route path="/AsociacionArtesano" element={<AsociacionArtesano />} />
        <Route path="/ArteAbedall" element={<ArteAbedall />} />
        <Route path="/Lastenia" element={<Lastenia />} />
        <Route path="/Retablo" element={<Retablo />} />
        <Route path="/TallerSanabria" element={<TallerSanabria />} />
    </Routes>
);

export default AppRouter;

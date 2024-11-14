import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import RegisterByEmail from './components/RegisterByEmail';
import RegisterByPhone from './components/RegisterByPhone';
import Home from './components/Home';
import RuraqLogin from './components/RuraqLogin'; // Importa el componente para Ruraq Maki
import PrivacyPolicy from './components/PrivacyPolicy';
import Chat from './components/Chat';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registro/correo" element={<RegisterByEmail />} />
        <Route path="/registro/celular" element={<RegisterByPhone />} />
        <Route path="/home" element={<Home />} /> {/* Ruta para Home */}
        <Route path="/ruraq-login" element={<RuraqLogin />} /> {/* Ruta para login de Ruraq Maki */}
        <Route path="/politica-privacidad" element={<PrivacyPolicy />} /> {/* Ruta para la política de privacidad */}
        <Route path="/Chat" element={<Chat />} /> {/* Ruta para el chat */}
      </Routes>
    </Router>
  );
};

export default App;

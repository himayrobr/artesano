// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import RegisterOptions from './components/RegisterOptions';
import Register from './components/Register';
import RegisterByEmail from './components/RegisterByEmail';
import RegisterByPhone from './components/RegisterByPhone';
import Home from './components/Home'; // Importa el nuevo componente Home

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<RegisterOptions />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registro/correo" element={<RegisterByEmail />} />
        <Route path="/registro/celular" element={<RegisterByPhone />} />
        <Route path="/home" element={<Home />} /> {/* Nueva ruta para Home */}
      </Routes>
    </Router>
  );
};

export default App;

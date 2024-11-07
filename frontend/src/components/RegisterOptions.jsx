// RegisterOptions.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterOptions.css';

const RegisterOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="register-options-container">
      <h2>Regístrate ahora y obtén las mejores promociones en artesanías peruanas</h2>
      <button onClick={() => navigate('/registro/correo')} className="register-button">
        Regístrate con tu correo
      </button>
      <button onClick={() => navigate('/registro/celular')} className="register-button">
        Regístrate con tu celular
      </button>
      <p onClick={() => navigate('/')} className="back-to-login">
        ¿Ya tienes una cuenta? Inicia sesión
      </p>
    </div>
  );
};

export default RegisterOptions;

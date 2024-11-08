// Register.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import { endpoints } from '../apiConfig';

const Register = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/');
  };

  const handleRegisterByEmail = () => {
    navigate('/registro/correo'); 
  };

  const handleRegisterByPhone = () => {
    navigate('/registro/celular');
  };

  const handleAuth = (provider) => {
    switch (provider) {
      case 'facebook':
        window.location.href = `${endpoints.register}/facebook`;
        break;
      case 'google':
        window.location.href = `${endpoints.register}/google`;
        break;
      case 'discord':
        window.location.href = `${endpoints.register}/discord`;
        break;
      default:
        break;
    }
  };

  return (
    <div className="registro-container">
      <div className="form-container">
        <h2 className="title">Regístrate ahora y obtén las mejores promociones en artesanías peruanas</h2>
        <button className="auth-button facebook" onClick={() => handleAuth('facebook')}>
          <i className="fab fa-facebook"></i> Regístrate con Facebook
        </button>
        <button className="auth-button discord" onClick={() => handleAuth('discord')}>
          <i className="fab fa-discord"></i> Regístrate con Discord
        </button>
        <button className="auth-button gmail" onClick={() => handleAuth('google')}>
          <i className="fab fa-google"></i> Regístrate con Gmail
        </button>
        <button className="auth-button email" onClick={handleRegisterByEmail}>
          <i className="fas fa-envelope"></i> Regístrate con tu correo
        </button>
        <button className="auth-button phone" onClick={handleRegisterByPhone}>
          <i className="fas fa-phone"></i> Regístrate con tu celular
        </button>
        <p className="login-link">
          ¿Ya tienes una cuenta?{' '}
          <span onClick={handleLoginClick} style={{ cursor: 'pointer', color: '#0000EE', textDecoration: 'underline' }}>
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;

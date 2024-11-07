// Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register'); // Redirige a la página de registro
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2 className="title">Inicia sesión y continúa viendo tus artesanías favoritas</h2>
        <button className="auth-button facebook"><i className="fab fa-facebook"></i> Inicia sesión con Facebook</button>
        <button className="auth-button instagram"><i className="fab fa-instagram"></i> Inicia sesión con Instagram</button>
        <button className="auth-button gmail"><i className="fab fa-google"></i> Inicia sesión con Gmail</button>
        <button className="auth-button rurak-maki"><i className="fas fa-user"></i> Inicia sesión con tu cuenta de Ruraq Maki</button>
        <p className="register-link">
          ¿No tienes cuenta?{' '}
          <span onClick={handleRegisterClick} style={{ cursor: 'pointer', color: '#0000EE', textDecoration: 'underline' }}>
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

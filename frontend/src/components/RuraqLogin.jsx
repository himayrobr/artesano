import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { endpoints } from '../apiConfig';

const RuraqLogin = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de autenticación con el backend para el login manual
    console.log('Login with', emailOrPhone, password);
  };

  const handleRegisterClick = () => {
    navigate('/register'); // Redirige a la página de registro
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2 className="title">Inicia sesión con tu cuenta de Ruraq Maki</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nombre de usuario, celular o correo"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="auth-button">
            Iniciar sesión
          </button>
        </form>

        <p className="forgot-password">
          ¿Olvidaste tu contraseña?
        </p>

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

export default RuraqLogin;

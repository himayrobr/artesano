import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import axios from 'axios';
import { endpoints } from '../apiConfig';

const RuraqLogin = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Realizar solicitud de login al backend
      const response = await axios.post(
        endpoints.login,
        { emailOrPhone, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Guardar token en localStorage y redirigir al home
      const token = response.data.token;
      localStorage.setItem('authToken', token);
      navigate('/home');
    } catch (error) {
      // Manejo de errores detallado
      console.error('Error al iniciar sesión:', error.response || error.message);

      if (error.response && error.response.status === 400) {
        setErrorMessage('Credenciales incorrectas. Verifica tu nombre de usuario y contraseña.');
      } else {
        setErrorMessage('Error al iniciar sesión. Por favor, intenta de nuevo más tarde.');
      }
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2 className="title">Inicia sesión con tu cuenta de Ruraq Maki</h2>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

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

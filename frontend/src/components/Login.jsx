import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { endpoints } from '../apiConfig';

const Login = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register'); // Redirige a la página de registro
  };

  const handleAuth = (provider) => {
    // Redirigir al backend para el inicio de sesión con el proveedor seleccionado
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

  const handleRuraqLoginClick = () => {
    navigate('/ruraq-login'); // Redirige a la página de login de Ruraq Maki
  };

  // Función para manejar la respuesta de autenticación con el token
  const handleAuthCallback = () => {
    // Verificar si hay un token en la URL (esto es lo que se espera de la redirección del backend)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); // Obtén el token de la URL
    
    if (token) {
      // Almacenar el token en localStorage
      localStorage.setItem('authToken', token);
      console.log("Token guardado:", token);
      // Redirigir al home o página de destino
      navigate('/home');
    }
  };

  // Uso de useEffect para manejar el callback de autenticación en el inicio de la página
  useEffect(() => {
    // Verifica si estamos en el flujo de autenticación con un token en la URL
    handleAuthCallback();
  }, []); // Esto se ejecutará solo cuando el componente se monte

  return (
    <div className="login-container">
      <div className="form-container">
        <h2 className="title">Inicia sesión y continúa viendo tus artesanías favoritas</h2>

        <button className="auth-button facebook" onClick={() => handleAuth('facebook')}>
          <i className="fab fa-facebook"></i> Inicia sesión con Facebook
        </button>
        <button className="auth-button gmail" onClick={() => handleAuth('google')}>
          <i className="fab fa-google"></i> Inicia sesión con Gmail
        </button>
        <button className="auth-button discord" onClick={() => handleAuth('discord')}>
          <i className="fab fa-discord"></i> Inicia sesión con Discord
        </button>
        <button className="auth-button rurak-maki" onClick={handleRuraqLoginClick}>
          <i className="fas fa-user"></i> Inicia sesión con tu cuenta de Ruraq Maki
        </button>

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

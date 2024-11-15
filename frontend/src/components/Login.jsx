import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { endpoints } from '../apiConfig';
import Cookies from 'js-cookie'; // Añadido para manejar cookies

const Login = () => {
  const navigate = useNavigate();

  // Función para redirigir a la página de registro
  const handleRegisterClick = () => {
    navigate('/register');
  };

  // Función para manejar la autenticación con proveedores externos
  const handleAuth = (provider) => {
    // Redirigir al backend para el inicio de sesión con el proveedor seleccionado
    const authUrls = {
      facebook: `${endpoints.register}/facebook`,
      google: `${endpoints.register}/google`,
      discord: `${endpoints.register}/discord`,
    };
    
    if (authUrls[provider]) {
      window.location.href = authUrls[provider];
    }
  };

  // Función para redirigir a la página de login de Ruraq Maki
  const handleRuraqLoginClick = () => {
    navigate('/ruraq-login');
  };

  // Función para manejar el callback de autenticación y almacenar el token
  const handleAuthCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userData = urlParams.get('userData');

    if (userData?.token) {
      // Guardar el token en localStorage y en cookies para persistencia
      localStorage.setItem('authToken', token);
      Cookies.set('authToken', token, { expires: 1 }); // Cookie expira en 1 día
      console.log("Token guardado:", token);
      navigate('/home');
    }
  };

  // Uso de useEffect para verificar si hay un token en la URL cuando el componente se monta
  useEffect(() => {
    handleAuthCallback();
  }, []);

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

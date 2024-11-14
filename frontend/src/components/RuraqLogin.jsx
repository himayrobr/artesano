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

  // Maneja el proceso de login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Realizar solicitud de login al backend
      const response = await axios.post(
        endpoints.login,
        { emailOrPhone, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true // Permite que se manejen las cookies
        }
      );

      // Guardar el token de la cookie en localStorage
      const token = response.data.token;  // Asegúrate de que el backend también lo devuelva si es necesario
      localStorage.setItem('authToken', token);

      console.log('Token guardado:', token);

      // Mostrar el token en la consola y confirmar la sesión
      console.log('Usuario conectado:', token);

      // Redirigir al home
      navigate('/home');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response || error.message);

      if (error.response && error.response.status === 400) {
        setErrorMessage('Credenciales incorrectas. Verifica tu nombre de usuario y contraseña.');
      } else if (error.response && error.response.status === 500) {
        setErrorMessage('Error del servidor. Por favor, intenta de nuevo más tarde.');
      } else {
        setErrorMessage('Error al iniciar sesión. Por favor, intenta de nuevo.');
      }
    }
  };

  // Redirige a la página de registro
  const handleRegisterClick = () => {
    navigate('/register');
  };

  // Mostrar sesión actual
  const checkSession = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log('Sesión activa con token:', token);
    } else {
      console.log('No hay sesión activa.');
    }
  };

  // Llamar a checkSession al cargar el componente para ver si hay sesión activa
  React.useEffect(() => {
    checkSession();
  }, []);

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

// Login.jsx
import React from 'react';
import '../styles/Login.css';

const Login = () => (
  <div className="login-container">
    <div className="form-container">
      <h2 className="title">Inicia sesión y continúa viendo tus artesanías favoritas</h2>
      <button className="auth-button facebook"><i className="fab fa-facebook"></i> Inicia sesión con Facebook</button>
      <button className="auth-button instagram"><i className="fab fa-instagram"></i> Inicia sesión con Instagram</button>
      <button className="auth-button gmail"><i className="fab fa-google"></i> Inicia sesión con Gmail</button>
      <button className="auth-button rurak-maki"><i className="fas fa-user"></i> Inicia sesión con tu cuenta de Ruraq Maki</button>
    </div>
  </div>
);

export default Login;

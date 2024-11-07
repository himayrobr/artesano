// Registro.jsx
import React from 'react';
import '../styles/Register.css';

const Registro = () => (
  <div className="registro-container">
    <div className="form-container">
      <h2 className="title">Regístrate ahora y obtén las mejores promociones en artesanías peruanas</h2>
      <button className="auth-button facebook"><i className="fab fa-facebook"></i> Regístrate con Facebook</button>
      <button className="auth-button instagram"><i className="fab fa-instagram"></i> Regístrate con Instagram</button>
      <button className="auth-button gmail"><i className="fab fa-google"></i> Regístrate con Gmail</button>
      <button className="auth-button email"><i className="fas fa-envelope"></i> Regístrate con tu correo</button>
      <button className="auth-button phone"><i className="fas fa-phone"></i> Regístrate con tu celular</button>
      <p className="login-link">¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
    </div>
  </div>
);

export default Registro;

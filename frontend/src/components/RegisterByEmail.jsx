// RegisterByEmail.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterByEmail.css';

const RegisterByEmail = () => {
  const navigate = useNavigate();

  return (
    <div className="register-email-container">
      <button onClick={() => navigate(-1)} className="back-button">←</button>
      <form className="form-container">
        <input type="text" placeholder="Nombre de usuario" required />
        <input type="email" placeholder="Correo electrónico" required />
        <input type="email" placeholder="Confirma tu correo" required />
        <input type="password" placeholder="Contraseña" required />
        <input type="password" placeholder="Confirma tu contraseña" required />
        <button type="submit" className="submit-button">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterByEmail;

// RegisterByPhone.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterByPhone.css';

const RegisterByPhone = () => {
  const navigate = useNavigate();

  return (
    <div className="register-phone-container">
      <button onClick={() => navigate(-1)} className="back-button">←</button>
      <form className="form-container">
        <input type="text" placeholder="Nombre de usuario" required />
        <input type="tel" placeholder="Número de celular" required />
        <input type="tel" placeholder="Confirma tu celular" required />
        <input type="password" placeholder="Contraseña" required />
        <input type="password" placeholder="Confirma tu contraseña" required />
        <button type="submit" className="submit-button">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterByPhone;

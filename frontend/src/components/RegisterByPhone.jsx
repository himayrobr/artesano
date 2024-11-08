// RegisterByPhone.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterByPhone.css';
import { endpoints } from '../apiConfig';

const RegisterByPhone = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    confirmPhone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone !== formData.confirmPhone || formData.password !== formData.confirmPassword) {
      alert("Los campos de confirmación no coinciden.");
      return;
    }

    try {
      const response = await fetch(endpoints.registerByPhone, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          phone: formData.phone,
          password: formData.password,
        }),
      });
      if (response.ok) {
        navigate('/'); // Redirige a la página de inicio de sesión o la página principal
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div className="register-phone-container">
      <button onClick={() => navigate(-1)} className="back-button">←</button>
      <form className="form-container" onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Nombre de usuario" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Número de celular" onChange={handleChange} required />
        <input type="tel" name="confirmPhone" placeholder="Confirma tu celular" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirma tu contraseña" onChange={handleChange} required />
        <button type="submit" className="submit-button">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterByPhone;

// RegisterByEmail.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterByEmail.css';
import { endpoints } from '../apiConfig';

const RegisterByEmail = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email !== formData.confirmEmail || formData.password !== formData.confirmPassword) {
      alert("Los campos de confirmación no coinciden.");
      return;
    }

    try {
      const response = await fetch(`${endpoints.register}/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
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
    <div className="register-email-container">
      <button onClick={() => navigate(-1)} className="back-button">←</button>
      <form className="form-container" onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Nombre de usuario" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
        <input type="email" name="confirmEmail" placeholder="Confirma tu correo" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirma tu contraseña" onChange={handleChange} required />
        <button type="submit" className="submit-button">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterByEmail;

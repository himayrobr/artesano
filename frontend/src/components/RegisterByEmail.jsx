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
    sex: '',
    birthDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email !== formData.confirmEmail || formData.password !== formData.confirmPassword) {
      alert("Los campos de confirmación no coinciden.");
      return;
    }

    // Guardamos los datos en el localStorage para mantener la información
    localStorage.setItem('registrationData', JSON.stringify(formData));

    // Redirigir a la página de Política de Privacidad
    navigate('/politica-privacidad');
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
        
        <label>Sexo:</label>
        <select name="sex" onChange={handleChange} required>
          <option value="">Selecciona</option>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
          <option value="other">Otro</option>
        </select>

        <label>Fecha de nacimiento:</label>
        <input type="date" name="birthDate" onChange={handleChange} required />

        <button type="submit" className="submit-button">Continuar</button>
      </form>
    </div>
  );
};

export default RegisterByEmail;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterByEmail.css';
import { endpoints } from '../apiConfig';
import { Link } from 'react-router-dom';

import Return from '../storage/img/arrow_back.svg';
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
      alert('Los campos de confirmación no coinciden.');
      return;
    }

    // Guardamos los datos en el localStorage para mantener la información
    localStorage.setItem('registrationData', JSON.stringify(formData));

    // Redirigir a la página de Política de Privacidad
    navigate('/politica-privacidad');
  };

  return (
    <div className="register-email-container">
      <button className="back-buttonI">
      <Link to='/'> 
        <img src={Return} className='back-buttonIMG'/>
      </Link>
      </button>
      <form className="form-containe" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='nombre-usuario'>Nombre de usuario*</label>
          <small>*Crea un nombre de usuario de mínimo 5 y máximo 12 caracteres</small>
          <input
            type="text"
            name="username"
            placeholder="Crea un nombre de usuario"
            maxLength="12"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Correo electrónico*</label>
          <input
            type="email"
            name="email"
            placeholder="Ingresa tu correo electrónico"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirma tu correo*</label>
          <input
            type="email"
            name="confirmEmail"
            placeholder="Confirma tu correo electrónico"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña*</label>
          <input
            type="password"
            name="password"
            placeholder="Crea una contraseña"
            onChange={handleChange}
            required
          />
          <small>*Recuerda crear una contraseña difícil de adivinar</small>
        </div>

        <div className="form-group">
          <label>Confirma tu contraseña*</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirma tu contraseña"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Sexo*</label>
          <select name="sex" onChange={handleChange} required>
            <option value="">Selecciona</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label>Fecha de nacimiento*</label>
          <div className="birthdate-inputs">
            <input
              type="date"
              name="birthDate"
              placeholder="DD/MM/AAAA"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-button">Continuar</button>
      </form>
    </div>
  );
};

export default RegisterByEmail;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterByPhone.css';
import { Link } from 'react-router-dom';

import Return from '../storage/img/arrow_back.svg';

const RegisterByPhone = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    confirmPhone: '',
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
    if (formData.phone !== formData.confirmPhone || formData.password !== formData.confirmPassword) {
      alert('Los campos de confirmación no coinciden.');
      return;
    }

    // Guardar datos temporales en localStorage para ser usados en PolicyPrivacy
    localStorage.setItem(
      'registrationData',
      JSON.stringify({
        username: formData.username,
        phone: formData.phone,
        password: formData.password,
        sex: formData.sex,
        birthDate: formData.birthDate,
      })
    );

    // Redirigir a la página de Política de Privacidad
    navigate('/politica-privacidad');
  };

  return (
    <div className="register-phone-container">
      <button className="back-buttonP">
      <Link to='/'> 
      <img src={Return} className='back-buttonP'/>  
      </Link>        
      </button>
      <form className="form-containerr" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de usuario*</label>
          <input
            type="text"
            name="username"
            placeholder="Crea un nombre de usuario"
            maxLength="12"
            onChange={handleChange}
            required
          />
          <small>*Crea un nombre de usuario de mínimo 5 y máximo 12 caracteres</small>
        </div>

        <div className="form-group">
          <label>Número de celular*</label>
          <div className="phone-input">
            <select name="countryCode" onChange={handleChange} required>
              <option value="+51">+51</option>
              {/* Puedes añadir más códigos de país aquí */}
            </select>
            <input
              type="tel"
              name="phone"
              placeholder="Número de celular"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Confirma tu celular*</label>
          <div className="phone-input">
            <select name="countryCode" onChange={handleChange} disabled>
              <option value="+51">+51</option>
            </select>
            <input
              type="tel"
              name="confirmPhone"
              placeholder="Confirma tu celular"
              onChange={handleChange}
              required
            />
          </div>
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

export default RegisterByPhone;

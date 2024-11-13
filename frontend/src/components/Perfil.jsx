import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Perfil.css';

import menuImg from '../storage/img/menu.svg';
import seekerImg from '../storage/img/seeker.svg';
import favoritesImg from '../storage/img/favorites.svg';
import shoppingImg from '../storage/img/shopping.svg';
import workshopsAndCraftsImg from '../storage/img/workshopsAndCrafts.svg';
import couponsImg from '../storage/img/coupons.svg';
import categoriesImg from '../storage/img/categories.svg';
import shoppingCartImg from '../storage/img/shoppingCart.svg';
import generalSettingsImg from '../storage/img/generalSettings.svg';
import profileImg from '../storage/img/perfile.png';
import workshopImg from '../storage/img/workshop.svg';
import redeemCouponsImg from '../storage/img/redeemCoupons.svg';
import settingsImg from '../storage/img/settings.svg';
import commentsImg from '../storage/img/comments.svg';
import customerServiceImg from '../storage/img/customerService.svg';
import Edit from '../storage/img/Group 17.svg';


import { useHomeLogic } from '../data/PerfilLogic';

function Perfil() {
  const { menuOpen, searchTerm, filteredResults, toggleMenu, handleSearch } = useHomeLogic();
  const menuRef = useRef(null);

  const [editMode, setEditMode] = useState({
    username: false,
    email: false,
    Télefono: false,
    Género: false,
    dob: false
  });
  const [userData, setUserData] = useState({
    username: "SaraMartin9",
    email: "SMBY1996@gmail.com",
    Télefono: "301155788",
    gender: "Femenino",
    dob: "1996-09-15"
  });

  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const toggleEditMode = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (e, field) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  const togglePaymentForm = () => {
    setShowPaymentForm(!showPaymentForm);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    togglePaymentForm();
  };

  return (
      <div className="main">     
      <header>
        <div className="mobile-header">
          <div className="mobile-nav-toggle" >
          <img src={menuImg} id='checkbox' alt="Menú" onClick={toggleMenu}/>
            <div className="search">
              <img src={seekerImg} alt="Buscar" />
              <input
                type="text"
                placeholder="Buscar producto o tienda..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            {filteredResults.length > 0 && (
              <div className="result">
                <ul>
                  {filteredResults.map((item) => (
                    <li key={item._id_}>{item.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Menú lateral */}
        <div className={`navigation ${menuOpen ? 'open' : ''}`} ref={menuRef}>
          <div className="mobile-top-bar">
            {/* Botón de cerrar menú */}
            <span className="mobile-nav-toggle close" onClick={toggleMenu}>
              <img src={profileImg} alt="Perfil" />
              <h3>SaraMartin9</h3>
            </span>
          </div>
          
          {/* Menú de navegación */}
          <div className="main-navigation">
            <ul className="navigation__option">
              <li>
                <Link to="/">
                  <img src={favoritesImg} alt="Lista de favoritos" />
                  <strong>Lista de favoritos</strong>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={shoppingImg} alt="Compras" />
                  <strong>Compras</strong>
                </Link>
              </li>
              <li>
                <Link to="/TallerEducativo">
                  <img src={workshopImg} alt="Talleres" />
                  <strong>Talleres</strong>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={redeemCouponsImg} alt="Canjear cupón" />
                  <strong>Canjear cupón</strong>
                </Link>
              </li>
            </ul>
            <div className="navigation__division"></div>
            <ul className="navigation__option">
              <li>
                <Link to="/Ajustes">
                  <img src={settingsImg} alt="Ajustes" />
                  <strong>Ajustes</strong>
                </Link>
              </li>
              <li>
                <Link to="/Comentarios">
                  <img src={commentsImg} alt="Comentarios" />
                  <strong>Comentarios</strong>
                </Link>
              </li>
              <li>
                <Link to="/AtencionCliente">
                  <img src={customerServiceImg} alt="Atención al cliente" />
                  <strong>Atención al cliente</strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      
      <main className="profile-container">
        <div className="profile-header">
          <h2>Foto de perfil</h2>
          <img src={profileImg} alt="Foto de perfil" className="profile-photo" />
        </div>

        <div className="profile-info">
          {Object.keys(userData).map((field) => {
            if (field === 'gender' || field === 'dob') {
              return null;
            }

            return (
              <div className="profile-field" key={field}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  value={userData[field]}
                  disabled={!editMode[field]}
                  onChange={(e) => handleInputChange(e, field)}
                />
                <img
                  src={Edit}
                  alt="edit"
                  id="editar"
                  onClick={() => toggleEditMode(field)}
                />
              </div>
            );
          })}

          {/* Contenedor para el género y la fecha de nacimiento */}
          <div className="profile-field-group">
            <div className="profile-field">
              <label>Género:</label>
              <select
                value={userData.gender}
                disabled={!editMode.gender}
                onChange={(e) => handleInputChange(e, 'gender')}
                className={`interactive-select ${!editMode.gender ? 'disabled' : ''}`}
              >
                <option value="female">Femenino</option>
                <option value="male">Masculino</option>
              </select>
              <img
                src={Edit}
                alt="edit"
                id="editar"
                onClick={() => toggleEditMode('gender')}
              />
            </div>

            <div className="profile-field">
              <label>Fecha de nacimiento:</label>
              <input
                type="date"
                value={userData.dob}
                disabled={!editMode.dob}
                onChange={(e) => handleInputChange(e, 'dob')}
                className={`interactive-date ${!editMode.dob ? 'disabled' : ''}`}
              />
              <img
                src={Edit}
                alt="edit"
                id="editar"
                onClick={() => toggleEditMode('dob')}
              />
            </div>
          </div>
        </div>

        <div className="payment-methods">
          <h3>Métodos de pago</h3>
          <input type="text" value="Visa Mastercard" disabled />
          <button className="add-payment" onClick={togglePaymentForm}>
            Añadir método de pago
          </button>

          {showPaymentForm && (
            <div className="payment-form-modal-overlay" onClick={togglePaymentForm}>
              <div className="payment-form-modal" onClick={(e) => e.stopPropagation()}>
                <form className="payment-form" onSubmit={handlePaymentSubmit}>
                  <h4>Añadir Método de Pago</h4>
                  <label>
                    Tipo de Tarjeta:
                    <select required>
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                    </select>
                  </label>
                  <label>
                    Número de Tarjeta:
                    <input type="text" placeholder="Número de tarjeta" required />
                  </label>
                  <label>
                    Fecha de Expiración:
                    <input type="text" placeholder="MM/AA" required />
                  </label>
                  <label>
                    Código de Seguridad:
                    <input type="text" placeholder="CVC" required />
                  </label>
                  <button type="submit">Guardar</button>
                  <button type="button" onClick={togglePaymentForm}>
                    Cancelar
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer>
        <Link to="/Store">
          <img src={workshopsAndCraftsImg} alt="Talleres y Artesanías" />
        </Link>
        <Link to="/">
          <img src={couponsImg} alt="Cupones" />
        </Link>
        <Link to="/Home">
          <img src={categoriesImg} alt="Categorías" />
        </Link>
        <Link to="/">
          <img src={shoppingCartImg} alt="Carrito de compras" />
        </Link>
        <Link to="/Perfil">
          <img src={generalSettingsImg} alt="Configuración general" />
        </Link>
      </footer>
    </div>
  );
}

export default Perfil;

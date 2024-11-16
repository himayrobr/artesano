import React from 'react';
import { Link } from 'react-router-dom';

// Import images
import workshopsAndCraftsImg from '../storage/img/workshopsAndCrafts.svg';
import couponsImg from '../storage/img/coupons.svg';
import categoriesImg from '../storage/img/categories.svg';
import shoppingCartImg from '../storage/img/shoppingCart.svg';
import generalSettingsImg from '../storage/img/generalSettings.svg';

const Footer = () => {
  return (
    <footer>
      <Link to="/Store">
        <img src={workshopsAndCraftsImg} alt="Talleres y Artesanías" />
      </Link>
      <Link to="/ProductosDescuentos">
        <img src={couponsImg} alt="ProductosDescuentos" />
      </Link>
      <Link to="/Home">
        <img src={categoriesImg} alt="Categorías" />
      </Link>
      <Link to="/Cart">
        <img src={shoppingCartImg} alt="Carrito de compras" />
      </Link>
      <Link to="/Perfil">
        <img src={generalSettingsImg} alt="Configuración general" />
      </Link>
    </footer>
  );
};

export default Footer;
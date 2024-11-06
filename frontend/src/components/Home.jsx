import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/Home.css';

// Import images
import menuImg from '../storage/img/menu.svg';
import seekerImg from '../storage/img/seeker.svg';
import profileImg from '../storage/img/perfile.png';
import favoritesImg from '../storage/img/favorites.svg';
import shoppingImg from '../storage/img/shopping.svg';
import workshopImg from '../storage/img/workshop.svg';
import redeemCouponsImg from '../storage/img/redeemCoupons.svg';
import settingsImg from '../storage/img/settings.svg';
import commentsImg from '../storage/img/comments.svg';
import customerServiceImg from '../storage/img/customerService.svg';
import workshopsAndCraftsImg from '../storage/img/workshopsAndCrafts.svg';
import couponsImg from '../storage/img/coupons.svg';
import categoriesImg from '../storage/img/categories.svg';
import shoppingCartImg from '../storage/img/shoppingCart.svg';
import generalSettingsImg from '../storage/img/generalSettings.svg';

// Import el componente de animación

function Home() {
  return (
    <div>
      <header>
        <div className="mobile-header">
          <div className="mobile-nav-toggle">
            <img src={menuImg} alt="Menu" />
            <div className="search">
              <img src={seekerImg} alt="Search" />
              <input type="text" placeholder="Buscar producto o tienda..." />
            </div>
            <div className="result">
              <ul>
                {/* <li>Producto 1</li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="navigation">
          <div className="mobile-top-bar">
            <span className="mobile-nav-toggle close">
              <img src={profileImg} alt="Profile" />
              <h3>SaraMartin9</h3>
            </span>
          </div>
          <div className="main-navigation">
            <ul className="navigation__option">
              <li>
                <Link to="/favorites">
                  <img src={favoritesImg} alt="Favorites" />
                  <strong>Lista de favoritos</strong>
                </Link>
              </li>
              <li>
                <Link to="/shopping">
                  <img src={shoppingImg} alt="Shopping" />
                  <strong>Compras</strong>
                </Link>
              </li>
              <li>
                <Link to="/workshops">
                  <img src={workshopImg} alt="Workshops" />
                  <strong>Talleres</strong>
                </Link>
              </li>
              <li>
                <Link to="/redeem-coupons">
                  <img src={redeemCouponsImg} alt="Redeem Coupons" />
                  <strong>Canjear cupón</strong>
                </Link>
              </li>
            </ul>
            <div className="navigation__division"></div>
            <ul className="navigation__option">
              <li>
                <Link to="/settings">
                  <img src={settingsImg} alt="Settings" />
                  <strong>Ajustes</strong>
                </Link>
              </li>
              <li>
                <Link to="/comments">
                  <img src={commentsImg} alt="Comments" />
                  <strong>Comentarios</strong>
                </Link>
              </li>
              <li>
                <Link to="/customer-service">
                  <img src={customerServiceImg} alt="Customer Service" />
                  <strong>Atención al cliente</strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main>
      </main>
      <footer>
        <Link to="/workshops-and-crafts"><img src={workshopsAndCraftsImg} alt="Workshops and Crafts" /></Link>
        <Link to="/coupons"><img src={couponsImg} alt="Coupons" /></Link>
        <Link to="/" className="active"><img src={categoriesImg} alt="Categories" /></Link>
        <Link to="/shopping-cart"><img src={shoppingCartImg} alt="Shopping Cart" /></Link>
        <Link to="/general-settings"><img src={generalSettingsImg} alt="General Settings" /></Link>
      </footer>
    </div>
  );
}

export default Home;

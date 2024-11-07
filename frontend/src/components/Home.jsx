import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

// Importar imágenes
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

// Importar lógica del componente
import { useHomeLogic } from '../data/HomeLogic';

function Home() {
  const { menuOpen, searchTerm, filteredResults, toggleMenu, handleSearch } = useHomeLogic();

  // Define menuRef
  const menuRef = useRef(null);

  return (
    <div>
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
                <Link to="/">
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
                <Link to="/">
                  <img src={settingsImg} alt="Ajustes" />
                  <strong>Ajustes</strong>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={commentsImg} alt="Comentarios" />
                  <strong>Comentarios</strong>
                </Link>
              </li>
              <li>
                <Link to="/">
                  <img src={customerServiceImg} alt="Atención al cliente" />
                  <strong>Atención al cliente</strong>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main>
        {/* Aquí puedes agregar el contenido principal */}
      </main>

      <footer>
        <Link to="/">
          <img src={workshopsAndCraftsImg} alt="Talleres y Artesanías" />
        </Link>
        <Link to="/">
          <img src={couponsImg} alt="Cupones" />
        </Link>
        <Link to="/">
          <img src={categoriesImg} alt="Categorías" />
        </Link>
        <Link to="/">
          <img src={shoppingCartImg} alt="Carrito de compras" />
        </Link>
        <Link to="/">
          <img src={generalSettingsImg} alt="Configuración general" />
        </Link>
      </footer>
    </div>
  );
}

export default Home;

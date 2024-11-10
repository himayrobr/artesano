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


import Location from '../storage/img/location.svg'
import Taller from '../storage/img/Vector(2).png';
import Diseño from '../storage/img/diseño.svg';
import Textileria from '../storage/img/workshopCategory.svg';
import Ceramica from '../storage/img/ceramicCategory.svg';
import Orfebreria from '../storage/img/goldsmithCategory.svg';
import Tallaenpiedra from '../storage/img/stoneWorkshopCategory.svg';
import Tallaenmadera from '../storage/img/woodWorkshopCategory.svg';
import Bordado from '../storage/img/embroideryCategory.svg';
import Joyeria from '../storage/img/jewelryCategory.svg';
import Hojalateria from '../storage/img/sheetMetalCategory.svg';
import Estampado from '../storage/img/stampedCategory.svg';
import Pintura from '../storage/img/paintingTraditionalCategory.svg';



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

      <main className='main'>
        <section className="categoria-taller">
          <div className="ubicacion">
            <img src={Location} alt="Location" id='Location'/>
            <p>Ubicación de entrega actual</p>
          </div>
            <img src={Diseño} id='diseño' />
          <h2 className='tituloCategoria'>Categorías</h2>
          <div className="categorias">
            {/* Cada div representa una categoría */}
            <Link to="/Textileria" className="categoria">
              <img src={Textileria} alt="Textilería" />
              <p>Textilería</p>
            </Link>
            <Link to="/categoria/ceramica" className="categoria">
              <img src={Ceramica} alt="Cerámica" />
              <p>Cerámica</p>
            </Link>
            <Link to="/categoria/orfebreria" className="categoria">
              <img src={Orfebreria} alt="Orfebrería" />
              <p>Orfebrería</p>
            </Link>
            <Link to="/categoria/tallaenpiedra" className="categoria">
              <img src={Tallaenpiedra} alt="Talla en piedra" />
              <p>Talla en piedra</p>
            </Link>
            <Link to="/categoria/tallaenmadera" className="categoria">
              <img src={Tallaenmadera} alt="Talla en madera" />
              <p>Talla en madera</p>
            </Link>
          </div>
          <div className="categorias">
            <Link to="/categoria/bordado" className="categoria">
              <img src={Bordado} alt="Bordado" />
              <p>Bordado</p>
            </Link>
            <Link to="/categoria/joyeria" className="categoria">
              <img src={Joyeria} alt="Joyería" />
              <p>Joyería</p>
            </Link>
            <Link to="/categoria/hojalateria" className="categoria">
              <img src={Hojalateria} alt="Hojalatería" />
              <p>Hojalatería</p>
            </Link>
            <Link to="/categoria/estampado" className="categoria">
              <img src={Estampado} alt="Estampado" />
              <p>Estampado</p>
            </Link>
            <Link to="/categoria/pintura" className="categoria">
              <img src={Pintura} alt="Pintura tradicional" />
              <p>Pintura tradicional</p>
            </Link>
          </div>
            
          <h2 className='titulo'>Talleres del mes</h2>
          <p>¡Aprende cómo hacerlos en estos talleres educativos!</p>
          <div className="taller">
            <img src={Taller} alt="Taller del mes" id='imagen' />
          </div>
        </section>
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

export default Home;

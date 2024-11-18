import React, { useRef, useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; // Importamos el nuevo componente
import Footer from './Footer';
import { endpoints } from '../apiConfig';
import '../styles/Home.css';

// Import images
import menuImg from '../storage/img/menu.svg';
import favoritesImg from '../storage/img/favorites.svg';
import shoppingImg from '../storage/img/shopping.svg';
import workshopsAndCraftsImg from '../storage/img/workshopsAndCrafts.svg';
import couponsImg from '../storage/img/coupons.svg';
import categoriesImg from '../storage/img/categories.svg';
import shoppingCartImg from '../storage/img/shoppingCart.svg';
import generalSettingsImg from '../storage/img/generalSettings.svg';
import BaseProfileImg from '../storage/img/R.png';
import workshopImg from '../storage/img/workshop.svg';
import redeemCouponsImg from '../storage/img/redeemCoupons.svg';
import settingsImg from '../storage/img/settings.svg';
import commentsImg from '../storage/img/comments.svg';
import customerServiceImg from '../storage/img/customerService.svg';
import logoutImg from '../storage/img/logout.svg';

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

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Function to toggle menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Obtener datos del usuario del localStorage
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (!userData || !userData.token) {
        navigate('/', { replace: true });
        //window.location.href = '/'; // * Descomentar en caso de que no retorne al Login...
        return;
      }  

      if (userData) {
        setUsername(userData.username);
        setUserPhoto(userData.userPhoto ? userData.userPhoto : BaseProfileImg);
      }
    } catch (error) {
      console.error('Error al parsear datos:', error);
    }
    
    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    // Prevenir navegación hacia atrás después del logout
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', preventBack);

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('popstate', preventBack);
    };
  }, [navigate]);

  const preventBack = () => {
    window.history.pushState(null, null, window.location.pathname);
  };

  const handleLogout = () => {
    try {
      // Limpiar datos
      setUsername('');
      setUserPhoto('');
      localStorage.clear(); // Limpia todo el localStorage

      // Redirigir y reemplazar la entrada en el historial
      navigate('/', { replace: true });
      window.location.href = '/';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    setUserPhoto(userData?.userPhoto || BaseProfileImg);

    // Escuchar cambios en la foto
    const handlePhotoUpdate = () => {
      const updatedUserData = JSON.parse(localStorage.getItem('userData'));
      setUserPhoto(updatedUserData?.userPhoto || BaseProfileImg);
    };

    window.addEventListener('userPhotoUpdated', handlePhotoUpdate);
    return () => window.removeEventListener('userPhotoUpdated', handlePhotoUpdate);
  }, []);

  return (
    <div>
      <header>
        <div className="mobile-header">
          <div className="mobile-nav-toggle">
            <img src={menuImg} id='checkbox' alt="Menú" onClick={toggleMenu}/>
            <SearchBar /> {/* Aquí usamos el nuevo componente SearchBar */}
          </div>
        </div>

        {/* Sidebar menu */}
        <div className={`navigation ${menuOpen ? 'open' : ''}`} ref={menuRef}>
          <div className="mobile-top-bar">
            {/* Close menu button */}
            <span className="mobile-nav-toggle close" onClick={toggleMenu}>
              <img 
                src={userPhoto} 
                alt="Foto de perfil"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = BaseProfileImg;
                }}
              />
              <h3>{username}</h3>
            </span>
          </div>
          
          {/* Navigation menu */}
          <div className="main-navigation">
            <ul className="navigation__option">
              <li>
                <Link to="/FavoritosArtesanias">
                  <img src={favoritesImg} alt="Lista de favoritos" />
                  <strong>Lista de favoritos</strong>
                </Link>
              </li>
              <li>
                <Link to="/ComprasRealizadas">
                  <img src={favoritesImg} alt="Lista de favoritos" />
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
                <Link to="/CanjearCupon">
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
              <li>
                <Link onClick={handleLogout}>
                  <img src={logoutImg} alt="Cerrar sesión" />
                  <strong>Cerrar sesión</strong>
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
            {/* Each div represents a category */}
            <Link to="/categoria/Textilería" className="categoria">
              <img src={Textileria} alt="Textilería" />
              <p>Textilería</p>
            </Link>
            <Link to="/categoria/Cerámica" className="categoria">
              <img src={Ceramica} alt="Cerámica" />
              <p>Cerámica</p>
            </Link>
            <Link to="/categoria/Orfebrería" className="categoria">
              <img src={Orfebreria} alt="Orfebrería" />
              <p>Orfebrería</p>
            </Link>
            <Link to="/categoria/Talla en piedra" className="categoria">
              <img src={Tallaenpiedra} alt="Talla en piedra" />
              <p>Talla en piedra</p>
            </Link>
            <Link to="/categoria/Talla en madera" className="categoria">
              <img src={Tallaenmadera} alt="Talla en madera" />
              <p>Talla en madera</p>
            </Link>
          </div>
          <div className="categorias">
            <Link to="/categoria/Bordado" className="categoria">
              <img src={Bordado} alt="Bordado" />
              <p>Bordado</p>
            </Link>
            <Link to="/categoria/Joyería" className="categoria">
              <img src={Joyeria} alt="Joyería" />
              <p>Joyería</p>
            </Link>
            <Link to="/categoria/Hojalatería" className="categoria">
              <img src={Hojalateria} alt="Hojalatería" />
              <p>Hojalatería</p>
            </Link>
            <Link to="/categoria/Estampado" className="categoria">
              <img src={Estampado} alt="Estampado" />
              <p>Estampado</p>
            </Link>
            <Link to="/categoria/Pintura" className="categoria">
              <img src={Pintura} alt="Pintura" />
              <p>Pintura</p>
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
    </div>
  );
}

export default Home;
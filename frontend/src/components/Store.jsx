import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import Footer from './Footer';
import '../styles/Store.css';

// Import images
import menuImg from '../storage/img/menu.svg';
import favoritesImg from '../storage/img/favorites.svg';
import shoppingImg from '../storage/img/shopping.svg';
import workshopImg from '../storage/img/workshop.svg';
import redeemCouponsImg from '../storage/img/redeemCoupons.svg';
import settingsImg from '../storage/img/settings.svg';
import commentsImg from '../storage/img/comments.svg';
import customerServiceImg from '../storage/img/customerService.svg';
import Diseño from '../storage/img/diseño.svg';
import Filter from '../storage/img/Group8(1).svg';
import profileImg from '../storage/img/perfile.png';
import orderBy from 'lodash/orderBy';

// Function to fetch stores
const fetchStores = async () => {
  try {
    const response = await fetch('http://localhost:5000/store/');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los datos de las tiendas:', error);
    return [];
  }
};

function Store() {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderByValue, setOrderByValue] = useState('nombre');
  const [sortedTalleres, setSortedTalleres] = useState([]);
  const [talleresData, setTalleresData] = useState([]);

  // Load stores on component mount
  useEffect(() => {
    const loadStores = async () => {
      const stores = await fetchStores();
      setTalleresData(stores);
      setSortedTalleres(stores);
    };
    loadStores();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOrderChange = (e) => {
    const orderValue = e.target.value;
    setOrderByValue(orderValue);

    let sortedArray;
    switch (orderValue) {
      case 'nombre':
        sortedArray = orderBy(talleresData, ['nombre'], ['asc']);
        break;
      case 'ubicacion':
        sortedArray = orderBy(talleresData, ['ubicacion'], ['asc']);
        break;
      default:
        sortedArray = talleresData;
    }

    setSortedTalleres(sortedArray);
  };

  const handleCardClick = (taller) => {
    navigate(`/taller/${taller._id}`, { state: { taller } });
  };

  return (
    <div className="main-store">
      <header>
        <div className="mobile-header">
          <div className="mobile-nav-toggle">
            <img src={menuImg} id="checkbox" alt="Menú" onClick={toggleMenu} />
            <SearchBar />
          </div>
        </div>

        <div className={`navigation ${menuOpen ? 'open' : ''}`} ref={menuRef}>
          <div className="mobile-top-bar">
            <span className="mobile-nav-toggle close" onClick={toggleMenu}>
              <img src={profileImg} alt="Perfil" />
              <h3>SaraMartin9</h3>
            </span>
          </div>
          
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
            </ul>
          </div>
        </div>
      </header>

      <main className="scroll-container">
        <section className="section">
          <div className="content">
            <img src={Diseño} id="diseño" alt="Diseño" />
            <h2 className="tituloStore">Talleres y tiendas artesanales</h2>
            <p className="parrafo">Tiendas de artesanías de todas partes del Perú</p>

            <img src={Filter} alt="Filtro" id="filter" onClick={toggleModal} />
            
            {isModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={toggleModal}>&times;</span>
                  <h2>Filtrar búsqueda</h2>
                  
                  <label htmlFor="orderBy">Ordenar por:</label>
                  <select 
                    id="orderBy"
                    value={orderByValue} 
                    onChange={handleOrderChange}
                  >
                    <option value="nombre">Nombre</option>
                    <option value="ubicacion">Ubicación</option>
                  </select>
                  
                  <button onClick={toggleModal}>Aplicar filtro</button>
                </div>
              </div>
            )}

            <div className="grid-container">
              {sortedTalleres.map((taller) => (
                <div key={taller._id} className="card" onClick={() => handleCardClick(taller)}>
                  <div className="card-content">
                    <h3>{taller.nombre}</h3>
                    <p>{taller.ciudad}</p>
                  </div>
                  <img src={taller.foto} alt={taller.nombre} className="card-img" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Store;
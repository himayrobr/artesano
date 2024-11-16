import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Store.css';

// Importar imágenes
import menuImg from '../storage/img/menu.svg';
import seekerImg from '../storage/img/seeker.svg';
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
import workshopsAndCraftsImg from '../storage/img/workshopsAndCrafts.svg'; // Asegúrate de que este archivo exista
import couponsImg from '../storage/img/coupons.svg'; // Asegúrate de que este archivo exista
import categoriesImg from '../storage/img/categories.svg'; // Asegúrate de que este archivo exista
import shoppingCartImg from '../storage/img/shoppingCart.svg'; // Asegúrate de que este archivo exista
import generalSettingsImg from '../storage/img/generalSettings.svg'; // Asegúrate de que este archivo exista
import { endpoints } from '../apiConfig.js';
import orderBy from 'lodash/orderBy';


// Función para obtener las tiendas
const fetchStores = async () => {
  try {
    const response = await fetch('http://localhost:5000/store/'); // Cambia la URL según sea necesario
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
  
  // Estados para el buscador
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({
    products: [],
    stores: []
  });
  const [isLoading, setIsLoading] = useState(false);

  // Efecto para cargar las tiendas
  useEffect(() => {
    const loadStores = async () => {
      const stores = await fetchStores();
      setTalleresData(stores);
      setSortedTalleres(stores);
    };
    loadStores();
  }, []);

  // Efecto para cerrar el menú al hacer clic fuera
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

  // Función para alternar el menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Función para alternar el modal de filtro
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Función para manejar el cambio de orden
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

  // Función para manejar la búsqueda
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      setIsLoading(true);
      try {
        const [productsResponse, storesResponse] = await Promise.all([
          fetch(endpoints.search(value)),
          fetch(endpoints.searchByStore(value))
        ]);

        if (!productsResponse.ok || !storesResponse.ok) {
          throw new Error('Error en la búsqueda');
        }

        const [productsData, storesData] = await Promise.all([
          productsResponse.json(),
          storesResponse.json()
        ]);

        setSearchResults({
          products: productsData,
          stores: storesData
        });
      } catch (error) {
        console.error('Error al buscar:', error);
        setSearchResults({
          products: [],
          stores: []
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults({
        products: [],
        stores: []
      });
    }
  };

  // Función para manejar el clic en una tarjeta
  const handleCardClick = (taller) => {
    navigate(`/taller/${taller._id}`, { state: { taller } });
  };

  return (
    <div className="main-store">
      <header>
        <div className="mobile-header">
          <div className="mobile-nav-toggle">
            <img src={menuImg} id="checkbox" alt="Menú" onClick={toggleMenu} />
            <div className="search">
              <img src={seekerImg} alt="Buscar" />
              <input
                type="text"
                placeholder="Buscar producto o tienda..."
                value={searchTerm}
                onChange={handleSearch}
              />
              {/* Contenedor de resultados de búsqueda */}
              {isLoading && (
                <div className="result">
                  <p>Buscando...</p>
                </div>
              )}
              {(searchResults.products.length > 0 || searchResults.stores.length > 0) && (
                <div className="result">
                  {/* Resultados de tiendas */}
                  {searchResults.stores.length > 0 && (
                    <div className="stores-results">
                      <h4>Tiendas</h4>
                      <ul>
                        {searchResults.stores.map((store) => (
                          <li key={`store-${store._id}`}>
                            <Link to={`/store/${store._id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                              {store.foto && (
                                <img src={store.foto} alt={store.nombre} className="store-thumbnail" />
                              )}
                              <span style={{ marginLeft: '50px' }}>{store.nombre}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Resultados de productos */}
                  {searchResults.products.length > 0 && (
                    <div className="products-results">
                      <h4>Productos</h4>
                      <ul>
                        {searchResults.products.map((item) => (
                          <li key={`product-${item._id}`}>
                            <Link to={`/product/${item._id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                              {item.fotos && item.fotos[0] && (
                                <img src={item.fotos[0]} alt={item.nombre} className="product-thumbnail" />
                              )}
                              <span style={{ marginLeft: '50px' }}>{item.nombre} - ${item.precio}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Menú lateral */}
        <div className={`navigation ${menuOpen ? 'open' : ''}`} ref={menuRef}>
          <div className="mobile-top-bar">
            <span className="mobile-nav-toggle close" onClick={toggleMenu}>
              <img src={profileImg} alt="Perfil" />
              <h3>SaraMartin9</h3>
            </span>
          </div>
          
          {/* Menú de navegación */}
          <div className="main-navigation">
            <ul className="navigation__option">
              <li>
                <Link to="/Home">
                  <img src={favoritesImg} alt="Lista de favoritos" />
                  <strong>Lista de favoritos</strong>
                </Link>
              </li>
              <li>
                <Link to="/Home">
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

            {/* Icono de filtro que abre el modal */}
            <img src={Filter} alt="Filtro" id="filter" onClick={toggleModal} />
            
            {/* Modal de filtro */}
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

      <footer>
        <Link to="/Store">
          <img src={workshopsAndCraftsImg} alt="Talleres y Artesanías" />
        </Link>
        <Link to="/ProductosDescuentos">
          <img src={couponsImg} alt="Cupones" />
        </Link>
        <Link to="/Home">
          <img src={categoriesImg} alt="Categorías" />
        </Link>
        <Link to="/Cart">
          <img src={shoppingCartImg} alt="Carrito de compras" />
        </Link>
        <Link to="/Perfil">
          <img src={generalSettingsImg} alt="Ajustes" />
        </Link>
      </footer>
    </div>
  );
}

export default Store;
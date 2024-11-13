// Store.js
import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate para la redirección
import '../styles/Store.css';
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
import { useHomeLogic } from '../data/StoreLogic.js';
import orderBy from 'lodash/orderBy';

const fetchStores = async () => {
  try {
    const response = await fetch('http://localhost:5000/store/stores'); // Cambia la URL según sea necesario
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los datos de las tiendas:', error);
  }
};

function Store() {
  const { menuOpen, searchTerm, filteredResults, toggleMenu, handleSearch } = useHomeLogic();
  const navigate = useNavigate(); // Inicializa el hook useNavigate
  const menuRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterInput, setFilterInput] = useState('');
  const [orderByValue, setOrderByValue] = useState('nombre');
  const [sortedTalleres, setSortedTalleres] = useState([]);
  const [talleresData, setTalleresData] = useState([]);

  useEffect(() => {
    const loadStores = async () => {
      const stores = await fetchStores();
      setTalleresData(stores); // Almacena los datos en el estado
      setSortedTalleres(stores); // Al principio, los talleres no estarán ordenados
    };
    loadStores();
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  
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

  // Función para manejar el clic en una tarjeta de tienda y redirigir con los datos seleccionados
  const handleCardClick = (taller) => {
    navigate(`/taller/${taller._id}`, { state: { taller } });
  };

  return (
    <div className="main">
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
      </header>

      <main className="scroll-container">
        <section className="section">
          <div className="content">
            <img src={Diseño} id="diseño" alt="Diseño" />
            <h2 className="tituloStore">Talleres y tiendas artesanales</h2>
            <p className="parrafo">Tiendas de artesanías de todas partes del Perú</p>

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
    </div>
  );
}

export default Store;

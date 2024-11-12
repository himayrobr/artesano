import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Store.css';
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
import Diseño from '../storage/img/diseño.svg';
import Filter from '../storage/img/Group8(1).svg';
import imagen1 from '../storage/img/Rectangle 14.png';
import imagen2 from '../storage/img/Rectangle 16.png';
import imagen3 from '../storage/img/Rectangle 22.png';
import imagen4 from '../storage/img/Rectangle 23.png';
import imagen5 from '../storage/img/Rectangle 24.png';
import imagen6 from '../storage/img/Rectangle 25.png';
import { useHomeLogic } from '../data/StoreLogic.js';
import orderBy from 'lodash/orderBy';


const talleres = [
  { nombre: "Arte Abedail Aller Escalante", ubicacion: "Cusco", imagen: imagen1, ruta: "/ArteAbedall" },
  { nombre: "Asoc. de artesanos Tinkuy", ubicacion: "Huánuco", imagen: imagen2, ruta: "/AsociacionArtesano" },
];
const talleres2 = [
  { nombre: "Retablos Jesús Urbano", ubicacion: "Ayacucho", imagen: imagen3, ruta: "/Retablo" },
  { nombre: "Taller Awaq Ayllus", ubicacion: "Ayacucho", imagen: imagen4, ruta: "/TallerAwaq" },
];
const talleres3 = [
  { nombre: "Taller Sanabria Núñez", ubicacion: "Junín", imagen: imagen5, ruta: "/TallerSanabria" },
  { nombre: "Lastenia Canayo", ubicacion: "Ucayali", imagen: imagen6, ruta: "/Lastenia" },
];



function Card({ nombre, ubicacion, imagen, ruta }) {
  return (
    <div className="card">
      <Link to={ruta}>
        <div className="card-content">
          <h3>{nombre}</h3>
          <p>{ubicacion}</p>
        </div>
        <img src={imagen} alt={nombre} className="card-img" />
      </Link>
    </div>
  );
}

function Store() {
  const { menuOpen, searchTerm, filteredResults, toggleMenu, handleSearch } = useHomeLogic();
  const menuRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterInput, setFilterInput] = useState('');
  const [orderByValue, setOrderByValue] = useState('nombre');
  const [sortedTalleres, setSortedTalleres] = useState([...talleres, ...talleres2, ...talleres3]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearchChange = (e) => {
    setFilterInput(e.target.value);
  };

  const applyFilter = () => {
    console.log('Filtro aplicado:', filterInput);
    toggleModal(); // Cierra el modal después de aplicar el filtro
  };

  const handleOrderChange = (e) => {
    const orderValue = e.target.value;
    setOrderByValue(orderValue);  // Cambiar el valor de la opción seleccionada

    let sortedArray;

    switch (orderValue) {
      case 'nombre':
        sortedArray = orderBy(sortedTalleres, ['nombre'], ['asc']);
        break;
      case 'ubicacion':
        sortedArray = orderBy(sortedTalleres, ['ubicacion'], ['asc']);
        break;
      default:
        sortedArray = sortedTalleres;
    }

    setSortedTalleres(sortedArray);
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

      <main className='scroll-container'>
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
                  
                  {/* Selección para ordenar */}
                  <label htmlFor="orderBy">Ordenar por:</label>
                  <select 
                    id="orderBy"
                    value={orderByValue}  // Cambié el estado para manejar el filtro de orden
                    onChange={handleOrderChange} // Función para manejar el cambio
                  >
                    <option value="nombre">Nombre</option>
                    <option value="ubicacion">Ubicación</option>
                  </select>
                  
                  <button onClick={applyFilter}>Aplicar filtro</button>
                </div>
              </div>
            )}

            <div className="grid-container">
              {sortedTalleres.map((taller, index) => (
                <Card
                  key={index}
                  nombre={taller.nombre}
                  ubicacion={taller.ubicacion}
                  imagen={taller.imagen}
                  ruta={taller.ruta}
                />
              ))}
            </div>
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

export default Store;
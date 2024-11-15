import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/Categoria.css';
import productoPlaceholder from '../storage/img/Rectangle 14.png';
import { endpoints } from '../apiConfig';

// Icon imports remain unchanged
import Ceramica from '../storage/img/ceramicCategory.svg';
import TextileriaIcon from '../storage/img/workshopCategory.svg';
import Tallaenpiedra from '../storage/img/stoneWorkshopCategory.svg';
import Tallaenmadera from '../storage/img/woodWorkshopCategory.svg';
import Bordado from '../storage/img/embroideryCategory.svg';
import Joyeria from '../storage/img/jewelryCategory.svg';
import Hojalateria from '../storage/img/sheetMetalCategory.svg';
import Orfebreria from '../storage/img/goldsmithCategory.svg';
import Estampado from '../storage/img/stampedCategory.svg';
import Pintura from '../storage/img/paintingTraditionalCategory.svg';
import Filter from '../storage/img/Group8(1).svg';
import seekerImg from '../storage/img/seeker.svg';
import Return from '../storage/img/arrow_back.svg';
import Rombo from '../storage/img/Rectangle86.svg';
import orderBy from 'lodash/orderBy';

function Categoria() {
  const { categoriaId } = useParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [orderByValue, setOrderByValue] = useState('nombre');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estados para el buscador
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(endpoints.getCategoryUrl(categoriaId));
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const products = Array.isArray(data) ? data : [];
        setProductos(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setError('Error al cargar los productos. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    if (categoriaId) {
      fetchProductos();
    }
  }, [categoriaId]);

  // Actualiza los resultados de búsqueda en base al término ingresado
  useEffect(() => {
    const searchProductos = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(endpoints.search(searchTerm));
        if (!response.ok) {
          throw new Error('Error en la búsqueda');
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error al buscar:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchProductos();
  }, [searchTerm]);

  // Efecto para aplicar filtros y ordenamiento
  useEffect(() => {
    let filtered = [...productos];
    filtered = orderBy(filtered, [orderByValue], ['asc']);
    setFilteredProducts(filtered);
  }, [orderByValue, productos]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  
  const handleOrderChange = (e) => {
    setOrderByValue(e.target.value);
  };

  const handleBack = () => navigate('/home');

  return (
    <div className="main2">
      <div className='conten-todo'>
        <header className='header'>
          <button onClick={handleBack} className="back-button">
            <img src={Return} alt="return" className='flecha' />
          </button>
          <img className='rombo' src={Rombo} alt="Rombo" />
          <h1 className='category'>Categorias</h1>
        </header>

        {/* Buscador y Filtro combinados */}
        <div className="search">
          <img src={seekerImg} alt="Buscar" className='Buscar-categoria' />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <img 
            src={Filter} 
            alt="Filtro" 
            className="filter-categorias" 
            onClick={toggleModal}
          />
          
          {/* Modal de filtros */}
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={toggleModal}>&times;</span>
                <h2>Filtrar búsqueda</h2>
                <label htmlFor="orderBy">Ordenar por:</label>
                <select id="orderBy" value={orderByValue} onChange={handleOrderChange}>
                  <option value="nombre">Nombre</option>
                  <option value="ubicacion">Ubicación</option>
                </select>
                <button onClick={toggleModal}>Aplicar filtro</button>
              </div>
            </div>
          )}

          {/* Resultados de búsqueda */}
          {isLoading && (
            <div className="result">
              <p>Buscando...</p>
            </div>
          )}
          {searchResults.length > 0 && searchTerm && (
            <div className="result">
              <ul>
                {searchResults.map((item) => (
                  <li key={item._id}>
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

        <div className="categorias1-categoria">
          <div className='contenedor-categoria1'>
            <Link to="/categoria/Textilería" className={`categoria1 ${selectedCategory === 'Textilería' ? 'selected' : ''}`}>
              <img src={TextileriaIcon} alt="Textilería" />
              <p>Textilería</p>
            </Link>
            <Link to="/categoria/Cerámica" className={`categoria1 ${selectedCategory === 'Cerámica' ? 'selected' : ''}`}>
              <img src={Ceramica} alt="Cerámica" />
              <p>Cerámica</p>
            </Link>
            <Link to="/categoria/Orfebrería" className={`categoria1 ${selectedCategory === 'Orfebrería' ? 'selected' : ''}`}>
              <img src={Orfebreria} alt="Orfebrería" />
              <p>Orfebrería</p>
            </Link>
            <Link to="/categoria/Talla en piedra" className={`categoria1 ${selectedCategory === 'Talla en piedra' ? 'selected' : ''}`}>
              <img src={Tallaenpiedra} alt="Talla en piedra" />
              <p>Talla en piedra</p>
            </Link>
            <Link to="/categoria/Talla en madera" className={`categoria1 ${selectedCategory === 'Talla en madera' ? 'selected' : ''}`}>
              <img src={Tallaenmadera} alt="Talla en madera" />
              <p>Talla en madera</p>
            </Link>
            <Link to="/categoria/Bordado" className={`categoria1 ${selectedCategory === 'Bordado' ? 'selected' : ''}`}>
              <img src={Bordado} alt="Bordado" />
              <p>Bordado</p>
            </Link>
            <Link to="/categoria/Joyería" className={`categoria1 ${selectedCategory === 'Joyería' ? 'selected' : ''}`}>
              <img src={Joyeria} alt="Joyería" />
              <p>Joyería</p>
            </Link>
            <Link to="/categoria/Hojalatería" className={`categoria1 ${selectedCategory === 'Hojalatería' ? 'selected' : ''}`}>
              <img src={Hojalateria} alt="Hojalatería" />
              <p>Hojalatería</p>
            </Link>
            <Link to="/categoria/Estampado" className={`categoria1 ${selectedCategory === 'Estampado' ? 'selected' : ''}`}>
              <img src={Estampado} alt="Estampado" />
              <p>Estampado</p>
            </Link>
            <Link to="/categoria/Pintura" className={`categoria1 ${selectedCategory === 'Pintura' ? 'selected' : ''}`}>
              <img src={Pintura} alt="Pintura" />
              <p>Pintura tradicional</p>
            </Link>
          </div>
        </div>

        <section className="productos-categorias">
          <h2 className='titulo-productos-categorias'>Artesanías</h2>

          {loading ? (
            <div className="loading">
              <p>Cargando productos...</p>
            </div>
          ) : error ? (
            <div className="error">
              <p>{error}</p>
            </div>
          ) : (
            <div className="producto-grid-categorias">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((producto) => (
                  <div key={producto._id} className="producto-card-categorias">
                    <Link to={`/product/${producto._id}`}>
                      <div className="imagen-container-categorias">
                        <img 
                          src={producto.fotos?.[0] || productoPlaceholder} 
                          alt={producto.nombre} 
                          onError={(e) => { e.target.src = productoPlaceholder; }} 
                        />
                      </div>
                      <h3>{producto.nombre}</h3>
                    <p>{producto.ubicacion}</p>
                    <p>S/.{producto.precio}</p>
                    </Link>
                  </div>
                ))
              ) : (
                <p>No hay productos disponibles en esta categoría.</p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Categoria;
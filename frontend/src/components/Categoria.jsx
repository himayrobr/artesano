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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterInput, setFilterInput] = useState('');
  const [orderByValue, setOrderByValue] = useState('nombre');
  const [sortedTalleres, setSortedTalleres] = useState([]);

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
        setProductos(Array.isArray(data) ? data : []);
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

  useEffect(() => {
    let filteredTalleres = [...productos];
    if (filterInput) {
      filteredTalleres = filteredTalleres.filter((taller) =>
        taller.nombre.toLowerCase().includes(filterInput.toLowerCase()) ||
        taller.ubicacion.toLowerCase().includes(filterInput.toLowerCase())
      );
    }
    filteredTalleres = orderBy(filteredTalleres, [orderByValue], ['asc']);
    setSortedTalleres(filteredTalleres);
  }, [filterInput, orderByValue, productos]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleSearchChange = (e) => setFilterInput(e.target.value);
  const handleOrderChange = (e) => setOrderByValue(e.target.value);
  const handleBack = () => navigate('/home');

  return (
    <div className="main2">
      <div className='conten-todo'>
        <header className='header'>
          <button onClick={handleBack} className="back-button">
            <img src={Return} alt="return" className='retur' />
          </button>
          <img className='rombo' src={Rombo} alt="Rombo" />
          <h1 className='category'>Categorias</h1>
        </header>
        <div className="categorias1-categoria">
                <div className='contenedor-categoria1'>
                    <div
                        className={`categoria1 ${selectedCategory === 'Textileria' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Textileria')}
                    >
                        <img src={TextileriaIcon} alt="Textilería" />
                        <p>Textilería</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Ceramica' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Ceramica')}
                    >
                        <img src={Ceramica} alt="Cerámica" />
                        <p>Cerámica</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Orfebreria' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Orfebreria')}
                    >
                        <img src={Orfebreria} alt="Orfebrería" />
                        <p>Orfebrería</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Tallaenpiedra' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Tallaenpiedra')}
                    >
                        <img src={Tallaenpiedra} alt="Talla en piedra" />
                        <p>Talla en piedra</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Tallaenmadera' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Tallaenmadera')}
                    >
                        <img src={Tallaenmadera} alt="Talla en madera" />
                        <p>Talla en madera</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Bordado' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Bordado')}
                    >
                        <img src={Bordado} alt="Bordado" />
                        <p>Bordado</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Joyeria' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Joyeria')}
                    >
                        <img src={Joyeria} alt="Joyería" />
                        <p>Joyería</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Hojalateria' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Hojalateria')}
                    >
                        <img src={Hojalateria} alt="Hojalatería" />
                        <p>Hojalatería</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Estampado' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Estampado')}
                    >
                        <img src={Estampado} alt="Estampado" />
                        <p>Estampado</p>
                    </div>
                    <div 
                        className={`categoria1 ${selectedCategory === 'Pintura' ? 'selected' : ''}`} 
                        onClick={() => handleCategoryClick('Pintura')}
                    >
                        <img src={Pintura} alt="Pintura tradicional" />
                        <p>Pintura tradicional</p>
                    </div>
                </div>
        </div>


        <section className="productos-categorias">
          <h2>Artesanías</h2>
          <div className="search2">
            <img src={seekerImg} alt="Buscar" className='Buscar-categoria' />
            <input
              type="text"
              placeholder="Buscar taller..."
              value={filterInput}
              onChange={handleSearchChange}
            />
          <img src={Filter} alt="Filtro" className="filter-categorias" onClick={toggleModal} />
          </div>


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

          {loading ? (
            <div className="loading">
              <p>Cargando productos...</p>
            </div>
          ) : error ? (
            <div className="error">
              <p>{error}</p>
            </div>
          ) : (
            <div className="producto-grid-categorias ">
            {sortedTalleres.length > 0 ? (
              sortedTalleres.map((producto) => (
                <div key={producto._id} className="producto-card-categorias ">
                  <Link to={producto.ruta || '/'}>
                    <div className="imagen-container-categorias ">
                      <img 
                        src={producto.fotos?.[0] || productoPlaceholder} 
                        alt={producto.nombre} 
                        onError={(e) => { e.target.src = productoPlaceholder; }} 
                      />
                    </div>
                    <h3>{producto.nombre}</h3>
                  </Link>
                  <p>{producto.ubicacion}</p>
                  <p>S/.{producto.precio}</p>
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
};

export default Categoria;

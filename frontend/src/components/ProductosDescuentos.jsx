import React, { useRef, useState, useEffect } from 'react';  
import { Link } from 'react-router-dom';
import { endpoints } from '../apiConfig';
import '../styles/ProductosDescuentos.css';

import chalinaImg from '../storage/img/Rectangle 14.png';
import caminoImg from '../storage/img/Rectangle 14.png';
import malvaImg from '../storage/img/Rectangle 14.png';
import chulloImg from '../storage/img/Rectangle 14.png';
import bufandaImg from '../storage/img/Rectangle 14.png';
import ponchoImg from '../storage/img/Rectangle 14.png';


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

import Triangulo from '../storage/img/triangulo.svg';
function ProductosDescuentos () {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const menuRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Estados para el buscador
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
      };

    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    
        if (value.trim()) {
          setIsLoading(true);
          try {
            const response = await fetch(endpoints.search(value));
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
        } else {
          setSearchResults([]);
        }
      };

    // Ejemplo de datos de productos
    const productos = [
        { 
          id: 1, 
          nombre: 'Chalina Beige con flecos', 
          precioAnterior: 100, 
          precioActual: 65, 
          descuento: '35%', 
          promocion: null, 
          image: chalinaImg, 
          artesano: 'Asoc. de artesanos Tinkuy' 
        },
        { 
          id: 2, 
          nombre: 'Caminos de mesa', 
          precioActual: 200, 
          promocion: '2x1', 
          image: caminoImg, 
          artesano: 'Cooperativa originarios Ollantaytambo' 
        },
        { 
          id: 3, 
          nombre: 'Dueño de la malva', 
          precioAnterior: 200, 
          precioActual: 170, 
          descuento: '15%', 
          promocion: null, 
          image: malvaImg, 
          artesano: 'Lastenia Canayo' 
        },
        { 
          id: 4, 
          nombre: 'Chullo II', 
          precioActual: 250, 
          promocion: '2x1', 
          image: chulloImg, 
          artesano: 'Nación Q’ero' 
        },
        { 
          id: 5, 
          nombre: 'Bufanda tradicional', 
          precioActual: 50, 
          promocion: '3x2', 
          image: bufandaImg, 
          artesano: 'Artesanos locales' 
        },
        { 
          id: 6, 
          nombre: 'Poncho andino', 
          precioActual: 300, 
          envioGratis: true, 
          image: ponchoImg, 
          artesano: 'Taller Tahuantinsuyo' 
        }
      ];

    return (
        <div className='contenedor-productos-decuentos'>
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
              {/* Contenedor de resultados */}
              {isLoading && (
                <div className="result">
                  <p>Buscando...</p>
                </div>
              )}
              {searchResults.length > 0 && (
                <div className="result">
                  <ul>
                    {searchResults.map((item) => (
                      <li key={item._id}>
                        <Link to={`/producto/${item._id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
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

        <div className="categorias1-categoria">
            <div className='contenedor-categoria1'>
                <Link to="/categoria/Textilería" className={`categoria1 ${selectedCategory === 'Textilería' ? 'selected' : ''}`}>
                <div className="categoria-rectangulo">Textilería</div>
                </Link>
                <Link to="/categoria/Cerámica" className={`categoria1 ${selectedCategory === 'Cerámica' ? 'selected' : ''}`}>
                <div className="categoria-rectangulo">Cerámica</div>
                </Link>
                <Link to="/categoria/Orfebrería" className={`categoria1 ${selectedCategory === 'Orfebrería' ? 'selected' : ''}`}>
                <div className="categoria-rectangulo">Orfebrería</div>
                </Link>
                <Link to="/categoria/Talla en piedra" className={`categoria1 ${selectedCategory === 'Talla en piedra' ? 'selected' : ''}`}>
                <div className="categoria-rectangulo">T.piedra</div>
                </Link>
                <Link to="/categoria/Talla en madera" className={`categoria1 ${selectedCategory === 'Talla en madera' ? 'selected' : ''}`}>
                <div className="categoria-rectangulo">T.madera</div>
                </Link>
                <Link to="/categoria/Bordado" className={`categoria1 ${selectedCategory === 'Bordado' ? 'selected' : ''}`}>
                <div className="categoria-rectangulo">Bordado</div>
                </Link>
                <Link to="/categoria/Joyería" className={`categoria1 ${selectedCategory === 'Joyería' ? 'selected' : ''}`}>
                <div className="categoria-rectangulo">Joyería</div>
                </Link>
                <Link to="/categoria/Hojalatería" className={`categoria1 ${selectedCategory === 'Hojalatería' ? 'selected' : ''}`}>
                <div className="categoria-rectangulo">Hojalatería</div>
                </Link>
                <Link to="/categoria/Estampado" className={`categoria1 ${selectedCategory === 'Estampado' ? 'selected' : ''}`}>
                <div className="categoria-rectangulo">Estampado</div>
                </Link>
                <Link to="/categoria/Pintura" className={`categoria1 ${selectedCategory === 'Pintura' ? 'selected' : ''}`}>
                <div className="categoria-rectangulo">Pintura tradicional</div>
                </Link>
            </div>
        </div>


        <section className="productos-categorias-descuento">
            <img src={Triangulo} className="Triangulo" />
          <h2>Descuentos y promociones </h2>
          <p className='parrafo-h2'>En cientos de artesanias</p>

          {loading ? (
            <div className="loading">
              <p>Cargando productos...</p>
            </div>
          ) : error ? (
            <div className="error">
              <p>{error}</p>
            </div>
          ) : (
            <div className="producto-grid-categorias-descuento">
                {productos.map((producto) => (
                    <div key={producto.id} className="producto-card-categorias">
                    <img src={producto.image} alt={producto.nombre} />
                    <h3>{producto.nombre}</h3>
                    {producto.artesano && <p>{producto.artesano}</p>}
                    <p>S/.{producto.precioActual}</p>

                    {/* Descuento */}
                    {producto.descuento && (
                        <div className="descuento">
                        -{producto.descuento}
                        </div>
                    )}

                    {/* Promoción */}
                    {producto.promocion && (
                        <div className="promocion">
                        {producto.promocion}
                        </div>
                    )}
                    </div>
                ))}
            </div>

          )}
        </section>
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

export default ProductosDescuentos;

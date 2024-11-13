import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { endpoints } from '../apiConfig';


import menuImg from '../storage/img/menu.svg';
import seekerImg from '../storage/img/seeker.svg';
import favoritesImg from '../storage/img/favorites.svg';
import shoppingImg from '../storage/img/shopping.svg';

import profileImg from '../storage/img/perfile.png';
import workshopImg from '../storage/img/workshop.svg';
import redeemCouponsImg from '../storage/img/redeemCoupons.svg';
import settingsImg from '../storage/img/settings.svg';
import commentsImg from '../storage/img/comments.svg';
import customerServiceImg from '../storage/img/customerService.svg';
import workshopsAndCraftsImg from '../storage/img/workshopsAndCrafts.svg';
import couponsImg from '../storage/img/coupons.svg';
import categoriesImg from '../storage/img/categories.svg';
import shoppingCartImg from '../storage/img/shoppingCart.svg';
import generalSettingsImg from '../storage/img/generalSettings.svg';


import '../styles/Cart.css';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Nuevo estado para el término de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Nuevo estado para los resultados de búsqueda
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para indicar si está cargando
  const [menuOpen, setMenuOpen] = useState(false); // Nuevo estado para el menú
  const menuRef = useRef(null); // Referencia para el menú

  const navigate = useNavigate();

  // Cargar los productos del carrito al cargar el componente
  useEffect(() => {
    fetchCart();
  }, []);

  // Función para obtener los productos del carrito
  const fetchCart = async () => {
    try {
      const response = await fetch(endpoints.cart);  // Utilizamos la ruta definida en 'endpoints'
      if (!response.ok) {
        throw new Error(`Error al obtener el carrito: ${response.status}`);
      }

      const data = await response.json();
      setCartItems(data.items);  // Aquí espero que la respuesta contenga un campo 'items'
      setTotal(data.total);  // Y un campo 'total'
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      setError(error.message);  // Mostrar el error en la interfaz
    }
  };

  // Función para agregar un producto al carrito
  const addToCart = async (productId, cantidad) => {
    try {
      const response = await fetch(endpoints.cartAdd, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, cantidad }),  // Enviamos los datos del producto y cantidad
      });
      if (!response.ok) {
        throw new Error(`Error al agregar al carrito: ${response.status}`);
      }

      const data = await response.json();
      setCartItems(data.items);  // Actualizar los items del carrito
      setTotal(data.total);  // Actualizar el total
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      setError(error.message);  // Mostrar el error en la interfaz
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(endpoints.cartRemove(productId), {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar del carrito: ${response.status}`);
      }

      const data = await response.json();
      setCartItems(data.items);  // Actualizar los items del carrito
      setTotal(data.total);  // Actualizar el total
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      setError(error.message);  // Mostrar el error en la interfaz
    }
  };

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // Agrega la lógica para buscar productos o tiendas aquí
  };

  // Función para alternar el menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <header>
        <div className="mobile-header">
          <div className="mobile-nav-toggle">
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
                          {/* Mostrar la primera imagen del array de fotos */}
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

        {/* Sidebar menu */}
        <div className={`navigation ${menuOpen ? 'open' : ''}`} ref={menuRef}>
          <div className="mobile-top-bar">
            {/* Close menu button */}
            <span className="mobile-nav-toggle close" onClick={toggleMenu}>
              <img src={profileImg} alt="Perfil" />
              <h3>SaraMartin9</h3>
            </span>
          </div>
          
          {/* Navigation menu */}
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

      <div className='contenido'>
      <h2>Tu Carrito</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Mostrar el mensaje de error */}
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p> 
      ) : (
        <div>
          
          {cartItems.map(item => (
            <div key={item.productId._id}>
              <p>{item.productId.nombre}</p>
              <p>Cantidad: {item.cantidad}</p>
              <p>Precio: ${item.productId.precio}</p>
              <button onClick={() => removeFromCart(item.productId._id)}>Eliminar</button>
            </div>
          ))}
          <h3>Total: ${total}</h3>
        </div>
      )}

      {/* Botón para agregar un producto al carrito */}
      <div>
        <button onClick={() => addToCart('productId_here', 1)}>Agregar Producto</button> {/* Agregar un producto con id ficticio */}
      </div>
      </div> 
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
};

export default Cart;

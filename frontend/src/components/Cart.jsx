import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';
import {
    menuImg,
    seekerImg,
    profileImg,
    workshopsAndCraftsImg,
    couponsImg,
    categoriesImg,
    shoppingCartImg,
    generalSettingsImg
} from '../storage/img';

const Cart = () => { 
  const [cartState, setCartState] = useState({
    items: [],
    total: 0
  });

  const [uiState, setUiState] = useState({
    searchTerm: '',
    searchResults: [],
    isLoading: false,
    menuOpen: false
  });

  // Cargar el carrito al inicio
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      console.log('Cart - Carrito recuperado del localStorage:', savedCart);
      
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        console.log('Cart - Carrito parseado:', parsedCart);
        
        if (parsedCart && parsedCart.items) {
          setCartState(parsedCart);
          console.log('Cart - Estado actualizado:', parsedCart);
        }
      }
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    }
  }, []);

  const addToCart = (product) => {
    setCartState(prevState => {
      const updatedState = {
        items: [...prevState.items, product],
        total: prevState.total + parseFloat(product.precio)
      };
      localStorage.setItem('cart', JSON.stringify(updatedState));
      return updatedState;
    });
  };

  const removeFromCart = (productId) => {
    setCartState(prevState => {
      const updatedItems = prevState.items.filter(item => item._id !== productId);
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + (item.precio * item.cantidad), 
        0
      );
      return {
        items: updatedItems,
        total: newTotal
      };
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartState(prevState => {
      const updatedItems = prevState.items.map(item =>
        item._id === productId
          ? { ...item, cantidad: newQuantity }
          : item
      );
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + (item.precio * item.cantidad), 
        0
      );
      return {
        items: updatedItems,
        total: newTotal
      };
    });
  };

  const handleSearch = (event) => {
    setUiState(prev => ({
      ...prev,
      searchTerm: event.target.value
    }));
  };

  const toggleMenu = () => {
    setUiState(prev => ({
      ...prev,
      menuOpen: !prev.menuOpen
    }));
  };

  const handleCheckout = () => {
    // Aquí puedes agregar la lógica para proceder al pago
    console.log('Productos a comprar:', cartState.items);
    console.log('Total:', cartState.total);
  };


  const renderSearchResults = () => (
    <>
      {uiState.isLoading && (
        <div className="result">
          <p>Buscando...</p>
        </div>
      )}
      {uiState.searchResults.length > 0 && (
        <div className="result">
          <ul>
            {uiState.searchResults.map((item) => (
              <li key={item._id}>
                <Link to={`/producto/${item._id}`} className="search-result-link">
                  {item.fotos?.[0] && (
                    <img src={item.fotos[0]} alt={item.nombre} className="product-thumbnail" />
                  )}
                  <span>{item.nombre} - ${item.precio}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );

  const renderSideMenu = () => (
    <div className={`navigation ${uiState.menuOpen ? 'open' : ''}`}>
      <div className="mobile-top-bar">
        <span className="mobile-nav-toggle close" onClick={toggleMenu}>
          <img src={profileImg} alt="Perfil" />
          <h3>Usuario</h3>
        </span>
      </div>
      <div className="menu-items">
        {/* Aquí puedes agregar los items del menú */}
      </div>
    </div>
  );

  const renderHeader = () => (
    <header>
      <div className="mobile-header">
        <div className="mobile-nav-toggle">
          <img src={menuImg} id='checkbox' alt="Menú" onClick={toggleMenu}/>
          <div className="search">
            <img src={seekerImg} alt="Buscar" />
            <input
              type="text"
              placeholder="Buscar producto o tienda..."
              value={uiState.searchTerm}
              onChange={handleSearch}
            />
            {renderSearchResults()}
          </div>
        </div>
      </div>
      {renderSideMenu()}
    </header>
  );

  const renderCartContent = () => (
    <div className='contenido'>
      <h2>Tu Carrito</h2>
      {cartState.items.length === 0 ? (
        <div className="empty-cart">
          <p>Tu carrito está vacío</p>
          <Link to="/store" className="continue-shopping">
            Continuar comprando
          </Link>
        </div>
      ) : (
        <div className="cart-items">
          {cartState.items.map(item => ( 
            <div key={item._id} className="cart-item">
              {item.imagen && <img src={item.imagen} alt={item.nombre} />}
              <div className="item-details">
                <h3>{item.nombre}</h3>
                <p className="price">Precio: ${item.precio}</p>
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item._id, item.cantidad - 1)}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.cantidad}</span>
                  <button 
                    onClick={() => updateQuantity(item._id, item.cantidad + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <p className="subtotal">Subtotal: ${item.precio * item.cantidad}</p>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="remove-btn"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total: ${cartState.total.toFixed(2)}</h3>
            <button 
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Proceder al pago
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderFooter = () => (
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
      <Link to="/Cart">
        <img src={shoppingCartImg} alt="Carrito de compras" />
      </Link>
      <Link to="/Perfil">
        <img src={generalSettingsImg} alt="Configuración general" />
      </Link>
    </footer>
  );

  return (
    <div className="cart-container">
      {renderHeader()}
      {renderCartContent()}
      {renderFooter()}
    </div>
  );
};

export default Cart;
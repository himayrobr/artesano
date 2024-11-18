import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cart.css';
import SearchBar from './SearchBar';
import Footer from './Footer';
import {
    menuImg,
    profileImg,
} from '../storage/img';

const Cart = () => { 
  const [cartState, setCartState] = useState({
    items: [],
    total: 0
  });

  const [menuOpen, setMenuOpen] = useState(false);

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

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navigation = document.querySelector('.navigation');
      if (navigation && !navigation.contains(event.target) && 
          !event.target.closest('#checkbox')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
      const updatedState = {
        items: updatedItems,
        total: newTotal
      };
      localStorage.setItem('cart', JSON.stringify(updatedState));
      return updatedState;
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
      const updatedState = {
        items: updatedItems,
        total: newTotal
      };
      localStorage.setItem('cart', JSON.stringify(updatedState));
      return updatedState;
    });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCheckout = () => {
    console.log('Productos a comprar:', cartState.items);
    console.log('Total:', cartState.total);
  };

  const renderSideMenu = () => (
    <div className={`navigation ${menuOpen ? 'open' : ''}`}>
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
          <SearchBar />
        </div>
      </div>
      {renderSideMenu()}
    </header>
  );

  const renderCartContent = () => (
    <div className="fondo">
      <div className='contenido'>
        <h2>Tu Carrito</h2>
        <p>Revisa aquí los productos que añadiste a tu carrito</p>
        {cartState.items.length === 0 ? (
          <div className="empty-cart">
            <p>Tu carrito está vacío</p>
            <Link to="/Home" className="continue-shopping">
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

            <div className="abajoo">
              <div className="botonna">
                <button>Añadir cupón de descuento</button>
              </div>
              <div className="sub">
                <div className="subtotall">
                  <div className="deresub">
                    <p>Sub total</p>
                  </div>
                  <div className="izqsub">
                    ${cartState.total.toFixed(2)}
                  </div>
                </div>
                <div className="subtotall">
                  <div className="deresub">
                    <p>Gastos de envío</p>
                  </div>
                  <div className="izqsub">
                    <p>$/20</p>
                  </div>
                </div>
              </div>

              <div className="sub2">
                <div className="izqtot">
                  Total
                </div>
                <div className="dertot">
                  ${(cartState.total + 20).toFixed(2)}
                </div>
              </div>
            </div>
            
            <div className="cart-summary">
              <button 
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Realizar compra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="cart-container">
      {renderHeader()}
      {renderCartContent()}
      <Footer />
    </div>
  );
};

export default Cart;
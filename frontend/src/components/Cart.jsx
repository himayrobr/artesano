import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get('/cart');
      setCartItems(data.items);
    } catch (error) {
      console.error('Error al obtener el carrito', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`/cart/remove/${productId}`);
      setCartItems(cartItems.filter(item => item.productId !== productId));
    } catch (error) {
      console.error('Error al eliminar del carrito', error);
    }
  };

  return (
    <div>
      <h2>Tu Carrito</h2>
      {cartItems.map(item => (
        <div key={item.productId}>
          <p>{item.nombre}</p>
          <p>Cantidad: {item.cantidad}</p>
          <button onClick={() => removeFromCart(item.productId)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;

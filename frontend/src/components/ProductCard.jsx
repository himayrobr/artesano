import React from 'react';

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    // Obtener el carrito actual del localStorage
    const currentCart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };
    
    // Crear el item para el carrito
    const cartItem = {
      id: product._id,
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen,
      cantidad: 1
    };

    // Verificar si el producto ya está en el carrito
    const existingItemIndex = currentCart.items.findIndex(item => item.id === product._id);

    if (existingItemIndex >= 0) {
      // Si el producto ya existe, incrementar la cantidad
      currentCart.items[existingItemIndex].cantidad += 1;
    } else {
      // Si no existe, agregarlo al carrito
      currentCart.items.push(cartItem);
    }

    // Recalcular el total
    currentCart.total = currentCart.items.reduce(
      (sum, item) => sum + (item.precio * item.cantidad),
      0
    );

    // Guardar el carrito actualizado
    localStorage.setItem('cart', JSON.stringify(currentCart));

    // Opcional: Mostrar alguna notificación de éxito
    alert('Producto agregado al carrito');
  };

  return (
    <div className="product-card">
      <img src={product.imagen} alt={product.nombre} />
      <h3>{product.nombre}</h3>
      <p>Precio: ${product.precio}</p>
      <button onClick={handleAddToCart}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
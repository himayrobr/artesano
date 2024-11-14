import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { endpoints } from '../apiConfig';
import '../styles/ProductDetail.css';
import Return from '../storage/img/arrow_back.svg';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(endpoints.getProductUrl(productId));
        
        if (!response.ok) {
          throw new Error('No se pudo obtener el producto');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error al cargar el producto:', err);
        setError('Error al cargar el producto. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleBack = () => {
    navigate(-1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    if (!product) return;

    try {
      // Obtener el carrito actual
      const savedCart = localStorage.getItem('cart');
      let currentCart = savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
      
      // Buscar si el producto ya existe en el carrito
      const existingItemIndex = currentCart.items.findIndex(item => item._id === product._id);
      
      if (existingItemIndex !== -1) {
        // Si el producto ya existe, incrementar su cantidad
        currentCart.items[existingItemIndex].cantidad += 1;
      } else {
        // Si no existe, añadir nuevo producto
        const newProduct = {
          _id: String(product._id),
          nombre: String(product.nombre),
          precio: parseFloat(product.precio),
          imagen: product.fotos?.[0] || '',
          cantidad: 1
        };
        currentCart.items.push(newProduct);
      }

      // Recalcular el total del carrito
      currentCart.total = currentCart.items.reduce(
        (sum, item) => sum + (parseFloat(item.precio) * item.cantidad),
        0
      );

      // Guardar el carrito actualizado
      localStorage.setItem('cart', JSON.stringify(currentCart));
      
      console.log('Carrito actualizado:', currentCart);
      alert('Producto añadido al carrito');
      navigate('/cart');
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      alert('Hubo un error al añadir el producto al carrito');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <p>{error || 'Producto no encontrado'}</p>
        <Link to="/home" className="return-link">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <header className="product-header">
        <button onClick={handleBack} className="back-button">
          <img src={Return} alt="Volver" />
        </button>
      </header>

      <div className="product-image-container">
        <img
          src={product.fotos?.[0] || '/placeholder.png'}
          alt={product.nombre}
          className="product-image"
        />
        <button 
          onClick={toggleFavorite}
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
        >
          ♥
        </button>
      </div>

      <div className="product-info">
        <div className="product-header-info">
          <div className="product-title-price">
            <h1>{product.nombre}</h1>
            <p className="product-price">S/{product.precio}</p>
          </div>
          <p className="product-workshop">{product.taller}</p>
        </div>

        <div className="product-details">
          <div className="product-dimensions">
            <h2>Dimensiones:</h2>
            <p>{product.dimensiones}</p>
          </div>

          <div className="product-description">
            <h2>Descripción:</h2>
            <p>{product.descripcion}</p>
          </div>

          <div className="shipping-info">
            <span className="shipping-icon">📦</span>
            <p>Cuenta con envío hacia tu ubicación</p>
          </div>
        </div>

        <button 
          className="add-to-cart-button"
          onClick={handleAddToCart}
          disabled={!product}
        >
          Añadir a mi carrito de compras
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
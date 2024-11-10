// Categoria.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Categoria.css';
import { endpoints } from '../apiConfig';

const Categoria = () => {
  const { categoriaId } = useParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className="categoria-page">
      <div className="categoria-header">
        <button onClick={handleBack} className="back-button">
          ⬅ Volver
        </button>
        <h1>Categoría: {categoriaId}</h1>
      </div>

      {loading && (
        <div className="loading">
          <p>Cargando productos...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="product-list">
          {productos.length > 0 ? (
            productos.map((producto) => (
              <div key={producto._id} className="product-card">
                <img 
                  src={producto.fotos?.[0]} 
                  alt={producto.nombre}
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-image.jpg'; // Agrega una imagen por defecto
                  }}
                />
                <p className="product-title">{producto.nombre}</p>
                <p className="product-price">S/.{producto.precio}</p>
                
              </div>
            ))
          ) : (
            <p>No hay productos disponibles en esta categoría.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Categoria;


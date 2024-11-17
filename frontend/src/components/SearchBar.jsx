import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { endpoints } from '../apiConfig';
import seekerImg from '../storage/img/seeker.svg';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({
    products: [],
    stores: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  // Function to normalize text for case-insensitive comparison
  const normalizeText = (text) => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Function to filter results based on search term
  const filterResults = (items, searchValue, type) => {
    const normalizedSearch = normalizeText(searchValue);
    
    return items.filter(item => {
      const normalizedName = normalizeText(item.nombre);
      const normalizedDescription = item.descripcion ? normalizeText(item.descripcion) : '';
      
      return normalizedName.includes(normalizedSearch) || 
             normalizedDescription.includes(normalizedSearch);
    });
  };

  // Function to perform combined search
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setNoResults(false);

    if (value.trim()) {
      setIsLoading(true);
      try {
        // Fetch both products and stores simultaneously
        const [productsResponse, storesResponse] = await Promise.all([
          fetch(endpoints.search(value)),
          fetch(endpoints.searchByStore(value))
        ]);

        if (!productsResponse.ok || !storesResponse.ok) {
          throw new Error('Error en la búsqueda');
        }

        const [productsData, storesData] = await Promise.all([
          productsResponse.json(),
          storesResponse.json()
        ]);

        // Filter results based on search term
        const filteredProducts = filterResults(productsData, value, 'product');
        const filteredStores = filterResults(storesData, value, 'store');

        setSearchResults({
          products: filteredProducts,
          stores: filteredStores
        });

        // Set no results state if both arrays are empty
        setNoResults(filteredProducts.length === 0 && filteredStores.length === 0);

      } catch (error) {
        console.error('Error al buscar:', error);
        setSearchResults({
          products: [],
          stores: []
        });
        setNoResults(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults({
        products: [],
        stores: []
      });
      setNoResults(false);
    }
  };

  return (
    <div className="search">
      <img src={seekerImg} alt="Buscar" />
      <input
        type="text"
        placeholder="Buscar producto o tienda..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {/* Search Results Container */}
      {isLoading && (
        <div className="result">
          <p>Buscando...</p>
        </div>
      )}
      {!isLoading && noResults && searchTerm && (
        <div className="result">
          <p>No se encontraron productos ni talleres que coincidan con "{searchTerm}"</p>
        </div>
      )}
      {(searchResults.products.length > 0 || searchResults.stores.length > 0) && (
        <div className="result">
          {/* Store Results */}
          {searchResults.stores.length > 0 && (
            <div className="stores-results">
              <h4>Tiendas</h4>
              <ul>
                {searchResults.stores.map((store) => (
                  <li key={`store-${store._id}`}>
                    <Link to={`/taller/${store._id}`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                      {store.foto && (
                        <img src={store.foto} alt={store.nombre} className="store-thumbnail" />
                      )}
                      <span style={{ marginLeft: '50px' }}>{store.nombre}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Product Results */}
          {searchResults.products.length > 0 && (
            <div className="products-results">
              <h4>Productos</h4>
              <ul>
                {searchResults.products.map((item) => (
                  <li key={`product-${item._id}`}>
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
      )}
    </div>
  );
};

export default SearchBar;
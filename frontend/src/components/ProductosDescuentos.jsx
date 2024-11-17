import React, { useRef, useState, useEffect } from 'react';  
import { Link } from 'react-router-dom';
import { endpoints } from '../apiConfig';
import '../styles/ProductosDescuentos.css';
import Footer from './Footer';
import SearchBar from './SearchBar';

import menuImg from '../storage/img/menu.svg';
import favoritesImg from '../storage/img/favorites.svg';
import shoppingImg from '../storage/img/shopping.svg';
import workshopImg from '../storage/img/workshop.svg';
import redeemCouponsImg from '../storage/img/redeemCoupons.svg';
import settingsImg from '../storage/img/settings.svg';
import commentsImg from '../storage/img/comments.svg';
import customerServiceImg from '../storage/img/customerService.svg';
import profileImg from '../storage/img/perfile.png';
import Triangulo from '../storage/img/triangulo.svg';

function ProductosDescuentos() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const menuRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState('Textilería');
    const [products, setProducts] = useState([]);

    // Categories array
    const categories = [
        'Textilería', 'Cerámica', 'Orfebrería', 'Talla en piedra', 'Talla en madera',
        'Bordado', 'Joyería', 'Hojalatería', 'Estampado', 'Pintura'
    ];

    // Fetch products by category
    const fetchProductsByCategory = async (category) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(endpoints.getCategoryUrl(category));
            if (!response.ok) {
                throw new Error('Error al cargar los productos');
            }
            const data = await response.json();
            
            // Add random discounts to some products (for demonstration)
            const productsWithDiscounts = data.map(product => {
                // Randomly decide if product should have a discount (30% chance)
                if (Math.random() < 0.3) {
                    const discountPercent = Math.floor(Math.random() * 30) + 10; // 10-40% discount
                    const originalPrice = product.precio;
                    const discountedPrice = originalPrice * (1 - discountPercent / 100);
                    
                    return {
                        ...product,
                        precioAnterior: originalPrice,
                        precioActual: discountedPrice,
                        descuento: `${discountPercent}%`
                    };
                }
                // Randomly add promotions to some products without discounts (20% chance)
                else if (Math.random() < 0.2) {
                    const promotions = ['2x1', '3x2', 'Envío gratis'];
                    const randomPromotion = promotions[Math.floor(Math.random() * promotions.length)];
                    return {
                        ...product,
                        precioActual: product.precio,
                        promocion: randomPromotion
                    };
                }
                
                return {
                    ...product,
                    precioActual: product.precio
                };
            });

            setProducts(productsWithDiscounts);
        } catch (err) {
            setError('Error al cargar los productos: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle category selection
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        fetchProductsByCategory(category);
    };

    // Initial fetch
    useEffect(() => {
        fetchProductsByCategory(selectedCategory);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className='contenedor-productos-decuentos'>
            <header>
                <div className="mobile-header">
                    <div className="mobile-nav-toggle">
                        <img src={menuImg} id='checkbox' alt="Menú" onClick={toggleMenu} />
                        <SearchBar />
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
                    {categories.map((category) => (
                        <div
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className={`categoria1 ${selectedCategory === category ? 'selected' : ''}`}
                        >
                            <div className="categoria-rectangulo">{category}</div>
                        </div>
                    ))}
                </div>
            </div>

            <section className="productos-categorias">
                <img src={Triangulo} className="Triangulo" alt="Triangulo" />
                <h2 className='titulo-productos-categorias'>Descuentos y promociones</h2>
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
                    <div className="products-grid"> 
                        {products.map((producto) => ( 
                            <div key={producto._id} className="products-card"> 
                                <Link to={`/product/${producto._id}`}> 
                                    <div className="image-container"> 
                                        <img 
                                            src={producto.fotos?.[0] || productoPlaceholder} 
                                            alt={producto.nombre} 
                                            onError={(e) => {
                                                e.target.src = productoPlaceholder;
                                            }} 
                                        />
                                        {producto.descuento && (
                                            <div className="discount-tag">
                                                -{producto.descuento}
                                            </div>
                                        )}
                                        {producto.promocion && (
                                            <div className="promo-tag">
                                                {producto.promocion}
                                            </div>
                                        )}
                                    </div>
                                    <div className="product-info">
                                        <h3>{producto.nombre}</h3>
                                        {producto.artesano && 
                                            <p className="artist">{producto.artesano}</p>
                                        }
                                        <div className="price-box">
                                            <p className="price-now">S/.{producto.precioActual.toFixed(2)}</p>
                                            {producto.precioAnterior && (
                                                <p className="price-before">S/.{producto.precioAnterior.toFixed(2)}</p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}

export default ProductosDescuentos;
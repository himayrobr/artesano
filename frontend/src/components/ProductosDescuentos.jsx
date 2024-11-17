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
                                <Link to="/FavoritosArtesanias">
                                    <img src={favoritesImg} alt="Lista de favoritos" />
                                    <strong>Lista de favoritos</strong>
                                </Link>
                            </li>
                            <li>
                                <Link to="/ComprasRealizadas">
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

            <section className="productos-categorias-descuento">
    <img src={Triangulo} className="Triangulo" />
    <h2>Descuentos y promociones </h2>
    <p className='parrafo-h2'>En cientos de artesanias</p>

    {/* Categorías debajo del título */}
    <div className="categorias1-categoria">
        <Link to="/ProductosDescuentos" className={`categoria1 ${selectedCategory === 'Textilería' ? 'selected' : ''}`}>
            <div className="categoria-rectangulo">Textilería</div>
        </Link>
        <Link to="/ProductosDescuentos" className={`categoria1 ${selectedCategory === 'Cerámica' ? 'selected' : ''}`}>
            <div className="categoria-rectangulo">Cerámica</div>
        </Link>
        <Link to="/ProductosDescuentos" className={`categoria1 ${selectedCategory === 'Orfebrería' ? 'selected' : ''}`}>
            <div className="categoria-rectangulo">Orfebrería</div>
        </Link>
        <Link to="/ProductosDescuentos" className={`categoria1 ${selectedCategory === 'Talla en piedra' ? 'selected' : ''}`}>
            <div className="categoria-rectangulo">T.piedra</div>
        </Link>
        <Link to="/ProductosDescuentos" className={`categoria1 ${selectedCategory === 'Talla en madera' ? 'selected' : ''}`}>
            <div className="categoria-rectangulo">T.madera</div>
        </Link>
        <Link to="/ProductosDescuentos" className={`categoria1 ${selectedCategory === 'Bordado' ? 'selected' : ''}`}>
            <div className="categoria-rectangulo">Bordado</div>
        </Link>
        <Link to="/ProductosDescuentos" className={`categoria1 ${selectedCategory === 'Joyería' ? 'selected' : ''}`}>
            <div className="categoria-rectangulo">Joyería</div>
        </Link>
        <Link to="/ProductosDescuentos" className={`categoria1 ${selectedCategory === 'Hojalatería' ? 'selected' : ''}`}>
            <div className="categoria-rectangulo">Hojalatería</div>
        </Link>
        <Link to="/ProductosDescuentos" className={`categoria1 ${selectedCategory === 'Estampado' ? 'selected' : ''}`}>
            <div className="categoria-rectangulo">Estampado</div>
        </Link>
        <Link to="/ProductosDescuentos" className={`categoria1 ${selectedCategory === 'Pintura' ? 'selected' : ''}`}>
            <div className="categoria-rectangulo">Pintura tradicional</div>
        </Link>
    </div>
        <div className="linea-negra"></div>

    {/* Productos o mensajes de estado */}
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
                <div key={producto.id} className="productos-card-categorias">
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
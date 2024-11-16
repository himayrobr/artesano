import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/FavoritosArtesanias.css';

import productoPlaceholder from '../storage/img/Rectangle 14.png';
import Joyeria from '../storage/img/jewelryCategory.svg';
import Return from '../storage/img/arrow_back.svg';
import orderBy from 'lodash/orderBy';
import Ceramica from '../storage/img/ceramicCategory.svg';
import TextileriaIcon from '../storage/img/workshopCategory.svg';
import Tallaenpiedra from '../storage/img/stoneWorkshopCategory.svg';
import Tallaenmadera from '../storage/img/woodWorkshopCategory.svg';
import Bordado from '../storage/img/embroideryCategory.svg';
import Hojalateria from '../storage/img/sheetMetalCategory.svg';
import Orfebreria from '../storage/img/goldsmithCategory.svg';
import Estampado from '../storage/img/stampedCategory.svg';
import Pintura from '../storage/img/paintingTraditionalCategory.svg';
import Rombo from '../storage/img/Rectangle86.svg';
import Salir from '../storage/img/Salir.svg';


const FavoritosArtesanias = () => {
  const navigate = useNavigate();
  const [orderByValue, setOrderByValue] = useState('nombre');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Datos estáticos de ejemplo
  const productos = [
    {
      _id: '1',
      nombre: 'Vasija de Cerámica',
      ubicacion: 'Cusco, Perú',
      precio: 120,
      fotos: [productoPlaceholder],
      categoria: 'Cerámica',
    },
    {
      _id: '2',
      nombre: 'Chompa de Alpaca',
      ubicacion: 'Arequipa, Perú',
      precio: 250,
      fotos: [productoPlaceholder],
      categoria: 'Textilería',
    },
    {
      _id: '3',
      nombre: 'Collar de Plata',
      ubicacion: 'Lima, Perú',
      precio: 90,
      fotos: [productoPlaceholder],
      categoria: 'Joyería',
    },
  ];

  const filteredProducts = orderBy(productos, [orderByValue], ['asc']);

  const handleBack = () => navigate('/home');

  const handleOrderChange = (e) => {
    setOrderByValue(e.target.value);
  };

  return (
    <div className="favoritos-artesanias">
      <div className="contenedor-artesaniasFA">
        <header className="header-artesaniasFA">
          <button onClick={handleBack} className="back-return">
            <img src={Return} alt="Retorno" className="img-return" />
          </button>
          <img src={Rombo} alt="Rombo" className="RomboFA" />
          <h1 className="tituloFA">
            Tus artesanías <br /> Favoritas
          </h1>
        </header>

        <div className="contenedor-categorias-FA">
          <div className="contenedor-categoria-especificaFA">
          <Link to="/FavoritosArtesanias" className={`categoria1 ${selectedCategory === 'Textilería' ? 'selected' : ''}`}>
              <img src={TextileriaIcon} alt="Textilería" />
              <p>Textilería</p>
            </Link>
            <Link to="/FavoritosArtesanias" className={`categoria1 ${selectedCategory === 'Cerámica' ? 'selected' : ''}`}>
              <img src={Ceramica} alt="Cerámica" />
              <p>Cerámica</p>
            </Link>
            <Link to="/FavoritosArtesanias" className={`categoria1 ${selectedCategory === 'Orfebrería' ? 'selected' : ''}`}>
              <img src={Orfebreria} alt="Orfebrería" />
              <p>Orfebrería</p>
            </Link>
            <Link to="/FavoritosArtesanias" className={`categoria1 ${selectedCategory === 'Talla en piedra' ? 'selected' : ''}`}>
              <img src={Tallaenpiedra} alt="Talla en piedra" />
              <p>Talla en piedra</p>
            </Link>
            <Link to="/FavoritosArtesanias" className={`categoria1 ${selectedCategory === 'Talla en madera' ? 'selected' : ''}`}>
              <img src={Tallaenmadera} alt="Talla en madera" />
              <p>Talla en madera</p>
            </Link>
            <Link to="/FavoritosArtesanias" className={`categoria1 ${selectedCategory === 'Bordado' ? 'selected' : ''}`}>
              <img src={Bordado} alt="Bordado" />
              <p>Bordado</p>
            </Link>
            <Link to="/FavoritosArtesanias" className={`categoria1 ${selectedCategory === 'Joyería' ? 'selected' : ''}`}>
              <img src={Joyeria} alt="Joyería" />
              <p>Joyería</p>
            </Link>
            <Link to="/FavoritosArtesanias" className={`categoria1 ${selectedCategory === 'Hojalatería' ? 'selected' : ''}`}>
              <img src={Hojalateria} alt="Hojalatería" />
              <p>Hojalatería</p>
            </Link>
            <Link to="/FavoritosArtesanias" className={`categoria1 ${selectedCategory === 'Estampado' ? 'selected' : ''}`}>
              <img src={Estampado} alt="Estampado" />
              <p>Estampado</p>
            </Link>
            <Link to="/FavoritosArtesanias" className={`categoria1 ${selectedCategory === 'Pintura' ? 'selected' : ''}`}>
              <img src={Pintura} alt="Pintura" />
              <p>Pintura tradicional</p>
            </Link>
          </div>
          <div className="linea-negra"></div>
        </div>

        <section className="prodcutos-categoriasFA">
          <div className="producto-grid-categoriasFA">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((producto) => (
                <div key={producto._id} className="producto-card-categoriasFA">
                    <div className="imagen-container-categoriasFA">
                        <div className='contenedor-x'>
                        <img src={Salir} className="Salir" alt="Salir" />
                        </div>
                        <img
                        src={producto.fotos[0]}
                        alt={producto.nombre}
                        onError={(e) => {
                            e.target.src = productoPlaceholder;
                        }}
                        className="image-favorites"
                        />
                    </div>

                    <div className="producto-content-categoriasFA">
                        <h3>{producto.nombre}</h3>
                        <p>{producto.ubicacion}</p>
                        <p>S/.{producto.precio}</p>
                    </div>
                    </div>
              ))
            ) : (
              <p>No hay productos disponibles en esta categoría.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FavoritosArtesanias;

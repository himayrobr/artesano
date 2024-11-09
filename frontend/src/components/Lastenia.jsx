import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TallerAwaq.css';

// Importa tus imágenes aquí
import portadaImage from '../storage/img/Rectangle 25.png';
import producto1 from '../storage/img/Rectangle 41.png';
import producto2 from '../storage/img/Rectangle 90.png';
import producto3 from '../storage/img/Rectangle 93.png';
import producto4 from '../storage/img/Rectangle 94.png';
import Filter from '../storage/img/Group8(1).svg';
import seekerImg from '../storage/img/seeker.svg';
import { useHomeLogic } from '../data/TallerLogic.js';
import orderBy from 'lodash/orderBy';

import Return from '../storage/img/arrow_back.svg';

const talleres = [
  { nombre: "Tapiz Chumpi Andino IIIS/.600", ubicacion: "Taller Awaq Ayllus", imagen: producto1, ruta: "/" },
  { nombre: "ACartuchera Flores IS/.30", ubicacion: "Taller Awaq Ayllus", imagen: producto2, ruta: "/tinkuy" },
];
const talleres2 = [
  { nombre: "Funda para almohada c...S/.180", ubicacion: "Taller Awaq Ayllus", imagen: producto3, ruta: "/jesus-urbano" },
  { nombre: "Tapiz Tocapu Inka IS/.8500", ubicacion: "Taller Awaq Ayllus", imagen: producto4, ruta: "/TallerAwaq" },
];


function TallerAwaq() {
    useHomeLogic();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterInput, setFilterInput] = useState('');
    const [orderByValue, setOrderByValue] = useState('nombre');
    const [sortedTalleres, setSortedTalleres] = useState([...talleres, ...talleres2]);

    useEffect(() => {
      // Filter the talleres based on the filter input and sort order
      let filteredTalleres = [...talleres, ...talleres2];

      // Filter by search term
      if (filterInput) {
        filteredTalleres = filteredTalleres.filter((taller) =>
          taller.nombre.toLowerCase().includes(filterInput.toLowerCase()) ||
          taller.ubicacion.toLowerCase().includes(filterInput.toLowerCase())
        );
      }

      // Sort the talleres by selected order
      filteredTalleres = orderBy(filteredTalleres, [orderByValue], ['asc']);
      
      setSortedTalleres(filteredTalleres);
    }, [filterInput, orderByValue]);

    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const handleSearchChange = (e) => {
      setFilterInput(e.target.value);
    };

    const applyFilter = () => {
      console.log('Filtro aplicado:', filterInput);
      toggleModal(); 
    };

    const handleOrderChange = (e) => {
      setOrderByValue(e.target.value);  
    };

    return (
        <main className="taller-awaq">
            <header className="taller-awaq-header">
                <Link to="/Store">
                    <img src={Return} alt="return" className='return' />
                </Link>

                <div className='titulo1'>Lastenia Canallo</div>
                <img src={portadaImage} alt="Portada Taller Awaq" className="portada-image" />
                <h1>Lastenia Canallo</h1>
                <p className="subtitulo">
                    Conoce la historia detrás de este taller artesanal y cómo producen sus textiles
                </p>
            </header>

            <section className="productos">
                <h2>Artesanías</h2>
                <div className="search1">
                    <img src={seekerImg} alt="Buscar" />
                    <input 
                        type="text"
                        placeholder="Buscar taller..."
                        value={filterInput}
                        onChange={handleSearchChange}
                    />
                </div>
                
                <img src={Filter} alt="Filtro" id="filter" onClick={toggleModal} />
                
                {/* Modal de filtro */}
                {isModalOpen && (
                  <div className="modal">
                    <div className="modal-content">
                      <span className="close" onClick={toggleModal}>&times;</span>
                      <h2>Filtrar búsqueda</h2>
                      
                      <label htmlFor="orderBy">Ordenar por:</label>
                      <select 
                        id="orderBy"
                        value={orderByValue}
                        onChange={handleOrderChange}
                      >
                        <option value="nombre">Nombre</option>
                        <option value="ubicacion">Ubicación</option>
                      </select>
                      
                      <button onClick={applyFilter}>Aplicar filtro</button>
                    </div>
                  </div>
                )}

                <div className="producto-grid">
                    {sortedTalleres.map((taller, index) => (
                      <div key={index} className="producto-card">
                        <Link to={taller.ruta}>
                            <img src={taller.imagen} alt={taller.nombre} />
                            <h3>{taller.nombre}</h3>
                        </Link>
                        <p>{taller.ubicacion}</p>
                      </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default TallerAwaq;

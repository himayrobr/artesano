import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Importa useLocation para obtener el estado de la ruta
import { useHomeLogic } from '../data/TallerLogic.js';
import '../styles/TallerAwaq.css';

import Return from '../storage/img/arrow_back.svg';
import seekerImg from '../storage/img/seeker.svg';
import Filter from '../storage/img/Group8(1).svg';

function TallerAwaq() {
  // Llamada a la lógica personalizada
  useHomeLogic();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterInput, setFilterInput] = useState('');
  const [orderByValue, setOrderByValue] = useState('nombre');
  const [sortedTalleres, setSortedTalleres] = useState([]);
  const location = useLocation();
  const { taller } = location.state || {}; // Obtiene el taller seleccionado desde la ruta

  useEffect(() => {
    if (taller) {
      setSortedTalleres([taller]); // Establece el taller seleccionado
    }
  }, [taller]);

  if (!taller) {
    return <div>No se ha seleccionado una tienda.</div>; // Mensaje si no hay tienda seleccionada
  }

  // Función para cambiar el valor de filtro de búsqueda
  const handleSearchChange = (e) => {
    setFilterInput(e.target.value);
  };

  // Función para cambiar el criterio de orden
  const handleOrderChange = (e) => {
    setOrderByValue(e.target.value);
  };

  // Función para aplicar el filtro
  const applyFilter = () => {
    console.log('Filtro aplicado:', filterInput);
    toggleModal();
    // Aquí puedes agregar la lógica para filtrar los resultados
  };

  // Función para abrir y cerrar el modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <main className="taller-awaq">
      <header className="taller-awaq-header">
        <Link to="/store">
          <img src={Return} alt="Regresar" className="return" />
        </Link>

        <div className='titulo1'>{taller.nombre}</div>
        <img src={taller.foto} alt={taller.nombre} className="portada-image" />
        <h1>{taller.ciudad}</h1>
        <p className="subtitulo">
          Detalles de la tienda: {taller.descripcion}</p>
      </header>

      <section className="productos">
        <h2>Artesanías</h2>
        <div className="search1">
          <img src={seekerImg} className="Buscar" />
          <input
            type="text"
            placeholder="Buscar taller..."
            value={filterInput}
            onChange={handleSearchChange}
          />
        </div>

        <img src={Filter} alt="Filtro" className="filter" onClick={toggleModal} />

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
            <div className="producto-card" key={index}>
              <img src={taller.foto} alt={taller.nombre} />
              <h3>{taller.nombre}</h3>
              <p>{taller.ciudad}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default TallerAwaq;

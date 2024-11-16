import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useHomeLogic } from '../data/TallerLogic.js';
import '../styles/TallerAwaq.css';

import Return from '../storage/img/arrow_back.svg';
import seekerImg from '../storage/img/seeker.svg';
import Filter from '../storage/img/Group8(1).svg';

function TallerAwaq() {
  useHomeLogic();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterInput, setFilterInput] = useState('');
  const [orderByValue, setOrderByValue] = useState('nombre');
  const [sortedTalleres, setSortedTalleres] = useState([]);
  const [allTalleres, setAllTalleres] = useState([]); // Estado para almacenar todos los talleres
  const location = useLocation();
  const { taller } = location.state || {}; // Obtener el taller seleccionado desde la ruta

  useEffect(() => {
    const fetchTalleres = async () => {
      try {
        const response = await fetch('http://localhost:5000/store/');  // Cambia esto si es necesario
        
        // Verifica si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error('Error en la respuesta: ${response.statusText}');
        }
  
        const data = await response.json();  // Intenta obtener los datos JSON
        console.log('Datos recibidos:', data);
        setAllTalleres(data);
      } catch (error) {
        console.error('Error al obtener los talleres:', error);
      }
    };
  
    fetchTalleres();
  }, []);
  

  useEffect(() => {
    // Aplica el filtro y el orden cuando cambian filterInput o orderByValue
    let filteredTalleres = [...allTalleres]; // Copiar los talleres originales

    // Filtro por nombre (si el input tiene texto)
    if (filterInput) {
      filteredTalleres = filteredTalleres.filter((taller) =>
        taller.nombre.toLowerCase().includes(filterInput.toLowerCase())
      );
    }

    // Ordena por el valor seleccionado (nombre o ubicación)
    filteredTalleres = filteredTalleres.sort((a, b) => {
      if (orderByValue === 'nombre') {
        return a.nombre.localeCompare(b.nombre);
      }
      return a.ciudad.localeCompare(b.ciudad); // Ordenar por ciudad
    });

    setSortedTalleres(filteredTalleres);  // Actualizar los talleres filtrados y ordenados
  }, [filterInput, orderByValue, allTalleres]);  // Depender de filterInput, orderByValue y allTalleres

  if (!sortedTalleres.length) {
    return <div>No se encontraron talleres.</div>;  // Mostrar mensaje si no hay talleres
  }

  // Función para manejar cambios en el campo de búsqueda
  const handleSearchChange = (e) => {
    setFilterInput(e.target.value);
  };

  // Función para manejar cambios en el criterio de orden
  const handleOrderChange = (e) => {
    setOrderByValue(e.target.value);
  };

  // Función para abrir y cerrar el modal de filtro
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <main className="taller-awaq">
      <header className="taller-awaq-header">
        <Link to="/store">
          <img src={Return} alt="Regresar" className="return" />
        </Link>

        <div className='titulo1'>{taller ? taller.nombre : 'Taller no encontrado'}</div>
        <img src={taller ? taller.foto : ''} alt={taller ? taller.nombre : ''} className="portada-image" />
        <h1>{taller ? taller.ciudad : ''}</h1>
        <p className="subtitulo">
          Detalles del taller: {taller ? taller.descripcion : 'Descripción no disponible'}</p>
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

              <button onClick={toggleModal}>Aplicar filtro</button>
            </div>
          </div>
        )}

        <div className="producto-grid">
          {sortedTalleres.length > 0 ? (
            sortedTalleres.map((taller, index) => (
              <div className="producto-card" key={index}>
                <img src={taller.foto} alt={taller.nombre} />
                <h3>{taller.nombre}</h3>
                <p>{taller.ciudad}</p>
              </div>
            ))
          ) : (
            <p>No se encontraron talleres</p>  // Mensaje si no hay resultados
          )}
        </div>
      </section>
    </main>
  );
}

export default TallerAwaq
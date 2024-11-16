import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { endpoints } from '../apiConfig';
import '../styles/TallerAwaq.css';

import Return from '../storage/img/arrow_back.svg';
import seekerImg from '../storage/img/seeker.svg';
import Filter from '../storage/img/Group8(1).svg';
import SearchBar from './SearchBar';

function TallerAwaq() {
  const { id } = useParams();
  const [taller, setTaller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterInput, setFilterInput] = useState('');
  const [orderByValue, setOrderByValue] = useState('nombre');
  const [sortedTalleres, setSortedTalleres] = useState([]);
  const [allTalleres, setAllTalleres] = useState([]);

  // Fetch taller específico
  useEffect(() => {
    const fetchTallerDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(endpoints.getTaller(id));
        
        if (!response.ok) {
          throw new Error('No se pudo cargar la información del taller');
        }

        const data = await response.json();
        setTaller(data);
      } catch (err) {
        console.error('Error al cargar el taller:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTallerDetails();
    }
  }, [id]);

  // Fetch todos los talleres
  useEffect(() => {
    const fetchTalleres = async () => {
      try {
        const response = await fetch(endpoints.getAllTalleres());
        
        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log('Datos recibidos:', data);
        setAllTalleres(data);
      } catch (error) {
        console.error('Error al obtener los talleres:', error);
      }
    };
  
    fetchTalleres();
  }, []);

  // Efecto para filtrar y ordenar talleres
  useEffect(() => {
    let filteredTalleres = [...allTalleres];

    if (filterInput) {
      filteredTalleres = filteredTalleres.filter((taller) =>
        taller.nombre.toLowerCase().includes(filterInput.toLowerCase())
      );
    }

    filteredTalleres = filteredTalleres.sort((a, b) => {
      if (orderByValue === 'nombre') {
        return a.nombre.localeCompare(b.nombre);
      }
      return a.ciudad.localeCompare(b.ciudad);
    });

    setSortedTalleres(filteredTalleres);
  }, [filterInput, orderByValue, allTalleres]);

  if (loading) {
    return <div className="loading">Cargando información del taller...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const handleSearchChange = (e) => {
    setFilterInput(e.target.value);
  };

  const handleOrderChange = (e) => {
    setOrderByValue(e.target.value);
  };

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
        <img src={taller?.foto} alt={taller?.nombre} className="portada-image" />
        <h1>{taller?.ciudad}</h1>
        <p className="subtitulo">
          Detalles del taller: {taller ? taller.descripcion : 'Descripción no disponible'}
        </p>
      </header>

      <section className="productos">
        <h2>Artesanías</h2>
        <SearchBar /> {/* Aquí usamos el nuevo componente SearchBar */}

        <img src={Filter} alt="Filtro" className="filter" onClick={toggleModal} />

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
            sortedTalleres.map((taller) => (
              <div className="producto-card" key={taller._id}>
                <img src={taller.foto} alt={taller.nombre} />
                <h3>{taller.nombre}</h3>
                <p>{taller.ciudad}</p>
              </div>
            ))
          ) : (
            <p>No se encontraron talleres</p>
          )}
        </div>
      </section>
    </main>
  );
}

export default TallerAwaq;
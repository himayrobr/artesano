// TallerAwaq.js
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Importa useLocation para obtener el estado de la ruta
import '../styles/TallerAwaq.css';

function TallerAwaq() {
  const location = useLocation(); // Obtiene la ubicación de la ruta
  const { taller } = location.state || {}; // Accede al estado pasado desde Store

  const [filterInput, setFilterInput] = useState('');
  const [orderByValue, setOrderByValue] = useState('nombre');
  const [sortedTalleres, setSortedTalleres] = useState(taller ? [taller] : []); // Solo el taller seleccionado

  useEffect(() => {
    if (taller) {
      setSortedTalleres([taller]); // Establece el taller seleccionado como el contenido del componente
    }
  }, [taller]);

  if (!taller) {
    return <div>No se ha seleccionado una tienda.</div>; // Mensaje si no hay tienda seleccionada
  }

  return (
    <main className="taller-awaq">
      <header className="taller-awaq-header">
        <Link to="/store">
          <button className="return">Volver</button>
        </Link>
        <h1>{taller.nombre}</h1>
        <p>{taller.ciudad}</p>
        <img src={taller.foto} alt={taller.nombre} className="portada-image" />
        <p>Detalles de la tienda: {taller.descripcion}</p>
      </header>

      <section className="productos">
        <h2>Detalles del taller</h2>
        <div className="producto-grid">
          {/* Aquí puedes mostrar productos o detalles adicionales del taller */}
          <div className="producto-card">
            <img src={taller.foto} alt={taller.nombre} />
            <h3>{taller.nombre}</h3>
            <p>{taller.ciudad}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TallerAwaq;

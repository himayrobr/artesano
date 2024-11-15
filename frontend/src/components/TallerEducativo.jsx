import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TallerEducativo.css';

import Botonretroceso from '../storage/img/arrow_back.svg';
import Rombo from '../storage/img/Rectangle86.svg';
import Imagenprueba from '../storage/img/Rectangle 14.png';
import seekerImg from '../storage/img/seeker.svg';

function TallerEducativo() {
    const [tallerECode, setTallerECode] = useState('');
    const [talleres, setTalleres] = useState([]); // Estado para almacenar los talleres educativos
    const [loading, setLoading] = useState(true); // Estado para manejar el loading

    const handleBack = () => {
        // Lógica para regresar a la página anterior
    };

    const handleInputChange = (event) => {
        setTallerECode(event.target.value);
    };

    // Función para obtener los talleres educativos
    const fetchTalleres = async () => {
        try {
            const response = await fetch('http://localhost:5000/workshops'); // URL de la API que devuelve los talleres
            const data = await response.json(); // Parsear la respuesta como JSON
            setTalleres(data); // Guardar los talleres en el estado
            setLoading(false); // Detener el loading
        } catch (error) {
            console.error('Error fetching talleres:', error);
            setLoading(false); // Detener el loading en caso de error
        }
    };

    useEffect(() => {
        fetchTalleres(); // Llamar la función cuando el componente se monta
    }, []);

    return (
        <div className='taller-educativo'>
            <header className='header-taller'>
                <Link to='/Home'>
                    <button onClick={handleBack} className="back-button">
                        <img src={Botonretroceso} alt="return" className='icon-back' />
                    </button>
                </Link>
                <img className='rombo-icon' src={Rombo} alt="Rombo" />
                <h1 className='title-taller'>Talleres<br />Educativos</h1>
            </header>
            <div className="content-container">
                <div className="search-tallerE">
                    <img src={seekerImg} alt="Buscar" className='Buscar-taller' />
                    <div className="input-group">
                        <input 
                            type="text" 
                            value={tallerECode} 
                            onChange={handleInputChange} 
                            placeholder="Buscar taller, por categoría o artesanos" 
                            className="input-tallerE"
                        />
                    </div>
                </div>

                {/* Verificar si los talleres están cargando */}
                {loading ? (
                    <p>Cargando talleres...</p>
                ) : (
                    talleres.map((taller, index) => (
                        <div key={index} className="tallerE-card">
                            <div className="tallerE-image-container">
                                <img src={taller.imagen || Imagenprueba} alt="Taller" className="tallerE-image" />
                            </div>   

                            <div className="tallerE-details">
                                <p className="tallerE-info">{taller.nombre}<br />
                                    <span>{taller.descripcion}</span><br />
                                    Taller dado por {taller.artesanoId}</p>
                                <button className="btn-use-tallerE">
                                    Entérate más sobre el taller aquí
                                </button>
                            </div>
                        </div>
                    ))
                )}

                {/* Aquí puedes mantener los talleres estáticos que ya tenías */}
                
            </div>
        </div>
    );
}

export default TallerEducativo;

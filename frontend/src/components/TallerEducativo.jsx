import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TallerEducativo.css';

import Botonretroceso from '../storage/img/arrow_back.svg';
import Rombo from '../storage/img/Rectangle86.svg';
import Imagenprueba from '../storage/img/Rectangle 14.png';
import seekerImg from '../storage/img/seeker.svg';

function TallerEducativo() {
    const [tallerECode, setTallerECode] = useState('');

    const handleBack = () => {
        // Lógica para regresar a la página anterior
    };

    const handleInputChange = (event) => {
        setTallerECode(event.target.value);
    };

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

                <div className="tallerE-card">
                    <div className="tallerE-image-container">
                        <img src={Imagenprueba} alt="Taller" className="tallerE-image" />
                    </div>   

                    <div className="tallerE-details">
                        <p className="tallerE-info">Taller de bordado ayacuchano<br /><span>Para el público en general</span><br />Taller dado por los artesanos de Taller Awaq Ayllus</p>
                        <button className="btn-use-tallerE">Entérate más sobre el taller aquí</button>
                    </div>
                </div>
                <div className="tallerE-card">
                    <div className="tallerE-image-container">
                        <img src={Imagenprueba} alt="Taller" className="tallerE-image" />
                    </div>   

                    <div className="tallerE-details">
                        <p className="tallerE-info">Taller de bordado ayacuchano<br /><span>Para el público en general</span><br />Taller dado por los artesanos de Taller Awaq Ayllus</p>
                        <button className="btn-use-tallerE">Entérate más sobre el taller aquí</button>
                    </div>
                </div>
                <div className="tallerE-card">
                    <div className="tallerE-image-container">
                        <img src={Imagenprueba} alt="Taller" className="tallerE-image" />
                    </div>   

                    <div className="tallerE-details">
                        <p className="tallerE-info">Taller de bordado ayacuchano<br /><span>Para el público en general</span><br />Taller dado por los artesanos de Taller Awaq Ayllus</p>
                        <button className="btn-use-tallerE">Entérate más sobre el taller aquí</button>
                    </div>
                </div>
                <div className="tallerE-card">
                    <div className="tallerE-image-container">
                        <img src={Imagenprueba} alt="Taller" className="tallerE-image" />
                    </div>   

                    <div className="tallerE-details">
                        <p className="tallerE-info">Taller de bordado ayacuchano<br /><span>Para el público en general</span><br />Taller dado por los artesanos de Taller Awaq Ayllus</p>
                        <button className="btn-use-tallerE">Entérate más sobre el taller aquí</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TallerEducativo;

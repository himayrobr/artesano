import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Ajustes.css';
import Return from '../storage/img/arrow_back.svg';

function Ajustes() {
    const [region, setRegion] = useState("Canadá, Toronto");
    const [idioma, setIdioma] = useState("Español");
    const [moneda, setMoneda] = useState("PEN");

    // Handlers to simulate adjustments
    const changeRegion = () => setRegion(region === "Canadá, Toronto" ? "Estados Unidos, Nueva York" : "Canadá, Toronto");
    const changeIdioma = () => setIdioma(idioma === "Español" ? "Inglés" : "Español");
    const changeMoneda = () => setMoneda(moneda === "PEN" ? "USD" : "PEN");

    return (
        <div className="ajustes-container">
            <header className="ajustes-header">
                <img src={Return} className="RetrocederC" alt="Back" />
                <h1>Ajustes</h1>
            </header>

            <h2 className='Global'>Global</h2>
            <section className="ajustes-section">
                <div className="ajustes-item" onClick={changeRegion}>
                    Cambiar país y región <span>{region}</span>
                </div>
                <div className="ajustes-item" onClick={changeIdioma}>
                    Cambiar idioma <span>{idioma}</span>
                </div>
                <div className="ajustes-item" onClick={changeMoneda}>
                    Cambiar moneda <span>{moneda}</span>
                </div>
            </section>

            <section className="ajustes-section">
                <h2>Notificaciones</h2>
                <div className="ajustes-item">
                    Mostrar notificaciones de compras
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="ajustes-item">
                    Mostrar notificaciones de descuentos
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="ajustes-item">
                    Mostrar notificaciones de talleres
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="ajustes-item">
                    Sonido de notificaciones
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                </div>
            </section>

            <section className="ajustes-section">
                <h2>Legal</h2>
                <Link to="/politica-de-privacidad" className="ajustes-link">Política de privacidad</Link>
                <Link to="/informacion-legal" className="ajustes-link">Información legal</Link>
                <Link to="/libro-de-reclamaciones" className="ajustes-link">Libro de reclamaciones</Link>
            </section>
        </div>
    );
}

export default Ajustes;

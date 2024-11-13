import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Comentarios.css';
import Return from '../storage/img/arrow_back.svg';
import Rombo from '../storage/img/Rectangle86.svg';

function Comentarios() {
    const [comment, setComment] = useState("");

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    return (
        <div className='contenedor-comentarios'>
            <div className='contenedor-main'>
                <header className='header'>
                    <Link to="/Home">
                        <img src={Return} alt="return" className='retur' />
                    </Link>
                    <img className='rombo' src={Rombo} alt="Rombo" />
                    <h1 className='content-rombo'>Comentarios <br/> de la App</h1>
                </header>
                
                <section className='problemas-frecuentes'>
                    <h2>Problemas frecuentes</h2>
                    <button className='problema-btn'>La aplicación no carga de manera correcta</button>
                    <button className='problema-btn'>Errores al querer comprar en la aplicación</button>
                    <button className='problema-btn'>No puedo ver las imágenes de las tiendas y/o artesanías</button>
                    <button className='problema-btn'>No me permite usar un cupón de descuento</button>
                    <button className='problema-btn'>No me deja inscribirme a los talleres</button>
                    <button className='problema-btn'>El QR interactivo no funciona de manera correcta</button>
                </section>
                
                <section className='otro'>
                    <h2>Otro</h2>
                    <textarea 
                        placeholder='Describe aquí tu problema...'
                        value={comment}
                        onChange={handleCommentChange}
                        className='textarea-comentario'
                    />
                    <div className='botones'>
                        <button className='btn-adjuntar'>Adjuntar captura</button>
                        <button className='btn-enviar'>Enviar</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Comentarios;

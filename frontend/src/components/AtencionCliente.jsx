import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/AtencionCliente.css';


import Return from '../storage/img/arrow_back.svg';
import Rombo from '../storage/img/Rectangle86.svg';
import Message from '../storage/img/Vector 21.svg';
import Callme from '../storage/img/Group 33.svg';


function AtencionCliente() {
        return (
        <div className='contenedor-Atencion'>
            <div className='contenedor-padre'>
                <header className='header1'>
                    <Link to="/Home">
                        <img src={Return} alt="return" className='Darvuelta' />
                    </Link>
                    <img className='rombo1' src={Rombo} alt="Rombo1" />
                    <h1 className='contenido-rombo'>Atención <br/>al cliente</h1>
                </header>
                
                <section className='preguntas-frecuentes'>
                    <h2>Preguntas frecuentes</h2>
                    <button className='preguntas-btn'>¿Cómo compro en la app?</button>
                    <button className='preguntas-btn'>¿Cómo me inscribo en un taller?</button>
                    <button className='preguntas-btn'>¿Cómo escaneo el QR interactivo?</button>
                    <button className='preguntas-btn'>¿Cómo cambio la moneda en la app?</button>
                    <button className='preguntas-btn'>¿Cómo reporto un problema?</button>
                </section>
                
                <section className='Atencion'>
                    <h2>¿Necesitas atención personalizada? habla con nuestro equipo de soporte</h2>
                   
                    <div className='botones1'>        
                        <Link to='/Chat'>
                        <button className='soporte-btn2'> <p>Empieza un chat</p> </button>
                        <img src={Message} className="image-soporte2" />
                        </Link>
                    </div>   
                    <div className='botones2'>        
                        <Link to='/'>
                        <img src={Callme} className="image-soporte" />
                        <button className='soporte-btn2'> <p>Programa una llamada</p> </button>
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AtencionCliente;

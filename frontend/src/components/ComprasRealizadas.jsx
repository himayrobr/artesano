import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ComprasRealizadas.css'; 

import Return from '../storage/img/arrow_back.svg';
import Rombo from '../storage/img/Rectangle86.svg';
import Producto1 from '../storage/img/Rectangle 51.png'; // Cambia esto por las rutas correctas de tus imágenes
import Producto2 from '../storage/img/Rectangle 45.png';
import Artesania1 from '../storage/img/Rectangle 14.png';
import Artesania2 from '../storage/img/Rectangle 14.png';
import Artesania3 from '../storage/img/Rectangle 14.png';
import Artesania4 from '../storage/img/Rectangle 14.png';
import Messagge from '../storage/img/Group 31.svg';
function ComprasRealizadas() {
    const navigate = useNavigate();

    const handleBack = () => navigate('/home');

    return (
        <div className="compras-realizadas">
            {/* Header */}
            <header className="header-compras-realizadas">
                <button onClick={handleBack} className="back-return-compras-realizadas">
                    <img src={Return} alt="Retorno" className="img-return-compras-realizadas" />
                </button>
                <img src={Rombo} alt="Rombo" className="rombo-compras-realizadas" />
                <h1 className="titulo-compras-realizadas">
                    Compras <br /> Realizadas
                </h1>
            </header>

            {/* Contenedor de compras */}
            <div className="contenedor-compras-realizadas">
                {/* Primera compra */}
                <div className="compra-compras-realizadas">
                <img src={Messagge} alt="message"  className='soporte'/>
                    <img src={Producto1} alt="Producto 1" className="img-compra-compras-realizadas" />
                    <div className="info-compra-compras-realizadas">
                        <h3 className="titulo-compra-compras-realizadas">
                            Vasija pequeña con diseño de flor
                        </h3>
                        <p className="detalles-compra-compras-realizadas">
                            S/ 50.00 <br />
                            14cm x 12cm <br />
                            Autor: Pequeño Romo
                        </p>
                        <button className="btn-seguimiento-compras-realizadas">
                            Ver seguimiento del producto
                        </button>
                    </div>
                </div>

                {/* Segunda compra */}
                <div className="compra-compras-realizadas">
                    <img src={Messagge} alt="message" className='soporte' />
                    <img src={Producto2} alt="Producto 2" className="img-compra-compras-realizadas" />
                    <div className="info-compra-compras-realizadas">
                        <h3 className="titulo-compra-compras-realizadas">
                            Bolso negro con diseño de flores
                        </h3>
                        <p className="detalles-compra-compras-realizadas">
                            S/ 40.00 <br />
                            25cm x 30cm <br />
                            Autor: Pequeño Romo
                        </p>
                        <button className="btn-seguimiento-compras-realizadas">
                            Ver seguimiento del producto
                        </button>
                    </div>
                </div>
            </div>

            {/* Sugerencias de productos */}
            <div className="sugerencias-compras-realizadas">
                <h2 className="titulo-sugerencias-compras-realizadas">
                    Sigue viendo más artesanías
                </h2>
                <div className="grid-sugerencias-compras-realizadas">
                    <div className="artesania-compras-realizadas">
                        <img src={Artesania1} alt="Artesanía 1" />
                        <div className="info-artesania-compras-realizadas">
                            <p>Tapiz Chumpi Andino III</p>
                            <p>S/ 300</p>
                            <p>Taller Awaq Atikus</p>
                        </div>
                    </div>
                    <div className="artesania-compras-realizadas">
                        <img src={Artesania2} alt="Artesanía 2" />
                        <div className="info-artesania-compras-realizadas">
                            <p>Pechera de Chompa Kenai</p>
                            <p>S/ 300</p>
                        </div>
                    </div>
                    <div className="artesania-compras-realizadas">
                        <img src={Artesania3} alt="Artesanía 3" />
                        <div className="info-artesania-compras-realizadas">
                            <p>Pechera de Chompa Kenai</p>
                            <p>S/ 300</p>
                        </div>
                    </div>
                    <div className="artesania-compras-realizadas">
                        <img src={Artesania4} alt="Artesanía 4" />
                        <div className="info-artesania-compras-realizadas">
                            <p>Pechera de Chompa Kenai</p>
                            <p>S/ 300</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComprasRealizadas;

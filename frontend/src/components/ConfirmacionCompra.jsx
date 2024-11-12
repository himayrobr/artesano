import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ConfirmacionCompra.css';



import Listo from '../storage/img/Chulo.svg';

function ConfirmacionCompra() {
    return (
        <div className="scrollable-container">
            <div className="confirmacion-compra-container">
                <div className="icono-compra">
                    <img src={Listo} alt="" />
                </div>
                <h1>¡Compra realizada con éxito!</h1>
                <div className="decoracion">◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆</div>
                <p>Gracias por apoyar a los artesanos peruanos, puedes revisar tu compra en la opción de</p>
                <Link to="/ComprasRealizadas" className="boton-compras">Compras</Link>
                <div className="decoracion">◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆ ◆</div>
                <p>Vincula tu correo para recibir más detalles sobre tus compras realizadas</p>
                <input type="email" placeholder="Añadir correo electrónico" />
                <Link to="/home" className="boton-inicio">Regresar al inicio</Link>
            </div>
        </div>
    );
}

export default ConfirmacionCompra;

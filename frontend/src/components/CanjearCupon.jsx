import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CanjearCupon.css';


import Botonretroceso from '../storage/img/arrow_back.svg';
import Rombo from '../storage/img/Rectangle86.svg';
import Imagenprueba from '../storage/img/Rectangle 14.png';

function CanjearCupon() {
  const [couponCode, setCouponCode] = useState('');
  
  const handleBack = () => {
    // Lógica para regresar a la página anterior
  };

  const handleInputChange = (event) => {
    setCouponCode(event.target.value);
  };

  const handleValidateCoupon = () => {
    // Lógica para validar el cupón
  };

  return (
    <div className='CanjearCuponMain'>
      <header className='header-cupon'>
        <Link to='/Home'>
        <button onClick={handleBack} className="back-button">
          <img src={Botonretroceso} alt="return" className='flecha' />
        </button>
        </Link>
        <img className='rombo' src={Rombo} alt="Rombo" />
        <h1 className='title'>Canjear <br /> cupón</h1>
      </header>
      
      <div className="coupon-container">
        <div className='coupon-div'>
        <p className="question">¿Cuentas con algún cupón de descuento? Canjealo aquí</p>
        <div className="input-group">
          <input 
            type="text" 
            value={couponCode} 
            onChange={handleInputChange} 
            placeholder="Ingresa tu cupón" 
          />
          <button onClick={handleValidateCoupon} className="validate-button">Validar</button>
        </div>

        <h2 className="coupons-title">Cupones vigentes</h2>
        <p className="note">*Usar antes de la fecha de vencimiento</p>
        <div className="coupon">
            <div className="coupon-image-container">
                <img src={Imagenprueba} alt="Cupón de descuento" className="coupon-image" />
            </div>   

            <div className="coupon-details">
                <div className="coupon-info">
                <p>50% de descuento en cartucheras del Taller Awaq Ayllus</p>
                <p>Fecha de vencimiento: 4/9/23</p>
                <button className="use-coupon-button">Usar cupón</button>
                </div>
            </div>
            </div>
      </div>
      </div>
    </div>
  );
}

export default CanjearCupon;

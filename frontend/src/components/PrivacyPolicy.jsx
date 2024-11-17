import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../apiConfig';  // Asegúrate de que endpoints esté correctamente configurado
import '../styles/PrivacyPolicy.css';



import Return from '../storage/img/arrow_back.svg';
const PolicyPrivacy = () => {
  const navigate = useNavigate();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const handleCheckboxChange = (e) => {
    if (e.target.name === 'terms') {
      setAcceptedTerms(e.target.checked);
    }
    if (e.target.name === 'marketing') {
      setMarketingConsent(e.target.checked);
    }
  };

  const handleSubmit = async () => {
    if (!acceptedTerms) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    // Recuperamos los datos guardados en el localStorage
    const registrationData = JSON.parse(localStorage.getItem('registrationData'));
    if (registrationData) {
      // Agregar el consentimiento a los datos de registro
      registrationData.acceptedTerms = acceptedTerms;
      registrationData.marketingConsent = marketingConsent;

      try {
        let endpoint = '';

        // Determinamos el endpoint según si es un registro por email o por teléfono
        if (registrationData.email) {
          endpoint = endpoints.registerByEmail;
        } else if (registrationData.phone) {
          endpoint = endpoints.registerByPhone;
        }

        // Si no es un registro válido, mostramos un mensaje de error
        if (!endpoint) {
          alert("Datos de registro incompletos.");
          return;
        }

        // Enviar la información al backend para completar el registro
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registrationData),
        });

        const data = await response.json();

        if (response.ok) {
          // Registro exitoso: limpiar localStorage y redirigir
          localStorage.removeItem('registrationData');
          alert("Registro exitoso!");
          navigate('/'); // Cambia esto a la página de redirección que prefieras
        } else {
          // Si hubo un error
          alert(data.message || "Error en el registro.");
        }
      } catch (error) {
        console.error("Error al registrar:", error);
        alert("Error en el registro.");
      }
    }
  };

  return (
    <div className="privacy-policy-container">
      <button onClick={() => navigate(-1)} className="back-button">
        <img src={Return} className="return-iconPRIVATE" />
      </button>
      <div className="form-container">
        <h2>Política de Privacidad</h2>
        <p>Aquí va el contenido de la política de privacidad...</p>

        <label>
          <input type="checkbox" name="terms" onChange={handleCheckboxChange} /> He leído y acepto la Política de privacidad
        </label>
        
        <label>
          <input type="checkbox" name="terms" onChange={handleCheckboxChange} /> He leído y acepto los Términos y condiciones
        </label>
        
        <label>
          <input type="checkbox" name="marketing" onChange={handleCheckboxChange} /> Acepto que me envíen promociones y eventos a mi correo electrónico
        </label>

        <button onClick={handleSubmit} className="submit-button">Finalizar Registro</button>
      </div>
    </div>
  );
};

export default PolicyPrivacy;

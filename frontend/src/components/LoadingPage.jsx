import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoadingPage.css';
import Ruraq from '../storage/img/ruraq.svg';

const LoadingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Configura un temporizador de 3 segundos antes de la redirección
        const timer = setTimeout(() => {
            navigate('/Home'); 
        }, 3000);

        // Limpia el temporizador cuando el componente se desmonte
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <main>
            <div className="main__load">
                <img src={Ruraq} alt="Loading..." />
            </div>
        </main>
    );
};

export default LoadingPage;
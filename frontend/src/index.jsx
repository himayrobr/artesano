import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Asegúrate de que esta ruta sea correcta

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("El elemento con id 'root' no fue encontrado.");
}

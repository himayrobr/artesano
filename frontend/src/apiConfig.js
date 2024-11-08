const API_BASE_URL = 'http://localhost:5000';

export const endpoints = {
  register: `${API_BASE_URL}/auth`,  // Cambia a '/auth' en lugar de '/users/register'
  login: `${API_BASE_URL}/auth/login`,
  logout: `${API_BASE_URL}/auth/logout`,
};

export default API_BASE_URL;



// ejemplo de uso para fecht en los archivos frontend
// import API_BASE_URL, { endpoints } from './ruta/al/archivo';
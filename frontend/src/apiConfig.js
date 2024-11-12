const API_BASE_URL = 'http://localhost:5000/';

export const endpoints = {
  register: `${API_BASE_URL}/users/register`,
  login: `${API_BASE_URL}/users/login`,
  logout: `${API_BASE_URL}/users/logout`,
  getCategoryUrl: (categoria) => `${API_BASE_URL}products/categoria/${categoria}`,
  search: (query) => `${API_BASE_URL}products/search?q=${encodeURIComponent(query)}`,
};

export default API_BASE_URL;


// ejemplo de uso para fecht en los archivos frontend
// import API_BASE_URL, { endpoints } from './ruta/al/archivo';
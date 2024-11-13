const API_BASE_URL = 'http://localhost:5000/';


export const endpoints = {
  registerByEmail: `${API_BASE_URL}auth/register/email`,
  registerByPhone: `${API_BASE_URL}auth/register/phone`,
  register: `${API_BASE_URL}auth`,
  login: `${API_BASE_URL}auth/login`,
  logout: `${API_BASE_URL}auth/logout`,
  ruraqLogin: `${API_BASE_URL}auth/ruraq-login`,
  getCategoryUrl: (categoria) => `${API_BASE_URL}products/categoria/${categoria}`,
  search: (query) => `${API_BASE_URL}products/search?q=${encodeURIComponent(query)}`,
};

export default API_BASE_URL;


// ejemplo de uso para fecht en los archivos frontend
// import API_BASE_URL, { endpoints } from './ruta/al/archivo';
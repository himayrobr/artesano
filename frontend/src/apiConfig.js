const API_BASE_URL = 'http://localhost:5000/';

export const endpoints = {
  registerByEmail: `${API_BASE_URL}auth/register/email`,
  registerByPhone: `${API_BASE_URL}auth/register/phone`,
  register: `${API_BASE_URL}auth`,
  login: `${API_BASE_URL}auth/login`,
  logout: `${API_BASE_URL}auth/logout`,
  ruraqLogin: `${API_BASE_URL}auth/ruraq-login`,
  chat: `${API_BASE_URL}api/chat`, 
};

export default API_BASE_URL;

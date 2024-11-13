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
  cart: `${API_BASE_URL}cart`,  // Ruta para obtener el carrito
  cartAdd: `${API_BASE_URL}cart/add`,  // Ruta para agregar un producto al carrito
  cartRemove: (productId) => `${API_BASE_URL}cart/remove/${productId}`,  // Ruta para eliminar un producto del carrito
};

export default API_BASE_URL;

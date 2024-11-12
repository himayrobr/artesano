const API_BASE_URL = 'http://localhost:5000/';

export const endpoints = {
  register: `${API_BASE_URL}/users/register`,
  login: `${API_BASE_URL}/users/login`,
  logout: `${API_BASE_URL}/users/logout`,
  getCategoryUrl: (categoria) => `${API_BASE_URL}products/categoria/${categoria}`,
  search: (query) => `${API_BASE_URL}products/search?q=${encodeURIComponent(query)}`,
  cart: `${API_BASE_URL}cart`,  // Ruta para obtener el carrito
  cartAdd: `${API_BASE_URL}cart/add`,  // Ruta para agregar un producto al carrito
  cartRemove: (productId) => `${API_BASE_URL}cart/remove/${productId}`,  // Ruta para eliminar un producto del carrito
};

export default API_BASE_URL;

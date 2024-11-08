const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Crear un nuevo producto
router.post('/products', productController.createProduct);

// Obtener todos los productos
router.get('/products', productController.getAllProducts);

// Obtener un producto por ID
router.get('/products/:id', productController.getProductById);

// Actualizar un producto
router.put('/products/:id', productController.updateProduct);

// Eliminar un producto
router.delete('/products/:id', productController.deleteProduct);

// Buscar productos
router.get('/products/search', productController.searchProducts);

module.exports = router;

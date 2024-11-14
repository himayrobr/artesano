const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Las rutas ya no necesitan el prefijo '/products'
// Crear un nuevo producto
router.post('/', productController.createProduct);

// Buscar productos
router.get('/search', productController.findProductsMatchingTitleOrDescription);

// Obtener un producto por ID
router.get('/:id', productController.getProductById);

// Obtener todos los productos
router.get('/', productController.getAllProducts);


// Obtener productos por Categoria
router.get('/categoria/:categoria', productController.getProductsByCategory);

// Actualizar un producto
router.put('/:id', productController.updateProduct);

// Eliminar un producto
router.delete('/:id', productController.deleteProduct);



module.exports = router;

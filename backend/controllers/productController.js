const Product = require('../models/productModel');

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, fotos, stock, artesanoId } = req.body;

    // Crear una nueva instancia de Product
    const product = new Product({
      nombre,
      descripcion,
      precio,
      categoria,
      fotos,
      stock,
      artesanoId
    });

    // Guardar el producto en la base de datos
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(400).json({ message: 'Error al crear el producto', error });
  }
};

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('artesanoId', 'nombre'); // Populamos para obtener el nombre del artesano
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('artesanoId', 'nombre');
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ message: 'Error al obtener el producto', error });
  }
};

// Obtener productos por categoría
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoria } = req.params;
    const products = await Product.find({ categoria }).populate('artesanoId', 'nombre');
    
    if (products.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos para esta categoría' });
    }
    
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error);
    res.status(500).json({ message: 'Error al obtener productos por categoría', error });
  }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, fotos, stock } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { nombre, descripcion, precio, categoria, fotos, stock },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(400).json({ message: 'Error al actualizar el producto', error });
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};

// Buscar productos por criterios (e.g., nombre, categoría)
exports.searchProducts = async (req, res) => {
  try {
    const { nombre, categoria } = req.query;
    let query = {};

    if (nombre) {
      query.nombre = new RegExp(nombre, 'i'); // Búsqueda insensible a mayúsculas
    }
    if (categoria) {
      query.categoria = categoria;
    }

    const products = await Product.find(query).populate('artesanoId', 'nombre');
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).json({ message: 'Error al buscar productos', error });
  }
};

module
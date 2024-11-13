const mongoose = require('mongoose');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Obtener el carrito del usuario
exports.getCart = async (req, res) => {
  // Asumiendo que tienes un middleware que agrega el id del usuario
  const userId = 'user_test_id';  // Cambia esto a un valor dinámico si es necesario

  try {
    // Asegúrate de que el userId es un ObjectId válido
    const objectIdUserId = mongoose.Types.ObjectId(userId);

    const cart = await Cart.findOne({ userId: objectIdUserId }).populate('items.productId');
    if (!cart) {
      return res.status(200).json({ items: [], total: 0 });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ mensaje: 'Error al obtener el carrito', error });
  }
};

// Agregar un producto al carrito
exports.addItemToCart = async (req, res) => {
  const userId = 'user_test_id';  // Cambia esto a un valor dinámico si es necesario
  const { productId, cantidad } = req.body;

  try {
    // Asegúrate de que el userId es un ObjectId válido
    const objectIdUserId = mongoose.Types.ObjectId(userId);
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ mensaje: 'Producto no encontrado' });

    let cart = await Cart.findOne({ userId: objectIdUserId });
    if (cart) {
      // Si el carrito existe, actualiza la cantidad o agrega el nuevo producto
      const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));

      if (itemIndex > -1) {
        // Producto ya existe en el carrito, actualiza la cantidad
        cart.items[itemIndex].cantidad += cantidad;
      } else {
        // Producto no existe en el carrito, agrégalo
        cart.items.push({ productId, cantidad });
      }
    } else {
      // Si no existe el carrito, crea uno nuevo
      cart = new Cart({
        userId: objectIdUserId,  // Usa ObjectId aquí
        items: [{ productId, cantidad }],
      });
    }

    // Recalcula el total del carrito
    cart.total = await calculateCartTotal(cart.items);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ mensaje: 'Error al agregar al carrito', error });
  }
};

// Eliminar un producto del carrito
exports.removeItemFromCart = async (req, res) => {
  const userId = 'user_test_id';  // Cambia esto a un valor dinámico si es necesario
  const { productId } = req.params;

  try {
    // Asegúrate de que el userId es un ObjectId válido
    const objectIdUserId = mongoose.Types.ObjectId(userId);

    let cart = await Cart.findOne({ userId: objectIdUserId });
    if (!cart) return res.status(404).json({ mensaje: 'Carrito no encontrado' });

    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      // Recalcula el total del carrito
      cart.total = await calculateCartTotal(cart.items);
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ mensaje: 'Producto no encontrado en el carrito' });
    }
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ mensaje: 'Error al eliminar del carrito', error });
  }
};

// Función para calcular el total del carrito
async function calculateCartTotal(items) {
  let total = 0;
  for (let item of items) {
    const product = await Product.findById(item.productId);
    total += product.precio * item.cantidad;
  }
  return total;
}

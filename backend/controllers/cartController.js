// Agregar producto al carrito
exports.addItemToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, cantidad } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ mensaje: 'Producto no encontrado' });

    let cart = await Cart.findOne({ userId });
    const precio = product.precio;

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId == productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].cantidad += cantidad;
        cart.items[itemIndex].precio = precio;
      } else {
        cart.items.push({ productId, cantidad, precio });
      }
    } else {
      cart = new Cart({
        userId,
        items: [{ productId, cantidad, precio }],
        total: precio * cantidad,
      });
    }

    cart.total = cart.items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar al carrito', error });
  }
};

// Quitar producto del carrito
exports.removeItemFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId == productId);

      if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);
        cart.total = cart.items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        await cart.save();
        return res.status(200).json(cart);
      }
      
      return res.status(404).json({ mensaje: 'Producto no encontrado en el carrito' });
    }

    res.status(404).json({ mensaje: 'Carrito no encontrado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al quitar del carrito', error });
  }
};

// Aplicar cupón de descuento
exports.applyCoupon = async (req, res) => {
  const userId = req.user.id;
  const { couponCode } = req.body;

  try {
    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) return res.status(404).json({ mensaje: 'Cupón no encontrado' });

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const discount = coupon.discount;
      cart.total = cart.total - (cart.total * discount / 100);
      await cart.save();
      return res.status(200).json(cart);
    }

    res.status(404).json({ mensaje: 'Carrito no encontrado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al aplicar el cupón', error });
  }
};

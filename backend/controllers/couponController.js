// controllers/couponController.js
const Coupon = require('../models/couponModel'); // Ajusta la ruta según la ubicación de tu modelo

// Crear un cupón
exports.createCoupon = async (req, res) => {
  try {
    const { codigo, descuento, tipo, fechaExpiracion, usuarioId } = req.body;
    const newCoupon = new Coupon({ codigo, descuento, tipo, fechaExpiracion, usuarioId });
    await newCoupon.save();
    res.status(201).json({ message: 'Cupón creado con éxito', coupon: newCoupon });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el cupón', error: error.message });
  }
};

// Obtener todos los cupones
exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los cupones', error: error.message });
  }
};

// Obtener un cupón por su código
exports.getCouponByCode = async (req, res) => {
  try {
    const { codigo } = req.params;
    const coupon = await Coupon.findOne({ codigo });
    if (!coupon) {
      return res.status(404).json({ message: 'Cupón no encontrado' });
    }
    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el cupón', error: error.message });
  }
};

// Aplicar un cupón al carrito
exports.applyCoupon = async (req, res) => {
  try {
    const { codigo, carritoTotal } = req.body;
    const coupon = await Coupon.findOne({ codigo });
    if (!coupon) {
      return res.status(404).json({ message: 'Cupón no válido' });
    }
    if (coupon.fechaExpiracion < new Date()) {
      return res.status(400).json({ message: 'El cupón ha expirado' });
    }
    // Lógica para aplicar el descuento al total del carrito
    const descuentoAplicado = carritoTotal * (coupon.descuento / 100);
    const totalConDescuento = carritoTotal - descuentoAplicado;

    res.status(200).json({ 
      message: 'Descuento aplicado con éxito', 
      totalConDescuento 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al aplicar el cupón', error: error.message });
  }
};

// Actualizar un cupón
exports.updateCoupon = async (req, res) => {
  try {
    const { codigo } = req.params;
    const { descuento, tipo, fechaExpiracion, usuarioId } = req.body;
    const coupon = await Coupon.findOneAndUpdate(
      { codigo },
      { descuento, tipo, fechaExpiracion, usuarioId },
      { new: true }
    );
    if (!coupon) {
      return res.status(404).json({ message: 'Cupón no encontrado' });
    }
    res.status(200).json({ message: 'Cupón actualizado con éxito', coupon });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el cupón', error: error.message });
  }
};

// Eliminar un cupón
exports.deleteCoupon = async (req, res) => {
  try {
    const { codigo } = req.params;
    const coupon = await Coupon.findOneAndDelete({ codigo });
    if (!coupon) {
      return res.status(404).json({ message: 'Cupón no encontrado' });
    }
    res.status(200).json({ message: 'Cupón eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el cupón', error: error.message });
  }
};

// Validar un cupón
exports.validateCoupon = async (req, res) => {
  try {
    const { codigo } = req.params;
    const coupon = await Coupon.findOne({ codigo });
    if (!coupon) {
      return res.status(404).json({ message: 'Cupón no válido' });
    }
    if (coupon.fechaExpiracion < new Date()) {
      return res.status(400).json({ message: 'El cupón ha expirado' });
    }
    res.status(200).json({ message: 'Cupón válido', coupon });
  } catch (error) {
    res.status(500).json({ message: 'Error al validar el cupón', error: error.message });
  }
};

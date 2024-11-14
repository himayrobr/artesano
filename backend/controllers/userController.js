const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Workshop = require('../models/workshopModel'); // Changed 'Taller' to 'Workshop'

// Update a user
const updateUser = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id);
    const { nombre, contraseña, fotoPerfil, direccion, telefono } = req.body;

    const updatedData = { nombre, fotoPerfil, direccion, telefono };

    if (contraseña) {
      const salt = await bcrypt.genSalt(10);
      updatedData.contraseña = await bcrypt.hash(contraseña, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Usuario actualizado correctamente',
      usuario: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el usuario', error });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ mensaje: 'ID de usuario no válido' });
    }

    const userId = new mongoose.Types.ObjectId(req.params.id);
    const usuario = await User.findById(userId);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Usuario encontrado',
      usuario,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar el usuario', error });
  }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ mensaje: 'ID de usuario no válido' });
    }

    const userId = new mongoose.Types.ObjectId(req.params.id);
    const usuario = await User.findByIdAndDelete(userId);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Usuario eliminado con éxito',
      usuario,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el usuario', error });
  }
};

// Get enrolled workshops
const getEnrolledWorkshops = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ mensaje: 'ID de usuario no válido' });
    }
    const userId = new mongoose.Types.ObjectId(req.params.id);
    const userWithWorkshops = await User.aggregate([
      {
        $match: { _id: userId },
      },
      {
        $lookup: {
          from: 'workshop',
          localField: 'talleresInscritos',
          foreignField: '_id',
          as: 'workshopsInfo',
        },
      },
      {
        $project: {
          _id: 0,
          nombre: 1,
          workshopsInfo: 1,
        },
      },
    ]);

    if (!userWithWorkshops || userWithWorkshops.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron talleres para este usuario' });
    }

    res.status(200).json({
      mensaje: 'Talleres inscritos encontrados',
      usuario: userWithWorkshops[0],
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar los talleres', error });
  }
};

// Get favorites
const getFavorites = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ mensaje: 'ID de usuario no válido' });
    }
    const userId = new mongoose.Types.ObjectId(req.params.id);
    const userWithFavorites = await User.aggregate([
      {
        $match: { _id: userId },
      },
      {
        $lookup: {
          from: 'product',
          localField: 'favoritos',
          foreignField: '_id',
          as: 'favorites',
        },
      },
      {
        $project: {
          _id: 0,
          nombre: 1,
          favorites: 1,
        },
      },
    ]);

    if (!userWithFavorites || userWithFavorites.length === 0) {
      return res.status(404).json({ mensaje: 'Este usuario no tiene productos favoritos' });
    }

    res.status(200).json({
      mensaje: 'Favoritos encontrados',
      usuario: userWithFavorites[0],
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar los favoritos', error });
  }
};

// Add favorite
const addFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ mensaje: 'ID de usuario o producto no válido' });
    }

    const producto = await Product.findById(productId);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favoritos: productId } },
      { new: true }
    ).populate('favoritos');

    if (!updatedUser) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Producto agregado a favoritos',
      usuario: updatedUser,
    });
  } catch (error) {
    console.error('Error al agregar producto a favoritos:', error);
    res.status(500).json({ mensaje: 'Error al agregar producto a favoritos', error });
  }
};

// Remove favorite
const removeFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ mensaje: 'ID de usuario o producto no válido' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { favoritos: productId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Producto eliminado de favoritos',
      usuario: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el producto de favoritos', error });
  }
};

// Add workshop
const addWorkshop = async (req, res) => {
  try {
    const { userId, workshopId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(workshopId)) {
      return res.status(400).json({ mensaje: 'ID de usuario o taller no válido' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { talleresInscritos: workshopId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Taller agregado a talleres inscritos',
      usuario: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar el taller a talleres inscritos', error });
  }
};

// Remove workshop
const removeWorkshop = async (req, res) => {
  try {
    const { userId, workshopId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(workshopId)) {
      return res.status(400).json({ mensaje: 'ID de usuario o taller no válido' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { talleresInscritos: workshopId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Taller eliminado de talleres inscritos',
      usuario: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el taller de talleres inscritos', error });
  }
};

module.exports = {
  updateUser,
  getUserById,
  deleteUserById,
  getEnrolledWorkshops,
  getFavorites,
  addFavorite,
  removeFavorite,
  addWorkshop,
  removeWorkshop,
};

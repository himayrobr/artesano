const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Product = require('../models/productUsModel');
const Taller = require('../models/workshopUsModel')

const actualizarUsuario = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id); 
    const { nombre, contraseña, fotoPerfil, direccion, telefono } = req.body;

    const datosActualizados = { nombre, fotoPerfil, direccion, telefono };

    if (contraseña) {
      const salt = await bcrypt.genSalt(10);
      datosActualizados.contraseña = await bcrypt.hash(contraseña, salt);
    }

    const usuarioActualizado = await User.findByIdAndUpdate(
      userId,
      { $set: datosActualizados },
      { new: true, runValidators: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Usuario actualizado correctamente',
      usuario: usuarioActualizado,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el usuario', error });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
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
      usuario
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar el usuario', error });
  }
};

const eliminarUsuarioPorId = async (req, res) => {
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
      usuario
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el usuario', error });
  }
};

const obtenerTalleresInscritos = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ mensaje: 'ID de usuario no válido' });
    }
    const usuarioId = new mongoose.Types.ObjectId(req.params.id);
    const usuarioConTalleres = await User.aggregate([
      {
        $match: { _id: usuarioId }, 
      },
      {
        $lookup: {
          from: 'Workshop',
          localField: 'talleresInscritos',
          foreignField: '_id',
          as: 'talleresInfo',
        },
      },
      {
        $project: {
          _id: 0,
          nombre: 1,
          talleresInfo: 1,
        },
      },
    ]);

    if (!usuarioConTalleres || usuarioConTalleres.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron talleres para este usuario' });
    }

    res.status(200).json({
      mensaje: 'Talleres inscritos encontrados',
      usuario: usuarioConTalleres[0],
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar los talleres', error });
  }
};

const obtenerFavoritos = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ mensaje: 'ID de usuario no válido' });
    }
    const usuarioId = new mongoose.Types.ObjectId(req.params.id);
    const usuarioConTalleres = await User.aggregate([
      {
        $match: { _id: usuarioId }, 
      },
      {
        $lookup: {
          from: 'Product',
          localField: 'favoritos',
          foreignField: '_id',
          as: 'Favoritos',
        },
      },
      {
        $project: {
          _id: 0,
          nombre: 1,
          Favoritos: 1,
        },
      },
    ]);

    if (!usuarioConTalleres || usuarioConTalleres.length === 0) {
      return res.status(404).json({ mensaje: 'Este usuario no tiene productos favoritos' });
    }

    res.status(200).json({
      mensaje: 'Favoritos encontrados',
      usuario: usuarioConTalleres[0],
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar los favoritos', error });
  }
};

const agregarFavorito = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ mensaje: 'ID de usuario o producto no válido' });
    }
    const producto = await Product.findById(productId);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    const usuarioActualizado = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favoritos: productId } }, 
      { new: true }
    ).populate('favoritos'); 

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Producto agregado a favoritos',
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error("Error al agregar producto a favoritos:", error);
    res.status(500).json({ mensaje: 'Error al agregar producto a favoritos', error });
  }
};

const eliminarDeFavoritos = async (req, res) => {
  try {
    const { idUsuario, idProducto } = req.params;

    if (!mongoose.Types.ObjectId.isValid(idUsuario) || !mongoose.Types.ObjectId.isValid(idProducto)) {
      return res.status(400).json({ mensaje: 'ID de usuario o producto no válido' });
    }

    const usuarioActualizado = await User.findByIdAndUpdate(
      idUsuario,
      { $pull: { favoritos: idProducto } },
      { new: true } 
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Producto eliminado de favoritos',
      usuario: usuarioActualizado,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el producto de favoritos', error });
  }
};

const agregarTaller = async (req, res) => {
  try {
    const { idUsuario, idTaller } = req.params;

    if (!mongoose.Types.ObjectId.isValid(idUsuario) || !mongoose.Types.ObjectId.isValid(idTaller)) {
      return res.status(400).json({ mensaje: 'ID de usuario o taller no válido' });
    }

    const usuarioActualizado = await User.findByIdAndUpdate(
      idUsuario,
      { $addToSet: { talleresInscritos: idTaller } },  
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({
      mensaje: 'Taller agregado a talleres inscritos',
      usuario: usuarioActualizado,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar el taller a talleres inscritos', error });
  }
};

const eliminarTaller = async (req, res) => {
  try {
    const { idUsuario, idTaller } = req.params;
    if (!mongoose.Types.ObjectId.isValid(idUsuario) || !mongoose.Types.ObjectId.isValid(idTaller)) {
      return res.status(400).json({ mensaje: 'ID de usuario o taller no válido' });
    }
    const usuarioActualizado = await User.findByIdAndUpdate(
      idUsuario,
      { $pull: { talleresInscritos: idTaller } },  
      { new: true }
    );
    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json({
      mensaje: 'Taller eliminado de talleres inscritos',
      usuario: usuarioActualizado,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el taller de talleres inscritos', error });
  }
};

module.exports = { actualizarUsuario, obtenerUsuarioPorId, eliminarUsuarioPorId, obtenerTalleresInscritos, obtenerFavoritos, agregarFavorito, eliminarDeFavoritos, agregarTaller, eliminarTaller };

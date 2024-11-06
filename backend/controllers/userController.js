const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

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

module.exports = { actualizarUsuario, obtenerUsuarioPorId, eliminarUsuarioPorId };

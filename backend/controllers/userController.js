const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Controlador para actualizar datos específicos del usuario
const actualizarUsuario = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id); // Asegúrate de usar 'new' para instanciar ObjectId
    const { nombre, contraseña, fotoPerfil, direccion, telefono } = req.body;

    // Solo los campos permitidos para actualización
    const datosActualizados = { nombre, fotoPerfil, direccion, telefono };

    // Cifrado de contraseña si es proporcionada
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

module.exports = { actualizarUsuario };

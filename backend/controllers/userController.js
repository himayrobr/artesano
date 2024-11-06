const User = require('../models/userModel');


const updateUserProfile = async (req, res) => {
  const { _id } = req.params;
  const { nombre, contraseña, fotoPerfil, direccion, telefono } = req.body;
  try {
    const updates = { nombre, fotoPerfil, direccion, telefono };
    if (contraseña) {
      const salt = await bcrypt.genSalt(10);
      updates.contraseña = await bcrypt.hash(contraseña, salt);
    }
    const user = await User.findByIdAndUpdate(_id, updates, { new: true });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Perfil actualizado', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar", error: error.message });
  }
};

module.exports = { updateUserProfile };

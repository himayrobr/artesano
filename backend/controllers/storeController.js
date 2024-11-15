const Stores = require('../models/storeModel');

exports.getAllStores = async (req, res) => {
  try {
    const stores = await Stores.find({});
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos de la tienda', error });
  }
};

// Buscar talleres
exports.searchStores = async (req, res) => {
  try {
    const { nombre, descripcion } = req.query;
    const query = {};

    if (nombre) query.nombre = new RegExp(nombre, 'i');
    if (descripcion) query.descripcion = new RegExp(descripcion, 'i');

    const stores = await Stores.find(query);
    res.send(stores);
  } catch (error) {
    res.status(500).send(error);
  }
};

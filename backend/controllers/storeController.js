const Store = require('../models/storeModel');

const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find({});
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos de la tienda', error });
  }
};

module.exports = {
  getAllStores,
};

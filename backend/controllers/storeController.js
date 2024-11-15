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


const handleStoreClick = async (_id) => {
  try {
    const response = await fetch(`http://localhost:5000/store/${_id}`); // Solicitar información de la tienda por ID
    if (!response.ok) throw new Error('Error al obtener los datos de la tienda');

    const storeData = await response.json();
    setTaller(storeData); // Actualizar el estado con la nueva tienda seleccionada
  } catch (error) {
    console.error('Error al obtener los datos de la tienda:', error);
  }
};
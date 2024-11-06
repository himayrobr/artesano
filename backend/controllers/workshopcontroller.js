const Workshop = require('../models/workshop.js');

// Crear un nuevo taller
exports.createWorkshop = async (req, res) => {
  try {
    const workshop = new Workshop(req.body);
    await workshop.save();
    res.status(201).send(workshop);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Actualizar un taller
exports.updateWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!workshop) {
      return res.status(404).send();
    }
    res.send(workshop);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Eliminar un taller
exports.deleteWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findByIdAndDelete(req.params.id);
    if (!workshop) {
      return res.status(404).send();
    }
    res.send(workshop);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Buscar talleres
exports.searchWorkshops = async (req, res) => {
  try {
    const { nombre, descripcion, modalidad, ubicacion } = req.query;
    const query = {};

    if (nombre) query.nombre = new RegExp(nombre, 'i');
    if (descripcion) query.descripcion = new RegExp(descripcion, 'i');
    if (modalidad) query.modalidad = modalidad;
    if (ubicacion) query.ubicacion = ubicacion;

    const workshops = await Workshop.find(query);
    res.send(workshops);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find({});
    res.status(200).json(workshops); // Asegúrate de enviar JSON válido
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workshops' });
  }
};


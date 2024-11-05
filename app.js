const express from "express";
const path = require("path");
require('dotenv').config();

import cors from "cors"; // Si usas otros módulos, también debes importarlos
// ...otras importaciones necesarias

const app = express();

// Configuraciones y rutas
// ...

app.listen(process.env.PORT || 5000, () => {
  console.log("Servidor en ejecución en el puerto 5000");
});

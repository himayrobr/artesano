const express = require("express");
const path = require("path");
require('dotenv').config();
const connect = require('./backend/helpers/connect'); 
const cors = require('cors'); 

const workshopRoutes = require('./backend/routes/workshopRoutes');
const orderRoutes = require('./backend/routes/orderRoutes');
// Conexión a la base de datos
connect();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); 

app.use('/', workshopRoutes);
app.use('/', orderRoutes);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist', 'client')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'client', 'index.html'));
  });
}

// Configuración del puerto y host
const PORT = process.env.EXPRESS_PORT || 5000;
const HOST = process.env.EXPRESS_HOST_NAME || 'localhost';

// Inicio del servidor
app.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});

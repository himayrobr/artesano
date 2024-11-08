const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./backend/middleware/passportConfig"); // Asegúrate de que la ruta sea correcta
const authRoutes = require("./backend/routes/authRoutes"); // Rutas de autenticación
const cors = require('cors');
require('dotenv').config();

const app = express();

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("Conectado a la base de datos"))
  .catch(err => console.log("Error al conectar a la base de datos:", err));

// Middleware de CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",  // Se puede usar una variable de entorno para esto
    credentials: true,
  })
);

// Middleware de JSON
app.use(express.json());

// Middleware de sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || "default_session_secret",  // Si no tienes esta variable, pon un valor por defecto
  resave: false,
  saveUninitialized: false,
}));

// Inicializar Passport y usar sesiones
app.use(passport.initialize());
app.use(passport.session());

// Usar las rutas de autenticación
app.use("/auth", authRoutes);

// Configuración para producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist', 'client')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'client', 'index.html'));
  });
}

// Configuración del puerto y host
const PORT = process.env.EXPRESS_PORT || 5000;
const HOST = process.env.EXPRESS_HOST || 'localhost';

// Inicio del servidor
app.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});

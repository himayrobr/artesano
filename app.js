const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./backend/middleware/passportConfig"); // Configuración de Passport
const authRoutes = require("./backend/routes/authRoutes"); // Rutas de autenticación
const cors = require("cors");
require("dotenv").config();

const app = express();

// Configuración de headers de seguridad para prevenir problemas con las políticas de permisos
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "interest-cohort=(), otp-credentials=(), shared-storage=()");
  res.setHeader("Origin-Agent-Cluster", "?1");
  next();
});

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conectado a la base de datos"))
  .catch(err => console.log("Error al conectar a la base de datos:", err));

// Middleware de CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Cambiar si es necesario
    credentials: true, // Habilitar credenciales para manejar cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware de JSON
app.use(express.json());

// Middleware de sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || "default_session_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Solo en producción
    maxAge: 1000 * 60 * 60 * 24, // Duración de la sesión: 1 día
  },
}));

// Inicializar Passport y usar sesiones
app.use(passport.initialize());
app.use(passport.session());

// Usar las rutas de autenticación
app.use("/auth", authRoutes);

// Configuración para producción (sirve archivos estáticos de React)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist", "client")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "client", "index.html"));
  });
}

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

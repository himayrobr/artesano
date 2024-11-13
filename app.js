const express = require("express");
const path = require("path");
require("dotenv").config();
const connect = require("./backend/helpers/connect");
const cors = require("cors");
const session = require("express-session");
const passport = require("./backend/middleware/passportConfig");

// Conexión a la base de datos MongoDB
connect();

// Inicialización de Express
const app = express();

// Middleware de CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Middleware de JSON
app.use(express.json());

// Middleware de sesiones para Passport (autenticación)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// Inicializar Passport y usar sesiones
app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación
const authRoutes = require("./backend/routes/authRoutes");
app.use("/auth", authRoutes);

// Configuración del puerto y servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));

/**
 * @fileoverview Configuración principal del servidor Express y Socket.io
 * @requires express, socket.io, passport, cors
 */

const express = require("express");
const path = require("path");
require("dotenv").config();
const connect = require("./backend/helpers/connect");
const cors = require("cors");
const session = require("express-session");
const passport = require("./backend/middleware/passportConfig");
const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");

// ! Importante: Asegúrate de que la conexión a la base de datos esté establecida antes de iniciar el servidor
connect();

// * Inicialización de Express y configuración del servidor HTTP
const app = express();
const server = http.createServer(app);

// * Configuración de Socket.io con CORS para el frontend
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// * Middlewares de Seguridad
// ? Headers de seguridad para prevenir tracking y mejorar la privacidad
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "interest-cohort=(), otp-credentials=(), shared-storage=()");
  res.setHeader("Origin-Agent-Cluster", "?1");
  next();
});

// * Configuración de CORS
// ? Permite solicitudes desde el frontend y configura los métodos HTTP permitidos
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// * Middleware para parsear JSON en las solicitudes
app.use(express.json());

// * Configuración de Sesiones
// ? Configura las cookies de sesión y sus opciones de seguridad
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // ! Previene ataques XSS
      secure: process.env.NODE_ENV === "production", // ! Requiere HTTPS en producción
      maxAge: 1000 * 60 * 60 * 24, // ? 24 horas de duración
    },
  })
);

// * Inicialización de Passport para autenticación
app.use(passport.initialize());
app.use(passport.session());

// * Importación de Rutas
// ? Cada módulo maneja una funcionalidad específica de la aplicación
const workshopRoutes = require("./backend/routes/workshopRoutes");
const productRoutes = require("./backend/routes/productRoutes");
const userRoutes = require("./backend/routes/userRoutes");
const orderRoutes = require("./backend/routes/orderRoutes");
const couponRoutes = require("./backend/routes/couponRoutes");
const authRoutes = require("./backend/routes/authRoutes");
const storeRoutes = require("./backend/routes/storeRouter");
const chatRoutes = require("./backend/routes/chatRoutes");

// * Configuración de Rutas
// ? Prefijos para cada grupo de endpoints
app.use("/store", storeRoutes);
app.use("/workshops", workshopRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/coupons", couponRoutes);
app.use("/auth", authRoutes);
app.use("/api", chatRoutes); // ? Endpoints para el chat

// * Configuración de Socket.io para Chat en Tiempo Real
app.set("io", io);
io.on("connection", (socket) => {
  console.log('🔌 Usuario conectado al chat:', socket.id);

  // Agregar log para todos los eventos recibidos
  socket.onAny((eventName, ...args) => {
    console.log('📨 Evento recibido:', eventName, 'con datos:', args);
  });

  socket.on("message", (data) => {
    try {
      // Debug logs
      console.log('🎯 Evento message recibido');
      console.log('📝 Datos raw:', data);
      
      // Log principal del mensaje
      console.log('💬 Mensaje enviado:', {
        texto: data.contenido,
        remitente: data.remitenteId,
        receptor: data.receptorId,
        timestamp: new Date().toLocaleTimeString()
      });
    } catch (error) {
      console.error('❌ Error al procesar mensaje:', error);
    }
    
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log('👋 Usuario desconectado del chat:', socket.id);
  });
});

// Debug adicional
io.on("error", (error) => {
  console.error('❌ Error en Socket.IO:', error);
});

// * Configuración de Archivos Estáticos
// ? Configura el directorio para subida de archivos
app.use("/uploads", express.static("uploads"));
const uploadDir = "uploads/profile-photos";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// * Configuración para Producción
// ? Sirve la aplicación React en producción
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist", "client")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "client", "index.html"));
  });
}

// * Inicialización del Servidor
// ? Configura el puerto y inicia el servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

/**
 * @description Leyenda de Better Comments:
 * ! Advertencias o aspectos críticos de seguridad
 * ? Explicaciones o detalles importantes
 * TODO: Tareas pendientes o mejoras futuras
 * * Secciones principales o configuraciones
 */

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

// Conexión a la base de datos
connect();

// Inicialización de Express
const app = express();

// Crear servidor HTTP y configurar Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware de seguridad
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "interest-cohort=(), otp-credentials=(), shared-storage=()");
  res.setHeader("Origin-Agent-Cluster", "?1");
  next();
});

// Middleware de CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Middleware para parsear JSON
app.use(express.json());

// Configuración de sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Cambiar en producción
      maxAge: 1000 * 60 * 60 * 24, // 24 horas
    },
  })
);

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas de la aplicación
const workshopRoutes = require("./backend/routes/workshopRoutes");
const productRoutes = require("./backend/routes/productRoutes");
const userRoutes = require("./backend/routes/userRoutes");
const orderRoutes = require("./backend/routes/orderRoutes");
const couponRoutes = require("./backend/routes/couponRoutes");
const authRoutes = require("./backend/routes/authRoutes");
const storeRoutes = require("./backend/routes/storeRouter");
const chatRoutes = require("./backend/routes/chatRoutes");

app.use("/store", storeRoutes);
app.use("/workshops", workshopRoutes);
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);
app.use("/coupons", couponRoutes);
app.use("/auth", authRoutes);
app.use("/api", chatRoutes); // Ruta del chat

// Socket.io para chat en tiempo real
app.set("io", io);
io.on("connection", (socket) => {
  socket.on("sendMessage", (message) => {
    console.log("Mensaje recibido:", message);
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

// Configurar directorio de subida de archivos
app.use("/uploads", express.static("uploads"));
const uploadDir = "uploads/profile-photos";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Servir React en producción
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist", "client")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "client", "index.html"));
  });
}

// Configuración del puerto
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./backend/middleware/passportConfig");
const authRoutes = require("./backend/routes/authRoutes");
const cors = require("cors");
const http = require("http"); // Necesario para Socket.io
const { Server } = require("socket.io"); // Servidor de Socket.io
require("dotenv").config();

const app = express();
const server = http.createServer(app); // Crear un servidor HTTP para Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Configuración de headers de seguridad
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "interest-cohort=(), otp-credentials=(), shared-storage=()");
  res.setHeader("Origin-Agent-Cluster", "?1");
  next();
});

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conectado a la base de datos"))
  .catch(err => console.log("Error al conectar a la base de datos:", err));

// Middleware de CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Configuración de sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || "default_session_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24,
  },
}));

// Inicializar Passport y usar sesiones
app.use(passport.initialize());
app.use(passport.session());

// Usar rutas de autenticación
app.use("/auth", authRoutes);

// Socket.io para chat en tiempo real
io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  // Recibir mensajes del cliente
  socket.on("sendMessage", (message) => {
    console.log("Mensaje recibido:", message);
    io.emit("receiveMessage", message); // Enviar el mensaje a todos los clientes conectados
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

// Servir archivos estáticos de React en producción
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist", "client")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "client", "index.html"));
  });
}

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

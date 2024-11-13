const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./backend/middleware/passportConfig"); // Asegúrate de que la ruta sea correcta
const authRoutes = require("./backend/routes/authRoutes"); // Rutas de autenticación
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app); // Crear servidor HTTP
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

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
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Se puede usar una variable de entorno para esto
    credentials: true, // Esto es importante para que las cookies se envíen correctamente
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Middleware de JSON
app.use(express.json());

// Middleware de sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || "default_session_secret", // Si no tienes esta variable, pon un valor por defecto
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, // Esto asegura que las cookies sean solo accesibles por el servidor
    secure: process.env.NODE_ENV === "production", // Solo en producción
    maxAge: 1000 * 60 * 60 * 24, // Duración de la sesión: 1 día
  },
}));

// Inicializar Passport y usar sesiones
app.use(passport.initialize());
app.use(passport.session());

// Usar las rutas de autenticación
app.use("/auth", authRoutes);

// Configuración para producción
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist", "client")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "client", "index.html"));
  });
}

// Configuración de Socket.IO para el chat
let messages = []; // Array temporal para almacenar mensajes

io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  // Enviar todos los mensajes almacenados cuando un usuario se conecta
  socket.emit("chat history", messages);

  // Escuchar mensajes desde el frontend
  socket.on("chat message", (msg) => {
    console.log("Mensaje recibido del frontend:", msg);
    const message = { id: socket.id, text: msg };
    messages.push(message);
    
    // Enviar el mensaje a todos los usuarios conectados
    io.emit("chat message", message);
  });

  // Escuchar desconexión
  socket.on("disconnect", () => {
    console.log("Usuario desconectado:", socket.id);
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

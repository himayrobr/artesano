const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./backend/middleware/passportConfig");
const authRoutes = require("./backend/routes/authRoutes");
const chatRoutes = require("./backend/routes/chatRoutes"); // Importar rutas del chat
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();


const app = express();
const server = http.createServer(app);
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
app.set('io', io); 

// Usar rutas de autenticación y chat
app.use("/auth", authRoutes);
app.use("/api", chatRoutes); // Ruta del chat configurada como "/api/chat"

// Socket.io para chat en tiempo real
io.on("connection", (socket) => {

  socket.on("sendMessage", (message) => {
    console.log("Mensaje recibido:", message);
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
  });
});

// Servir archivos estáticos de React en producción
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist", "client")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "client", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

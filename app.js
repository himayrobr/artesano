const express = require("express");
const path = require("path");
require("dotenv").config();
const connect = require("./backend/helpers/connect");
const cors = require("cors");
const session = require("express-session");
const passport = require("./backend/middleware/passportConfig");

const workshopRoutes = require('./backend/routes/workshopRoutes');
const productRoutes = require('./backend/routes/productRoutes');
const userRoutes = require('./backend/routes/userRoutes');    
const orderRoutes = require('./backend/routes/orderRoutes');
const couponRoutes = require('./backend/routes/couponRoutes'); 
const storeRoutes = require('./backend/routes/storeRouter');
const chatRoutes = require("./backend/routes/chatRoutes"); // Importar rutas del chat
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

// Conexión a la base de datos
connect();
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("Conectado a la base de datos"))
//   .catch(err => console.log("Error al conectar a la base de datos:", err));

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

// Configuración de headers de seguridad para prevenir problemas con las políticas de permisos
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

// Middleware de JSON
app.use(express.json());

// Rutas de la aplicación
app.use('/store', storeRoutes);
app.use('/workshops', workshopRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/coupons', couponRoutes);

// Rutas de autenticación
const authRoutes = require("./backend/routes/authRoutes");
app.use("/auth", authRoutes);
app.use("/api", chatRoutes); // Ruta del chat configurada como "/api/chat"

// Configuración de sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // En desarrollo esto debe ser false
      maxAge: 1000 * 60 * 60 * 24, // 24 horas
    },
  })
);

// Inicializar Passport y usar sesiones
app.use(passport.initialize());
app.use(passport.session());

app.set('io', io); 

// Socket.io para chat en tiempo real
io.on("connection", (socket) => {
  socket.on("sendMessage", (message) => {
    console.log("Mensaje recibido:", message);
    io.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

// Servir archivos estáticos de React en producción
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist", "client")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "client", "index.html"));
  });
}

// Configuración del puerto y servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

app.use('/uploads', express.static('uploads'));

// Crear directorio si no existe
const fs = require('fs');
const uploadDir = 'uploads/profile-photos';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

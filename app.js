const express = require("express");
const path = require("path");
require("dotenv").config();
const connect = require("./backend/helpers/connect");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("./backend/middleware/passportConfig");

const workshopRoutes = require('./backend/routes/workshopRoutes');
const productRoutes = require('./backend/routes/productRoutes');
const userRoutes = require('./backend/routes/userRoutes');
const orderRoutes = require('./backend/routes/orderRoutes');
const couponRoutes = require('./backend/routes/couponRoutes');
const cartRoutes = require('./backend/routes/cartRoutes');
const storeRoutes = require('./backend/routes/storeRouter');
//claro ineidy 
connect();
//easy cherry
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

// Configuración de headers de seguridad para prevenir problemas con las políticas de permisos
app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "interest-cohort=(), otp-credentials=(), shared-storage=()");
  res.setHeader("Origin-Agent-Cluster", "?1");
  next();
});

// Middleware de JSON
app.use(express.json());

app.use('/store', storeRoutes)
app.use('/workshops', workshopRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes );
app.use('/orders', orderRoutes );
app.use('/coupons', couponRoutes );
app.use('/cart', cartRoutes);

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

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Rutas de autenticación
const authRoutes = require("./backend/routes/authRoutes");
app.use('/auth', authRoutes)

// Configuración del puerto y servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));

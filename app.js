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
const cartRoutes = require('./backend/routes/cartRoutes');
const storeRoutes = require('./backend/routes/storeRouter');

// Conexión a la base de datos
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

// Middleware de JSON
app.use(express.json());

app.use('/store', storeRoutes)
app.use('/workshops', workshopRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes );
app.use('/orders', orderRoutes );
app.use('/coupons', couponRoutes );
app.use('/cart', cartRoutes );


// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'dist', 'client')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'client', 'index.html'));
//   });
// }

// Configuración del puerto y servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));

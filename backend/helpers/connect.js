const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB,
    });
    console.log(`Conectado a la base de datos: ${process.env.MONGO_DB}`);
    return conn.connection.db;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
};

module.exports = connectDB;

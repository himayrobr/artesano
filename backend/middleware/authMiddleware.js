const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) return res.status(401).json({ mensaje: 'Acceso denegado. Falta el token de autenticación.' });

  const token = authHeader.split(' ')[1]; // Extrae el token después de 'Bearer '

  if (!token) return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ mensaje: 'Token no válido.' });
  }
};

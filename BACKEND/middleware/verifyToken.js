// backend/middleware/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // adjuntamos los datos del usuario al request
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: 'Token inválido o expirado.' });
  }
};

module.exports = verifyToken;

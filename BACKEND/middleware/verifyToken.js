// backend/middleware/verifyToken.js
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Aseguramos que req.usuario.id sea un ObjectId válido (útil para queries)
    req.usuario = {
      id: new mongoose.Types.ObjectId(decoded.id),
      rol: decoded.rol
    };

    next();
  } catch (error) {
    return res.status(403).json({ mensaje: 'Token inválido o expirado.' });
  }
};

module.exports = verifyToken;

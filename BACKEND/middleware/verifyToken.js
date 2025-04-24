const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('Headers recibidos:', req.headers);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('Token no proporcionado o malformado');
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      console.error('El token ha expirado');
      return res.status(403).json({ mensaje: 'Token expirado' });
    }

    req.usuario = {
      id: new mongoose.Types.ObjectId(decoded.id),
      rol: decoded.rol,
    };

    console.log('Token válido. Usuario:', req.usuario);
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(403).json({ mensaje: 'Token inválido o expirado.' });
  }
};

module.exports = verifyToken;

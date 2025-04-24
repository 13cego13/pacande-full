// middleware/checkAdmin.js
const checkAdmin = (req, res, next) => {
    if (req.user && req.user.rol === 'admin') {
      return next();
    }
    return res.status(403).json({ message: 'Acceso denegado' });
  };
  
  module.exports = checkAdmin;
  
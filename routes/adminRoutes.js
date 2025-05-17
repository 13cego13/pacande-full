const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken'); // Verifica que el usuario esté logueado
const verifyAdmin = require('../middleware/verifyAdmin'); // Verifica que el usuario tenga rol de admin
const {
  obtenerTodosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
} = require('../controllers/adminController');

router.get('/usuarios', verifyToken, verifyAdmin, obtenerTodosUsuarios);
router.get('/usuarios/:id', verifyToken, verifyAdmin, obtenerUsuarioPorId);
router.put('/usuarios/:id', verifyToken, verifyAdmin, actualizarUsuario);
router.delete('/eliminar-usuario/:id', verifyToken, verifyAdmin, eliminarUsuario);

module.exports = router;

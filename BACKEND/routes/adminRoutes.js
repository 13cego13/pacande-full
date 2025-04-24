const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken'); // Verifica que el usuario esté logueado
const verifyAdmin = require('../middleware/verifyAdmin'); // Verifica que el usuario tenga rol de admin
const checkAdmin = require('../middleware/checkAdmin');
const {
  obtenerTodosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
} = require('../controllers/adminController'); // Controlador para manejar la lógica de los usuarios

router.use(checkAdmin); // Verifica que el usuario sea admin en todas las rutas de admin

router.get('/dashboard', (req, res) => {
  res.json({ message: 'Dashboard de admin' });
});


// Obtener todos los usuarios (solo admin)
router.get('/usuarios', verifyToken, verifyAdmin, obtenerTodosUsuarios);

// Obtener un usuario por ID (solo admin)
router.get('/usuarios/:id', verifyToken, verifyAdmin, obtenerUsuarioPorId);

// Actualizar un usuario por ID (solo admin)
router.put('/usuarios/:id', verifyToken, verifyAdmin, actualizarUsuario);

// Eliminar un usuario por ID (solo admin)
router.delete('/eliminar-usuario/:id', verifyToken, verifyAdmin, eliminarUsuario);

module.exports = router;

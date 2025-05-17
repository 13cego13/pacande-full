const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario, actualizarPerfil, obtenerPerfil, cambiarContrasena } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken'); 

router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);
router.put('/actualizar', verifyToken, actualizarPerfil);
router.get('/perfil', verifyToken, obtenerPerfil);
router.put('/cambiar-contrasena', verifyToken, cambiarContrasena);


module.exports = router;

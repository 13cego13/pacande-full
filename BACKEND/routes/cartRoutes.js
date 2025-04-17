// backend/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { agregarAlCarrito, obtenerCarrito, eliminarDelCarrito } = require('../controllers/cartController');
const verifyToken = require('../middleware/verifyToken');

// Rutas del carrito
router.post('/agregar', verifyToken, agregarAlCarrito); // Agregar al carrito
router.get('/', verifyToken, obtenerCarrito);           // Obtener carrito
router.delete('/eliminar/:productoId', verifyToken, eliminarDelCarrito); // Eliminar producto del carrito

module.exports = router;

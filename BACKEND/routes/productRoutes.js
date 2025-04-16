const express = require('express');
const {
  createProduct,
  getProducts,
  updateProduct, // Importa la función de actualizar producto
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

// Rutas de productos
router.post('/products/create', createProduct);
router.get('/products', getProducts);
router.put('/products/:id', updateProduct); // Ruta para actualizar el producto
router.delete('/products/:id', deleteProduct);


module.exports = router;

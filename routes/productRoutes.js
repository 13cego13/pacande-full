const express = require('express');
const {
  createProduct,
  getProducts,
  updateProduct, 
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

// Rutas de productos
router.post('/products/create', createProduct);
router.get('/products', getProducts);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);


module.exports = router;

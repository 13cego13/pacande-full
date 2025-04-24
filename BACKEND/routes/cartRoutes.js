// backend/routes/cartRoutes.js
const verifyToken = require('../middleware/verifyToken'); // Asegúrate de que la ruta sea correcta
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Ajusta según tu modelo

// Ruta para agregar productos al carrito
router.post('/agregar',verifyToken, async (req, res) => {
  const { productId, quantity, title, price, image, description } = req.body;
  const userId = req.usuario.id; 

  try {
    // Lógica para agregar el producto al carrito
    const cart = await Cart.findOne({ userId }); // Busca el carrito del usuario
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }


    // Verifica si el producto ya está en el carrito
const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

if (productIndex > -1) {
  cart.items[productIndex].quantity += quantity;
} else {
  cart.items.push({ productId, title, price, image, description, quantity });
}

    await cart.save(); // Guarda los cambios
    res.status(200).json(cart); // Responde con el carrito actualizado
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar al carrito' });
  }
});

module.exports = router;
    
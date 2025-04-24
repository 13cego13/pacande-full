const Cart = require('../models/Cart');

// Agregar producto al carrito
const agregarAlCarrito = async (req, res) => {
  const { productId, title, price, image, description, quantity } = req.body;

  if (!productId || !title || !price || !quantity) {
    return res.status(400).json({ mensaje: 'Faltan datos del producto' });
  }

  try {
    let carrito = await Cart.findOne({ userId: req.usuario.id });
    if (!carrito) {
      carrito = new Cart({ userId: req.usuario.id, items: [] });
    }

    const productoExistente = carrito.items.find(item => item.productId.toString() === productId);
    if (productoExistente) {
      productoExistente.quantity += quantity;
    } else {
      carrito.items.push({ productId, title, price, image, description, quantity });
    }

    await carrito.save();
    res.status(200).json({ mensaje: 'Producto agregado al carrito', carrito });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ mensaje: 'Error al agregar al carrito' });
  }
};

// Actualizar la cantidad de un producto en el carrito
const actualizarCantidad = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const carrito = await Cart.findOne({ userId: req.usuario.id });
    if (!carrito) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    const producto = carrito.items.find(item => item.productId.toString() === productId);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado en el carrito' });
    }

    producto.quantity = quantity;
    await carrito.save();

    res.status(200).json({ mensaje: 'Cantidad actualizada', carrito });
  } catch (error) {
    console.error('Error al actualizar la cantidad:', error);
    res.status(500).json({ mensaje: 'Error al actualizar la cantidad' });
  }
};

// Eliminar un producto del carrito
const eliminarDelCarrito = async (req, res) => {
  const { productId } = req.params;

  try {
    const carrito = await Cart.findOne({ userId: req.usuario.id });
    if (!carrito) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    carrito.items = carrito.items.filter(item => item.productId.toString() !== productId);
    await carrito.save();

    res.status(200).json({ mensaje: 'Producto eliminado del carrito', carrito });
  } catch (error) {
    console.error('Error al eliminar el producto del carrito:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el producto del carrito' });
  }
};

module.exports = {
  agregarAlCarrito,
  actualizarCantidad,
  eliminarDelCarrito,
};

// backend/controllers/cartController.js
const User = require('../models/User');
const Product = require('../models/productModel');

// Agregar producto al carrito
const agregarAlCarrito = async (req, res) => {
  const { productoId, cantidad, talla } = req.body;

  try {
    // Verificamos si el producto existe
    const producto = await Product.findById(productoId);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Encontramos al usuario actual
    const usuario = await User.findById(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Buscamos si el producto ya está en el carrito
    const productoExistente = usuario.carrito.find(item => item.producto.toString() === productoId);

    if (productoExistente) {
      // Si el producto ya existe, actualizamos la cantidad
      productoExistente.cantidad += cantidad;
      productoExistente.talla = talla || productoExistente.talla;  // Actualizamos talla si se pasa
    } else {
      // Si no está, lo agregamos al carrito
      usuario.carrito.push({
        producto: productoId,
        cantidad,
        talla
      });
    }

    // Guardamos el carrito actualizado
    await usuario.save();

    res.json({ mensaje: 'Producto agregado al carrito', carrito: usuario.carrito });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al agregar producto al carrito' });
  }
};

// Obtener el carrito del usuario
const obtenerCarrito = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id).populate('carrito.producto');
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuario.carrito);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el carrito' });
  }
};

// Eliminar un producto del carrito
const eliminarDelCarrito = async (req, res) => {
  const { productoId } = req.params;

  try {
    const usuario = await User.findById(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Filtrar el carrito para eliminar el producto
    usuario.carrito = usuario.carrito.filter(item => item.producto.toString() !== productoId);
    await usuario.save();

    res.json({ mensaje: 'Producto eliminado del carrito', carrito: usuario.carrito });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el producto del carrito' });
  }
};

module.exports = {
  agregarAlCarrito,
  obtenerCarrito,
  eliminarDelCarrito
};

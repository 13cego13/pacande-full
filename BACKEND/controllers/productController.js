// backend/controllers/productController.js
const Product = require('../models/productModel');

// Crear un producto
exports.createProduct = async (req, res) => {
    try {
      const { name, description, price, category, subcategory, imageUrl } = req.body; // Incluye subcategoria
      const newProduct = new Product({ name, description, price, category, subcategory, imageUrl });
      await newProduct.save();
      res.status(201).json({ message: 'Producto creado con éxito', product: newProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
  };

// Obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
      const { category, subcategory } = req.query; // Recibe parámetros desde la URL
  
      const filter = {};
      if (category) filter.category = category;
      if (subcategory) filter.subcategory = subcategory;
  
      const products = await Product.find(filter); // Filtra según los parámetros
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
  };

exports.updateProduct = async (req, res) => {
    try {
      const { id } = req.params;  // Obtén el ID del producto desde la URL
      const { name, description, price, category, imageUrl, subcategory } = req.body;
  
      // Busca el producto por ID y actualízalo
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, description, price, category, subcategory, imageUrl },
        { new: true }  // Esto devolverá el producto actualizado
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      res.status(200).json({ message: 'Producto actualizado con éxito', product: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
  };

  exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
  };


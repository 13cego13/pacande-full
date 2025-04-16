// backend/models/productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },  // Categoría principal (ej. "Ropa")
  subcategory: { type: String, required: true },  // Subcategoría (ej. "Hombre", "Mujer")
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

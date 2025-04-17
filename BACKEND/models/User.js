// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, default: 'Usuario' },

  // 🛒 Carrito del usuario
  carrito: [
    {
      producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
      cantidad: { type: Number, default: 1 },
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

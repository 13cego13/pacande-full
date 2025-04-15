// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, default: 'Usuario' } // puedes tener "admin" también
});

module.exports = mongoose.model('User', userSchema);

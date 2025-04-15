const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuario
const registrarUsuario = async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  console.log(req.body); 

  try {
    // Verificar si el usuario ya existe
    let usuarioExistente = await User.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const contraseñaHasheada = await bcrypt.hash(contraseña, salt);

    // Crear nuevo usuario
    const nuevoUsuario = new User({
      nombre,
      correo,
      contraseña: contraseñaHasheada
    });

    // Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    // Responder con éxito
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (err) {
    // Manejo de errores
    console.error('Error al registrar usuario:', err);  // Cambié 'error' por 'err'
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

// Login de usuario
const loginUsuario = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await User.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    const passwordValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!passwordValida) {
      return res.status(400).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });

    res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find().select('-contraseña'); // Seleccionamos todos los usuarios sin la contraseña
    res.json(usuarios);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

// Obtener perfil del usuario autenticado
const obtenerPerfil = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id).select('-contraseña');
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el perfil.' });
  }
};

// Actualizar perfil del usuario
const actualizarPerfil = async (req, res) => {
  const { nombre, correo } = req.body;

  try {
    const usuario = await User.findById(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    // Actualizar campos si se proporcionan
    usuario.nombre = nombre || usuario.nombre;
    usuario.correo = correo || usuario.correo;

    await usuario.save();

    res.json({ mensaje: 'Perfil actualizado correctamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el perfil.' });
  }
};

// Cambiar contraseña del usuario
const cambiarContrasena = async (req, res) => {
  const { contrasenaActual, nuevaContrasena } = req.body;

  if (!nuevaContrasena) {
    return res.status(400).json({ mensaje: 'La nueva contraseña es requerida.' });
  }

  try {
    const usuario = await User.findById(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    const match = await bcrypt.compare(contrasenaActual, usuario.contraseña);
    if (!match) {
      return res.status(400).json({ mensaje: 'Contraseña actual incorrecta.' });
    }

    const salt = await bcrypt.genSalt(10);
    usuario.contraseña = await bcrypt.hash(nuevaContrasena, salt);
    await usuario.save();

    res.json({ mensaje: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cambiar la contraseña.' });
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  obtenerPerfil,
  actualizarPerfil,
  cambiarContrasena,
  obtenerUsuarios
};

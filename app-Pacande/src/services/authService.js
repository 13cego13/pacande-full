// src/services/authService.js
const token = localStorage.getItem('token');
const usuario = JSON.parse(localStorage.getItem('usuario'));


const API_URL = 'http://localhost:5000/api/auth'; // Cambia si usas otra ruta

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/registro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al registrar');
  }

  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al iniciar sesión');
  }

  const data = await response.json();

  // Guardar el token en localStorage
  localStorage.setItem('token', data.token);

  // Opcionalmente, guardar también los datos del usuario si es necesario
  localStorage.setItem('usuario', JSON.stringify(data.usuario));

  return data;
};

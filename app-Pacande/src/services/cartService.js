import axios from 'axios';


const API_URL = 'http://localhost:5000/api/carrito'; // Ajusta si usas otra URL/base

const getHeaders = () => {
  const token = localStorage.getItem('token'); // O donde guardes el JWT
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const obtenerCarrito = async () => {
  const res = await axios.get(API_URL, getHeaders());
  return res.data;
};

export const agregarAlCarrito = async (productoId, cantidad) => {
  const res = await axios.post(`${API_URL}/agregar`, { productoId, cantidad }, getHeaders());
  return res.data;
};

export const eliminarDelCarrito = async (productoId) => {
  const res = await axios.put(`${API_URL}/eliminar`, { productoId }, getHeaders());
  return res.data;
};

export const vaciarCarrito = async () => {
  const res = await axios.put(`${API_URL}/vaciar`, {}, getHeaders());
  return res.data;
};

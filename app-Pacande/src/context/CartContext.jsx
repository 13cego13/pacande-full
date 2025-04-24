// src/context/CartContext.jsx

import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { token, logout } = useAuth(); // ⬅️ AÑADIDO logout
  console.log('Token del usuario:', token);

  const manejarErrorToken = (status) => {
    if (status === 401 || status === 403) {
      console.warn('Token expirado o inválido. Cerrando sesión automáticamente...');
      logout(); // ⬅️ Cierra sesión si token inválido
    }
  };

  const getCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        manejarErrorToken(response.status); // ⬅️ Nuevo manejo
        throw new Error('Error al obtener el carrito');
      }

      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error del servidor:', error);
    }
  };

  const addToCart = async (product) => {
    try {
      if (!token) throw new Error('Usuario no autenticado');

      const response = await fetch('http://localhost:5000/api/cart/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        manejarErrorToken(response.status); // ⬅️ Nuevo manejo
        throw new Error('Error al agregar al carrito');
      }

      const data = await response.json();
      setCartItems((prevItems) => [...prevItems, data]);
      console.log('Producto agregado al carrito:', data);
    } catch (error) {
      console.error('Error del servidor:', error);
    }
    
  };
  

  const removeFromCart = async (productId) => {
    try {
      if (!token) throw new Error('Usuario no autenticado');

      const response = await fetch('http://localhost:5000/api/cart/eliminar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        manejarErrorToken(response.status); // ⬅️ Nuevo manejo
        throw new Error('Error al eliminar producto del carrito');
      }

      setCartItems((prevItems) => prevItems.filter(item => item._id !== productId));
      console.log('Producto eliminado del carrito');
    } catch (error) {
      console.error('Error del servidor:', error);
    }
  };

  const clearCart = async () => {
    try {
      if (!token) throw new Error('Usuario no autenticado');

      const response = await fetch('http://localhost:5000/api/cart/vaciar', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        manejarErrorToken(response.status); // ⬅️ Nuevo manejo
        throw new Error('Error al vaciar el carrito');
      }

      setCartItems([]);
      console.log('Carrito vaciado');
    } catch (error) {
      console.error('Error del servidor:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

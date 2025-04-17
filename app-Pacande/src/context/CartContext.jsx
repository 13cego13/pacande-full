import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const CartContext = createContext();

// Hook personalizado para acceder al contexto
export const useCart = () => useContext(CartContext);

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product._id); // Usar _id de MongoDB
      if (existingItem) {
        // Si ya existe, aumentar cantidad
        return prevItems.map(item =>
          item.id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no, agregar un nuevo producto con cantidad 1
        return [...prevItems, { ...product, id: product._id, quantity: 1 }]; // Usar _id de MongoDB
      }
    });
  };

  // Remover un producto del carrito por su id
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id)); // Usar _id para eliminar
  };

  // Vaciar todo el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Actualizar cantidad manualmente
  const updateQuantity = (id, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

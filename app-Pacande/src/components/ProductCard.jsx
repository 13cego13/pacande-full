import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ _id, title, price, image, description }) => {
  const { addToCart } = useCart(); // Hook para agregar al carrito
  const navigate = useNavigate(); // Hook para redirigir a otra página
  const [quantity, setQuantity] = useState(1); // Estado para manejar la cantidad

  // Manejar el evento de agregar al carrito
  const handleAddToCart = async () => {
    try {
      console.log('Datos enviados al contexto:', { _id, title, price, image, description, quantity });
      await addToCart({
        productId: _id,
        title,
        price,
        image,
        description,
        quantity
      });
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  };

  // Manejar el evento de comprar
  const handleBuyNow = async () => {
    try {
      await addToCart({
        productId: _id,
        title,
        price,
        image,
        description,
        quantity
      });
      navigate('/carrito'); // Redirigir a la página del carrito
    } catch (error) {
      console.error('Error al comprar el producto:', error);
    }
  };

  // Manejar el cambio de cantidad
  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(quantity + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        maxWidth: '300px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        position: 'relative',
        backgroundColor: 'white',
      }}
    >
      <img
        src={image || 'http://placekitten.com/300/300'}
        alt={title}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '10px',
        }}
      />
      <h3 style={{ margin: '10px 0' }}>{title}</h3>
      <p>{description}</p>
      <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Precio: ${price.toFixed(2)}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => handleQuantityChange('decrement')}
          style={{
            padding: '4px 8px',
            cursor: 'pointer',
            backgroundColor: '#ddd',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => handleQuantityChange('increment')}
          style={{
            padding: '4px 8px',
            cursor: 'pointer',
            backgroundColor: '#ddd',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          +
        </button>
      </div>
      <button
        onClick={handleAddToCart}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '8px',
        }}
      >
        Agregar al carrito
      </button>
      <button
        onClick={handleBuyNow}
        style={{
          padding: '8px 16px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Comprar
      </button>
    </div>
  );
};

export default ProductCard;

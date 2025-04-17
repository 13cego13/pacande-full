import React, { useState } from 'react';
import styled from '@emotion/styled';
import 'uikit/dist/css/uikit.min.css';
import { FaStar, FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

// Estilos
const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  position: relative;
  color: black;
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: ${props => (props.isFavorite ? 'gold' : '#ccc')};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: gold;
  }
`;

const DiscountLabel = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: red;
  color: white;
  padding: 4px 8px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 0.8rem;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin: 10px 0;
`;

const StarRating = styled.div`
  color: #ffc107;
  font-size: 1.2rem;
  margin: 5px 0;
`;

const PriceContainer = styled.div`
  margin: 10px 0;
`;

const Price = styled.span`
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
`;

const SpecificationsContainer = styled.div`
  text-align: left;
  margin-top: 10px;

  h4 {
    margin-bottom: 5px;
  }

  ul {
    padding-left: 20px;
    color: #555;
  }

  li {
    margin-bottom: 4px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
`;

const BuyButton = styled.button`
  background-color: #00b894;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #019172;
  }
`;

const CartButton = styled.button`
  background-color: #0984e3;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0868c3;
  }
`;

const RemoveButton = styled.button`
  background-color: #d63031;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b71c1c;
  }
`;

// Componente
const ProductCard = ({
  _id, // Usamos _id de MongoDB
  title,
  price,
  image,
  showSizes,
  sizes,
  discount,
  category,
  specifications,
  description,
  showActions = true, // Por defecto se muestran acciones
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const { addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSizeClick = (size) => {
    if (Array.isArray(sizes)) {
      setSelectedSize(size === selectedSize ? null : size);
    }
  };

  const imageUrl = image || 'http://placekitten.com/500/500';

  const handleAddToCart = () => {
    const product = {
      _id,  // Usamos _id aquí
      title,
      price,
      image,
      description,
      category,
      size: selectedSize,
    };

    addToCart(product);
    setCartCount(cartCount + 1);
  };

  const handleBuyNow = () => {
    const product = {
      _id,  // Usamos _id aquí también
      title,
      price,
      image,
      description,
      category,
      size: selectedSize,
    };

    addToCart(product);
    navigate('/carrito');
  };

  const handleRemoveFromCart = () => {
    removeFromCart(_id);  // Usamos _id aquí para eliminar del carrito
  };

  return (
    <Card>
      {showActions && (
        <FavoriteButton isFavorite={isFavorite} onClick={handleFavoriteClick}>
          <FaStar />
        </FavoriteButton>
      )}

      {discount && <DiscountLabel>{discount}% OFF</DiscountLabel>}

      <ProductImage src={imageUrl} alt={title} />
      <ProductTitle>{title}</ProductTitle>

      {description && (
        <p style={{ marginBottom: '10px', color: '#666' }}>{description}</p>
      )}

      {showActions && (
        <StarRating>
          <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
        </StarRating>
      )}

      <PriceContainer>
        <Price>${price}</Price>
      </PriceContainer>

      {category === 'Tecnología' &&
        Array.isArray(specifications) &&
        specifications.length > 0 && (
          <SpecificationsContainer>
            <h4>Especificaciones:</h4>
            <ul>
              {specifications.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </SpecificationsContainer>
        )}

      {showSizes && sizes && (
        <div style={{ marginBottom: '10px' }}>
          <h4>Tallas disponibles:</h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            {sizes.map((size, index) => (
              <button
                key={index}
                style={{
                  padding: '5px 10px',
                  borderRadius: '5px',
                  border:
                    selectedSize === size ? '2px solid red' : '1px solid gray',
                  cursor: 'pointer',
                }}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <ButtonContainer>
        {showActions ? (
          <>
            <BuyButton onClick={handleBuyNow}>Comprar Ahora</BuyButton>
            <CartButton onClick={handleAddToCart}>
              <FaShoppingCart />
              Agregar al Carrito {cartCount > 0 && <span>({cartCount})</span>}
            </CartButton>
          </>
        ) : (
          <RemoveButton onClick={handleRemoveFromCart}>
            <FaTrashAlt />
            Quitar del carrito
          </RemoveButton>
        )}
      </ButtonContainer>
    </Card>
  );
};

export default ProductCard;

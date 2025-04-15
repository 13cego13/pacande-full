import React, { useState } from 'react';
import styled from '@emotion/styled';
import 'uikit/dist/css/uikit.min.css';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

const Card = styled.div`
  background-color: white;
  border-radius: 0px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  position: relative;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.03);
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${({ isFavorite }) => (isFavorite ? '#ff0000' : '#808080')};
  transition: color 0.3s ease;
  z-index: 2;
  &:hover {
    color: ${({ isFavorite }) => (isFavorite ? '#cc0000' : '#ff0000')};
  }
  &:focus {
    outline: none;
  }
`;

const DiscountLabel = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff0000;
  color: white;
  padding: 5px 10px;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 5px;
  z-index: 2;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: transform 0.3s ease;
  z-index: 1;
  &:hover {
    transform: scale(1.1);
    z-index: 0;
  }
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

const StarRating = styled.div`
  color: #ffc107;
  margin-bottom: 10px;
`;

const PriceContainer = styled.div`
  margin-bottom: 10px;
`;

const Price = styled.span`
  font-size: 1.2rem;
  color: #ff0000;
  font-weight: bold;
`;

const SpecificationsContainer = styled.div`
  margin: 15px 0;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 80px;
`;

const BuyButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #ff0000;
  color: white;
  cursor: pointer;
  border-radius: 0px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #cc0000;
  }
`;

const CartButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #ff0000;
  color: white;
  cursor: pointer;
  border-radius: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #cc0000;
  }
`;

const ProductCard = ({ title, price, image, showSizes, sizes, discount, category, specifications }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSizeClick = (size) => {
    if (selectedSize === size) {
      setSelectedSize(null);
    } else {
      setSelectedSize(size);
    }
  };

  return (
    <Card>
      <FavoriteButton isFavorite={isFavorite} onClick={handleFavoriteClick}>
        <FaStar />
      </FavoriteButton>
      {discount && <DiscountLabel>50% OFF</DiscountLabel>}
      <ProductImage src={image} alt={title} />
      <ProductTitle>{title}</ProductTitle>
      <StarRating>
        <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
      </StarRating>
      <PriceContainer>
        <Price>{price}</Price>
      </PriceContainer>

      {category === "Tecnología" && specifications && (
        <SpecificationsContainer>
          <h4>Especificaciones:</h4>
          <ul>
            {specifications.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        </SpecificationsContainer>
      )}

      <ButtonContainer>
        <BuyButton>Comprar Ahora</BuyButton>
        <CartButton>
          <FaShoppingCart />
          Agregar al Carrito
        </CartButton>
      </ButtonContainer>
    </Card>
  );
};

export default ProductCard;

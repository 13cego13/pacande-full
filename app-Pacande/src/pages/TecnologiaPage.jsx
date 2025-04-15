import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import Sidebar from '../components/Sidebar';
import { fetchExchangeRates, convertCurrency } from '../services/CurrencyService';

// Importar las imágenes
import iphone13Image from '../images/iphone13.jpg';
import samsungGalaxyS21Image from '../images/Samsung Galaxy S21.jpg';
import xiaomiMi11Image from '../images/Xiaomi Mi 11.jpg';
import onePlus9Image from '../images/OnePlus 9.jpg';
import googlePixel6Image from '../images/Google Pixel 6.jpg';
import motorolaEdge20LiteImage from '../images/motorola edge 20 lite.jpg'; // Nueva imagen

// Estilos
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  color: white;
  background-color: #ffffff;
`;

const MainContent = styled.div`
  flex-grow: 1;
  margin: 120px 0;
  text-align: center;
  width: 100%;
`;

const SectionTitle = styled.h2`
  margin-bottom: 15px;
  color: #000000;
`;

const BorderedContainer = styled.div`
  padding: 20px;
  border-radius: 0px;
  display: inline-block;
  width: 100%;
  max-width: 1200px;
  background: rgba(192, 192, 192, 0.5);
  border: 1px solid rgba(97, 106, 107, 0.3);
`;

// Lista de productos con las imágenes actualizadas
const tecnologiaProducts = [
  {
    title: 'iPhone 13',
    price: 3500000,
    image: iphone13Image,
    specs: ['128GB', 'Cámara dual 12MP', 'Pantalla de 6.1 pulgadas'],
    category: 'Celulares'
  },
  {
    title: 'Samsung Galaxy S21',
    price: 2800000,
    image: samsungGalaxyS21Image,
    specs: ['128GB', 'Cámara triple 12MP', 'Pantalla de 6.2 pulgadas'],
    category: 'Celulares'
  },
  {
    title: 'Xiaomi Mi 11',
    price: 2200000,
    image: xiaomiMi11Image,
    specs: ['256GB', 'Cámara triple 108MP', 'Pantalla de 6.81 pulgadas'],
    category: 'Celulares'
  },
  {
    title: 'OnePlus 9',
    price: 2500000,
    image: onePlus9Image,
    specs: ['128GB', 'Cámara triple 48MP', 'Pantalla de 6.55 pulgadas'],
    category: 'Celulares'
  },
  {
    title: 'Google Pixel 6',
    price: 2700000,
    image: googlePixel6Image,
    specs: ['128GB', 'Cámara dual 50MP', 'Pantalla de 6.4 pulgadas'],
    category: 'Celulares'
  },
  {
    title: 'Motorola Edge 20 Lite', // Nuevo producto
    price: 1900000,
    image: motorolaEdge20LiteImage,
    specs: ['128GB', 'Cámara triple 108MP', 'Pantalla de 6.7 pulgadas'],
    category: 'Celulares'
  }
];

const TecnologiaPage = () => {
  const location = useLocation();
  const [currency, setCurrency] = useState('COP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredTecnologia, setFilteredTecnologia] = useState(tecnologiaProducts);

  useEffect(() => {
    const fetchRates = async () => {
      const rates = await fetchExchangeRates();
      if (rates) {
        setExchangeRates(rates);
      }
    };
    fetchRates();
  }, []);

  const convertPrice = (price) => {
    if (currency === 'COP') return price;
    if (currency === 'MXN') return convertCurrency(price, exchangeRates['MXN']);
    if (currency === 'USD') return convertCurrency(price, exchangeRates['USD']);
    if (currency === 'EUR') return convertCurrency(price, exchangeRates['EUR']);
    return price;
  };

  const renderSection = (category) => {
    const filteredProducts = filteredTecnologia.filter(product => product.category === category);
    return (
      <>
        <SectionTitle>{category}</SectionTitle>
        <BorderedContainer>
          <ProductGallery 
            products={filteredProducts.map(product => ({
              ...product,
              price: convertPrice(product.price)
            }))} 
            showSpecs={true} 
          />
        </BorderedContainer>
      </>
    );
  };

  return (
    <Container>
      <Sidebar currency={currency} setCurrency={setCurrency} />
      <MainContent>
        {renderSection('Celulares')}
      </MainContent>
    </Container>
  );
};

export default TecnologiaPage;


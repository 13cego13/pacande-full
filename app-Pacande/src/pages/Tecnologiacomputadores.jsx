// src/pages/ComputadoresPage.js
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import Sidebar from '../components/Sidebar'; // Importa el componente de barra lateral
import { fetchExchangeRates, convertCurrency } from '../services/CurrencyService';
import hpPavilionImage from '../images/Laptop HP Pavilion.jpg';
import macbookProImage from '../images/MacBook Pro.jpg';
import acerNitro5Image from '../images/Portatil Acer Nitro 5.jpg';
import dellInspironImage from '../images/Computadora de escritorio Dell Inspiron.jpg';
import gamingPCImage from '../images/PC para juegos.jpg';
import imacImage from '../images/iMac.jpg';
import samsungMonitorImage from '../images/Monitor Samsung de 24.jpg';
import lgUltraWideImage from '../images/Monitor LG UltraWide.jpg';
import ultraGearMonitorImage from '../images/Monitor Gamer UltraGear.jpg';

// Estilos del contenedor principal
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
const computadoresProducts = [
  // Laptops
  { 
    title: 'Laptop HP Pavilion', 
    price: 2500000, 
    image: hpPavilionImage, 
    specs: ['Intel i5', '8GB RAM', '256GB SSD'], 
    discount: false, 
    category: 'Laptops' 
  },
  { 
    title: 'MacBook Pro', 
    price: 6000000, 
    image: macbookProImage, 
    specs: ['Apple M1', '8GB RAM', '512GB SSD'], 
    discount: true, 
    category: 'Laptops' 
  },
  { 
    title: 'Portátil Acer Nitro 5', 
    price: 4200000, 
    image: acerNitro5Image, 
    specs: ['Intel i7', '16GB RAM', '512GB SSD'], 
    discount: true, 
    category: 'Laptops' 
  },
  // Escritorios
  { 
    title: 'Computadora de escritorio Dell Inspiron', 
    price: 1500000, 
    image: dellInspironImage, 
    specs: ['Intel i3', '4GB RAM', '1TB HDD'], 
    discount: false, 
    category: 'Escritorios' 
  },
  { 
    title: 'PC para juegos', 
    price: 4500000, 
    image: gamingPCImage, 
    specs: ['Intel i7', '16GB RAM', '512GB SSD + 1TB HDD'], 
    discount: true, 
    category: 'Escritorios' 
  },
  { 
    title: 'iMac', 
    price: 7500000, 
    image: imacImage, 
    specs: ['Apple M1', '8GB RAM', '512GB SSD'], 
    discount: false, 
    category: 'Escritorios' 
  },
  // Monitores
  { 
    title: 'Monitor Samsung 24', 
    price: 600000, 
    image: samsungMonitorImage, 
    specs: ['24 pulgadas', 'Full HD'], 
    discount: false, 
    category: 'Monitores' 
  },
  { 
    title: 'Monitor LG UltraWide', 
    price: 1200000, 
    image: lgUltraWideImage, 
    specs: ['29 pulgadas', 'UltraWide', 'Full HD'], 
    discount: true, 
    category: 'Monitores' 
  },
  { 
    title: 'Monitor Gamer UltraGear', 
    price: 1800000, 
    image: ultraGearMonitorImage, 
    specs: ['27 pulgadas', 'QHD', '144Hz'], 
    discount: true, 
    category: 'Monitores' 
  }
];

const ComputadoresPage = () => {
  const location = useLocation();
  const [currency, setCurrency] = useState('COP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredComputadores, setFilteredComputadores] = useState(computadoresProducts);

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
    const filteredProducts = filteredComputadores.filter(product => product.category === category);
    return (
      <>
        <SectionTitle>{category}</SectionTitle>
        <BorderedContainer>
          <ProductGallery 
            products={filteredProducts.map(product => ({
              ...product,
              price: convertPrice(product.price)
            }))}
            showSizes={false} 
          />
        </BorderedContainer>
      </>
    );
  };

  return (
    <Container>
      <Sidebar currency={currency} setCurrency={setCurrency} /> {/* Componente Sidebar */}

      <MainContent>
        {renderSection('Laptops')}
        {renderSection('Escritorios')}
        {renderSection('Monitores')}
      </MainContent>
    </Container>
  );
};

export default ComputadoresPage;

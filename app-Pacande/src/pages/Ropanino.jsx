import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import Sidebar from '../components/Sidebar';
import { fetchExchangeRates, convertCurrency } from '../services/CurrencyService';

// Importación de imágenes para niños
import CamisetaAzulNino from '../images/CamisetaAzulNino.jpg';
import CamisetaRojaNino from '../images/CamisetaRojaNino.jpg';
import CamisetaAmarillaNino from '../images/CamisetaAmarillaNino.jpg';


import PantalonNegroNino from '../images/PantalonNegroNino.jpg';
import PantalonVerdeNino from '../images/PantalonVerdeNino.jpg';
import PantalonDeportivoNino from '../images/PantalonDeportivoNino.jpg';

import ChaquetaRojaNino from '../images/ChaquetaRojaNino.jpg';
import ChaquetaGrisNino from '../images/ChaquetaGrisNino.jpg';
import ChaquetaDeportivaNino from '../images/ChaquetaDeportivaNino.jpg';

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

const ropaNiñoProducts = [
  // Camisetas
  { title: 'Camiseta Azul Niño', price: 50000, image: CamisetaAzulNino, sizes: ['2T', '3T', '4T', '5', '6'], discount: false, category: 'Camisetas' },
  { title: 'Camiseta Roja Niño', price: 50000, image: CamisetaRojaNino, sizes: ['2T', '3T', '4T', '5', '6'], discount: true, category: 'Camisetas' },
  { title: 'Camiseta Amarilla Niño', price: 50000, image: CamisetaAmarillaNino, sizes: ['2T', '3T', '4T', '5', '6'], discount: false, category: 'Camisetas' },

  // Pantalones
  { title: 'Pantalón Negro Niño', price: 120000, image: PantalonNegroNino, sizes: ['2T', '3T', '4T', '5', '6'], discount: false, category: 'Pantalones' },
  { title: 'Pantalón Verde Niño', price: 120000, image: PantalonVerdeNino, sizes: ['2T', '3T', '4T', '5', '6'], discount: false, category: 'Pantalones' },
  { title: 'Pantalón Deportivo Niño', price: 130000, image: PantalonDeportivoNino, sizes: ['2T', '3T', '4T', '5', '6'], discount: true, category: 'Pantalones' },

  // Chaquetas
  { title: 'Chaqueta Roja Niño', price: 180000, image: ChaquetaRojaNino, sizes: ['2T', '3T', '4T', '5', '6'], discount: true, category: 'Chaquetas' },
  { title: 'Chaqueta Gris Niño', price: 190000, image: ChaquetaGrisNino, sizes: ['2T', '3T', '4T', '5', '6'], discount: false, category: 'Chaquetas' },
  { title: 'Chaqueta Deportiva Niño', price: 200000, image: ChaquetaDeportivaNino, sizes: ['2T', '3T', '4T', '5', '6'], discount: true, category: 'Chaquetas' },
];

const RopaNiñoPage = () => {
  const location = useLocation();
  const [currency, setCurrency] = useState('COP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredRopaNiño, setFilteredRopaNiño] = useState(ropaNiñoProducts);

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
    const filteredProducts = filteredRopaNiño.filter(product => product.category === category);
    return (
      <>
        <SectionTitle>{category}</SectionTitle>
        <BorderedContainer>
          <ProductGallery 
            products={filteredProducts.map(product => ({
              ...product,
              price: convertPrice(product.price)
            }))} 
            showSizes={true} 
          />
        </BorderedContainer>
      </>
    );
  };

  return (
    <Container>
      <Sidebar currency={currency} setCurrency={setCurrency} />

      <MainContent>
        {renderSection('Camisetas')}
        {renderSection('Pantalones')}
        {renderSection('Chaquetas')}
      </MainContent>
    </Container>
  );
};

export default RopaNiñoPage;

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import Sidebar from '../components/Sidebar';
import { fetchExchangeRates, convertCurrency } from '../services/CurrencyService';

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
  { title: 'Camiseta Azul Niño', price: 50000, image: 'https://via.placeholder.com/150x150?text=Camiseta+Azul+Niño', sizes: ['2T', '3T', '4T', '5', '6'], discount: false, category: 'Camisetas' },
  { title: 'Pantalón Niño', price: 120000, image: 'https://via.placeholder.com/150x150?text=Pantalón+Niño', sizes: ['2T', '3T', '4T', '5', '6'], discount: false, category: 'Pantalones' },
  { title: 'Chaqueta Niño', price: 180000, image: 'https://via.placeholder.com/150x150?text=Chaqueta+Niño', sizes: ['2T', '3T', '4T', '5', '6'], discount: true, category: 'Chaquetas' },
  { title: 'Camiseta Roja Niño', price: 50000, image: 'https://via.placeholder.com/150x150?text=Camiseta+Roja+Niño', sizes: ['2T', '3T', '4T', '5', '6'], discount: true, category: 'Camisetas' },
  { title: 'Pantalón Verde Niño', price: 120000, image: 'https://via.placeholder.com/150x150?text=Pantalón+Verde+Niño', sizes: ['2T', '3T', '4T', '5', '6'], discount: false, category: 'Pantalones' },
  { title: 'Chaqueta Gris Niño', price: 180000, image: 'https://via.placeholder.com/150x150?text=Chaqueta+Gris+Niño', sizes: ['2T', '3T', '4T', '5', '6'], discount: true, category: 'Chaquetas' },
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

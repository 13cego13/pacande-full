import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ProductGallery from '../components/ProductGallery';
import Sidebar from '../components/Sidebar';
import { fetchExchangeRates, convertCurrency } from '../services/CurrencyService';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
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

const DecoraPage = () => {
  const [currency, setCurrency] = useState('COP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Hogar');
  const [selectedSubcategory, setSelectedSubcategory] = useState('Decoración');

  useEffect(() => {
    const fetchRates = async () => {
      const rates = await fetchExchangeRates();
      if (rates) setExchangeRates(rates);
    };
    fetchRates();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/products?category=${selectedCategory}&subcategory=${selectedSubcategory}`);
        console.log('Respuesta cruda del backend:', res);
        if (!res.ok) throw new Error('Respuesta no válida del servidor');
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSubcategory]);

  const convertPrice = (price) => {
    if (currency === 'COP') return price;
    const rate = exchangeRates[currency];
    return rate ? convertCurrency(price, rate) : price;
  };

  return (
    <Container>
      <Sidebar 
        currency={currency} 
        setCurrency={setCurrency} 
        setSelectedCategory={setSelectedCategory} 
        setSelectedSubcategory={setSelectedSubcategory} 
      />

      <MainContent>
        <SectionTitle>{selectedCategory} - {selectedSubcategory}</SectionTitle>
        <BorderedContainer>
          <ProductGallery 
            products={products.map(product => ({
              ...product,
              price: convertPrice(product.price),
              image: product.imageUrl, // Asegúrate de que esta propiedad existe
            }))}
            showSizes={true}
          />
        </BorderedContainer>
      </MainContent>
    </Container>
  );
};

export default DecoraPage;

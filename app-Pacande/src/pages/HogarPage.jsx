// src/pages/HogarPage.js
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ProductGallery from '../components/ProductGallery'; // Componente de galería reutilizado
import Sidebar from '../components/Sidebar'; // Sidebar añadido
import { fetchExchangeRates, convertCurrency } from '../services/CurrencyService';

// Estilos del contenedor principal
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;
`;

// Contenedor principal de la sección de productos
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

const HogarPage = () => {
  const [currency, setCurrency] = useState('COP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredMuebles, setFilteredMuebles] = useState([]);

  const selectedCategory = 'Hogar';
  const selectedSubcategory = 'Muebles';

  useEffect(() => {
    const fetchRates = async () => {
      const rates = await fetchExchangeRates();
      if (rates) {
        setExchangeRates(rates);
      }
    };
    fetchRates();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/products?category=${selectedCategory}&subcategory=${selectedSubcategory}`
        );
        if (!res.ok) throw new Error('Error al obtener productos');
        const data = await res.json();
        setFilteredMuebles(data.products);
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
      {/* Sidebar añadido */}
      <Sidebar currency={currency} setCurrency={setCurrency} />

      <MainContent>
        <SectionTitle>{`${selectedCategory} - ${selectedSubcategory}`}</SectionTitle>
        <BorderedContainer>
          <ProductGallery
            products={filteredMuebles.map(product => ({
              ...product,
              price: convertPrice(product.price),
              image: product.imageUrl, // Asegúrate de que las imágenes estén bien definidas en el backend
            }))}
            showSizes={true}
          />
        </BorderedContainer>
      </MainContent>
    </Container>
  );
};

export default HogarPage;

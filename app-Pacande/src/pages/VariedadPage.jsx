import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import Sidebar from '../components/Sidebar';
import { fetchExchangeRates, convertCurrency } from '../services/CurrencyService';

// Importar las imágenes de productos deportivos
import raquetaTenisImage from '../images/raquetaTenis.jpg';
import raquetaTenis2Image from '../images/raquetaTenis2.jpg';
import raquetaTenis3Image from '../images/raquetaTenis3.jpg';

import cascoCiclismoImage from '../images/cascoCiclismo.jpg';
import cascoCiclismo2Image from '../images/cascoCiclismo2.jpg';
import cascoCiclismo3Image from '../images/cascoCiclismo3.jpg';

import guantesBoxeoImage from '../images/guantesBoxeo.jpg';
import guantesBoxeo2Image from '../images/guantesBoxeo2.jpg';
import guantesBoxeo3Image from '../images/guantesBoxeo3.jpg';

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

// Lista de productos deportivos
const varietyProducts = [
  {
    title: 'Raqueta de Tenis',
    price: 450000,
    image: raquetaTenisImage,
    specs: ['Material: Grafito', 'Peso: 300g', 'Tamaño de cabeza: 100 in²'],
    category: 'Tenis'
  },
  {
    title: 'Raqueta de Tenis Avanzada',
    price: 550000,
    image: raquetaTenis2Image,
    specs: ['Material: Carbono', 'Peso: 280g', 'Tamaño de cabeza: 98 in²'],
    category: 'Tenis'
  },
  {
    title: 'Raqueta de Tenis Profesional',
    price: 600000,
    image: raquetaTenis3Image,
    specs: ['Material: Aluminio', 'Peso: 310g', 'Tamaño de cabeza: 105 in²'],
    category: 'Tenis'
  },
  {
    title: 'Casco de Ciclismo',
    price: 250000,
    image: cascoCiclismoImage,
    specs: ['Peso: 250g', 'Tallas: S/M/L', 'Ventilación avanzada'],
    category: 'Ciclismo'
  },
  {
    title: 'Casco de Ciclismo Profesional',
    price: 300000,
    image: cascoCiclismo2Image,
    specs: ['Peso: 220g', 'Tallas: S/M/L', 'Diseño aerodinámico'],
    category: 'Ciclismo'
  },
  {
    title: 'Casco de Ciclismo Urbano',
    price: 200000,
    image: cascoCiclismo3Image,
    specs: ['Peso: 280g', 'Tallas: M/L', 'Visera removible'],
    category: 'Ciclismo'
  },
  {
    title: 'Guantes de Boxeo',
    price: 180000,
    image: guantesBoxeoImage,
    specs: ['Tamaño: 12oz', 'Material: Cuero', 'Relleno de espuma EVA'],
    category: 'Boxeo'
  },
  {
    title: 'Guantes de Boxeo Pro',
    price: 220000,
    image: guantesBoxeo2Image,
    specs: ['Tamaño: 14oz', 'Material: Piel sintética', 'Refuerzo adicional'],
    category: 'Boxeo'
  },
  {
    title: 'Guantes de Boxeo Amateur',
    price: 150000,
    image: guantesBoxeo3Image,
    specs: ['Tamaño: 10oz', 'Material: Cuero sintético', 'Protección ligera'],
    category: 'Boxeo'
  }
];

const VariedadPage = () => {
  const location = useLocation();
  const [currency, setCurrency] = useState('COP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredVariety, setFilteredVariety] = useState(varietyProducts);

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
    const filteredProducts = filteredVariety.filter(
      (product) => product.category === category
    );
    return (
      <>
        <SectionTitle>{category}</SectionTitle>
        <BorderedContainer>
          <ProductGallery
            products={filteredProducts.map((product) => ({
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
        {renderSection('Tenis')}
        {renderSection('Ciclismo')}
        {renderSection('Boxeo')}
      </MainContent>
    </Container>
  );
};

export default VariedadPage;

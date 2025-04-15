import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ProductGallery from '../components/ProductGallery'; // Componente de galería reutilizado
import Sidebar from '../components/Sidebar'; // Importación del Sidebar
import balonBasketImage from '../images/balonBasket.jpg';
import balonBasket2Image from '../images/balonBasket2.jpg';
import balonBasket3Image from '../images/balonBasket3.jpg';
import zapatosBasketImage from '../images/zapatosBasket.jpg';
import zapatosBasket2Image from '../images/zapatosBasket2.jpg';
import zapatosBasket3Image from '../images/zapatosBasket3.jpg';
import uniformeBasketImage from '../images/uniformeBasket.jpg';
import uniformeBasket2Image from '../images/uniformeBasket2.jpg';
import uniformeBasket3Image from '../images/uniformeBasket3.jpg';
import canastaBasketImage from '../images/canastaBasket.jpg';
import canastaBasket2Image from '../images/canastaBasket2.jpg';
import canastaBasket3Image from '../images/canastaBasket3.jpg';
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

// Lista de productos (cosas de baloncesto)
const basketballProducts = [
  { title: 'Balón de Baloncesto', price: 150000, image: balonBasketImage, sizes: ['Tamaño 6', 'Tamaño 7'], discount: true, category: 'Balones' },
  { title: 'Balón Profesional', price: 200000, image: balonBasket2Image, sizes: ['Tamaño 7'], discount: false, category: 'Balones' },
  { title: 'Balón Recreativo', price: 100000, image: balonBasket3Image, sizes: ['Tamaño 6'], discount: true, category: 'Balones' },
  { title: 'Zapatos de Baloncesto', price: 300000, image: zapatosBasketImage, sizes: ['39', '41', '43', '45'], discount: false, category: 'Calzado' },
  { title: 'Zapatos Profesionales', price: 350000, image: zapatosBasket2Image, sizes: ['40', '42', '44'], discount: true, category: 'Calzado' },
  { title: 'Zapatos Casual', price: 250000, image: zapatosBasket3Image, sizes: ['39', '41'], discount: false, category: 'Calzado' },
  { title: 'Uniforme de Baloncesto', price: 180000, image: uniformeBasketImage, sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Ropa' },
  { title: 'Uniforme Profesional', price: 220000, image: uniformeBasket2Image, sizes: ['M', 'L', 'XL'], discount: false, category: 'Ropa' },
  { title: 'Uniforme de Entrenamiento', price: 150000, image: uniformeBasket3Image, sizes: ['S', 'M'], discount: true, category: 'Ropa' },
  { title: 'Mini Canasta de Baloncesto', price: 120000, image: canastaBasketImage, sizes: ['Tamaño estándar'], discount: false, category: 'Accesorios' },
  { title: 'Canasta Portátil', price: 250000, image: canastaBasket2Image, sizes: ['Altura ajustable'], discount: true, category: 'Accesorios' },
  { title: 'Canasta Pared', price: 180000, image: canastaBasket3Image, sizes: ['Tamaño pequeño'], discount: false, category: 'Accesorios' },
];

const BaloncestoPage = () => {
  const [currency, setCurrency] = useState('COP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredBasketball, setFilteredBasketball] = useState(basketballProducts);

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
    const filteredProducts = filteredBasketball.filter(product => product.category === category);
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
      {/* Sidebar con cambio de moneda */}
      <Sidebar currency={currency} setCurrency={setCurrency} />

      {/* Contenido principal con las secciones */}
      <MainContent>
        {renderSection('Balones')}
        {renderSection('Calzado')}
        {renderSection('Ropa')}
        {renderSection('Accesorios')}
      </MainContent>
    </Container>
  );
};

export default BaloncestoPage;

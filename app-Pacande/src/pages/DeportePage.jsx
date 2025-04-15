import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ProductGallery from '../components/ProductGallery'; // Componente de galería reutilizado
import Sidebar from '../components/Sidebar'; // Sidebar importado
import balonImage from '../images/balon.jpg';
import balon2Image from '../images/balon2.jpg'; // Nueva imagen de balon2
import balon3Image from '../images/balon3.jpg'; // Nueva imagen de balon3
import tacosImage from '../images/tacos.jpg';
import tacos2Image from '../images/tacos2.jpg'; // Nueva imagen de tacos2
import tacos3Image from '../images/tacos3.jpg'; // Nueva imagen de tacos3
import uniformeImage from '../images/uniforme.jpg';
import uniforme2Image from '../images/uniforme2.jpg'; // Nueva imagen de uniforme2
import uniforme3Image from '../images/uniforme3.jpg'; // Nueva imagen de uniforme3
import guantesImage from '../images/guantes.jpg';
import guantes2Image from '../images/guantes2.jpg'; // Nueva imagen de guantes2
import guantes3Image from '../images/guantes3.jpg'; // Nueva imagen de guantes3
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

// Lista de productos (cosas de fútbol)
const footballProducts = [
  { title: 'Golty blanco', price: 120000, image: balonImage, sizes: ['Tamaño 4', 'Tamaño 5'], discount: true, category: 'Balones' },
  { title: 'Molten', price: 130000, image: balon2Image, sizes: ['Tamaño 4', 'Tamaño 5'], discount: true, category: 'Balones' },
  { title: 'Golty Amarillo', price: 140000, image: balon3Image, sizes: ['Tamaño 4', 'Tamaño 5'], discount: true, category: 'Balones' },
  { title: 'Tacos Puma', price: 200000, image: tacosImage, sizes: ['36', '38', '40', '42'], discount: false, category: 'Calzado' },
  { title: 'Tacos Nike', price: 210000, image: tacos2Image, sizes: ['36', '38', '40', '42'], discount: false, category: 'Calzado' },
  { title: 'Tacos Predator', price: 220000, image: tacos3Image, sizes: ['36', '38', '40', '42'], discount: false, category: 'Calzado' },
  { title: 'Uniforme Azul', price: 150000, image: uniformeImage, sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Ropa' },
  { title: 'Uniforme Blanco', price: 160000, image: uniforme2Image, sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Ropa' },
  { title: 'Uniforme Negro', price: 170000, image: uniforme3Image, sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Ropa' },
  { title: 'Guantes rosados', price: 100000, image: guantesImage, sizes: ['Mediano', 'Grande'], discount: false, category: 'Accesorios' },
  { title: 'Guantes Rojos', price: 110000, image: guantes2Image, sizes: ['Mediano', 'Grande'], discount: false, category: 'Accesorios' },
  { title: 'Guantes Blancos', price: 120000, image: guantes3Image, sizes: ['Mediano', 'Grande'], discount: false, category: 'Accesorios' },
];

const DeportePage = () => {
  const [currency, setCurrency] = useState('COP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredFootball, setFilteredFootball] = useState(footballProducts);

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
    const filteredProducts = filteredFootball.filter(product => product.category === category);
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

export default DeportePage;

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import Sidebar from '../components/Sidebar'; // Importa el nuevo componente de barra lateral
import camisetaImage from '../images/camiseta.jpg';
import camisetaamarilla from '../images/camiseta-amarilla-hombre.jpg';
import camisetaroja from '../images/camiseta-roja-hombre.webp';
import camisetablanca from '../images/camiseta-blanca-hombre.jpg';
import camisetagris from '../images/camiseta-gris-hombre.jpg';
import camisetanegra from '../images/camiseta-negra-hombre.jpg';
import PantalonNegro from '../images/PantalonNegroMen.jpg';
import PantalonJeans from '../images/PantalonJeansMen.jpg';
import PantalonChino from '../images/PantalonChinoMen.jpg';
import PantalonCargo from '../images/PantalonCargoMen.jpg';
import PantalonFormal from '../images/PantalonFormalMen.jpg';
import PantalonDeportivo from '../images/PantalonDeportivoMen.jpg';
import ChaquetaCuero from '../images/ChaquetaCueroMen.jpg';
import ChaquetaInvierno from '../images/ChaquetaInviernoMen.jpg';
import ChaquetaDeportiva from '../images/ChaquetaDeportivaMen.jpg';
import ChaquetaLarga from '../images/ChaquetaLargaMen.jpg';
import ChaquetaFormal from '../images/ChaquetaFormalMen.jpg';
import ChaquetaCasual from '../images/ChaquetaCasualMen.jpg';

import { fetchExchangeRates, convertCurrency } from '../services/CurrencyService';

// Estilos del contenedor principal
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  color: white;
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

// Lista de productos
const ropaProducts = [
  // Camisetas (se dejan igual que el código original)
  { title: 'Camiseta Azul Hombre', price: 80000, image: camisetaImage, sizes: ['S', 'M', 'L', 'XL'], discount: false, category: 'Camisetas' },
  { title: 'Camiseta Negra Hombre', price: 80000, image: camisetanegra, sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Camisetas' },
  { title: 'Camiseta Amarilla Hombre', price: 80000, image: camisetaamarilla, sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Camisetas' },
  { title: 'Camiseta Blanca Hombre', price: 80000, image: camisetablanca, sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Camisetas' },
  { title: 'Camiseta Roja Hombre', price: 80000, image: camisetaroja, sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Camisetas' },
  { title: 'Camiseta Gris Hombre', price: 80000, image: camisetagris, sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Camisetas' },

  // Pantalones
  { title: 'Pantalón Negro', price: 160000, image: PantalonNegro, sizes: ['S', 'M', 'L'], discount: false, category: 'Pantalones' },
  { title: 'Pantalón Jeans', price: 160000, image: PantalonJeans, sizes: ['S', 'M', 'L'], discount: false, category: 'Pantalones' },
  { title: 'Pantalón Chino', price: 160000, image: PantalonChino, sizes: ['S', 'M', 'L'], discount: false, category: 'Pantalones' },
  { title: 'Pantalón Cargo', price: 160000, image: PantalonCargo, sizes: ['S', 'M', 'L'], discount: false, category: 'Pantalones' },
  { title: 'Pantalón Formal', price: 180000, image: PantalonFormal, sizes: ['S', 'M', 'L'], discount: false, category: 'Pantalones' },
  { title: 'Pantalón Deportivo', price: 150000, image: PantalonDeportivo, sizes: ['S', 'M', 'L'], discount: true, category: 'Pantalones' },

  // Chaquetas
  { title: 'Chaqueta de Cuero', price: 240000, image: ChaquetaCuero, sizes: ['S', 'M', 'L'], discount: true, category: 'Chaquetas' },
  { title: 'Chaqueta de Invierno', price: 240000, image: ChaquetaInvierno, sizes: ['S', 'M', 'L'], discount: true, category: 'Chaquetas' },
  { title: 'Chaqueta Deportiva', price: 240000, image: ChaquetaDeportiva, sizes: ['S', 'M', 'L'], discount: true, category: 'Chaquetas' },
  { title: 'Chaqueta Larga', price: 240000, image: ChaquetaLarga, sizes: ['S', 'M', 'L'], discount: true, category: 'Chaquetas' },
  { title: 'Chaqueta Formal', price: 260000, image: ChaquetaFormal, sizes: ['S', 'M', 'L'], discount: true, category: 'Chaquetas' },
  { title: 'Chaqueta Casual', price: 220000, image: ChaquetaCasual, sizes: ['S', 'M', 'L'], discount: false, category: 'Chaquetas' },
];

const RopaPage = () => {
  const location = useLocation();
  const [currency, setCurrency] = useState('COP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredRopa, setFilteredRopa] = useState(ropaProducts);

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
    const filteredProducts = filteredRopa.filter(product => product.category === category);
    return (
      <>
        <SectionTitle>{category}</SectionTitle>
        <BorderedContainer>
          <ProductGallery
            products={filteredProducts.map(product => ({
              ...product,
              price: convertPrice(product.price),
            }))}
            showSizes={true}
          />
        </BorderedContainer>
      </>
    );
  };

  return (
    <Container>
      <Sidebar currency={currency} setCurrency={setCurrency} /> {/* Usa el nuevo componente Sidebar */}

      <MainContent>
        {renderSection('Camisetas')}
        {renderSection('Pantalones')}
        {renderSection('Chaquetas')}
      </MainContent>
    </Container>
  );
};

export default RopaPage;

import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Sidebar from '../components/Sidebar';
import ProductGallery from '../components/ProductGallery';
import { fetchExchangeRates, convertCurrency } from '../services/CurrencyService';
import 'uikit/dist/css/uikit.min.css';

// Importar imágenes
import raquetaTenisImage from '../images/raquetaTenis.jpg';
import sofaImage from '../images/sofa.jpg';
import cascoCiclismo2Image from '../images/cascoCiclismo2.jpg';
import camisetaRojaNinoImage from '../images/CamisetaRojaNino.jpg';
import regaderaPlasticaImage from '../images/regadera2.jpg';
import auricularesDeportivosImage from '../images/Auriculares Deportivos.jpg';

// Estilos personalizados
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;
  color: white;
  flex-direction: column;
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

// Banner llamativo
const BannerContainer = styled.div`
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  padding: 30px 15px;
  margin-bottom: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  position: relative;
  top: 125px; /* Añadido para separar el banner del navbar */
  z-index: 1;
  filter: brightness(1.2); /* Efecto de brillo aumentado */
`;

const BannerTitle = styled.h1`
  font-size: 2.5rem;
  color: black;
  font-weight: bold;
  margin-bottom: 10px;
`;

const BannerSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0;
`;

// Productos en promoción
const promoProducts = [
  {
    title: 'Raqueta de Tenis (Promoción)',
    price: 400000,
    image: raquetaTenisImage,
  },
  {
    title: 'Sofá Moderno',
    price: 1200000,
    specs: ['Material: Tela', 'Color: Gris', 'Dimensiones: 200x90x85 cm'],
    category: 'Muebles',
    promo: true,
    image: sofaImage,
  },
  {
    title: 'Casco de Ciclismo Profesional',
    price: 280000,
    image: cascoCiclismo2Image,
  },
  {
    title: 'Camiseta Roja Niño', 
    price: 50000,
    image: camisetaRojaNinoImage,
  },
  {
    title: 'Regadera Plástica',
    price: 30000,
    image: regaderaPlasticaImage,
  },
  {
    title: 'Auriculares Deportivos',
    price: 150000,
    image: auricularesDeportivosImage,
  },
];

const OfertaPage = () => {
  const [currency, setCurrency] = useState('COP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredPromos, setFilteredPromos] = useState(promoProducts);

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

  return (
    <Container>
      {/* Banner llamativo */}
      <BannerContainer uk-scrollspy="cls: uk-animation-slide-top; repeat: true">
        <BannerTitle>¡Descuentos Exclusivos!</BannerTitle>
        <BannerSubtitle>Descubre ofertas increíbles aqui</BannerSubtitle>
      </BannerContainer>

      <Sidebar currency={currency} setCurrency={setCurrency} />

      {/* Contenido principal */}
      <MainContent>
        <SectionTitle>Productos en Promoción</SectionTitle>
        <BorderedContainer>
          <ProductGallery
            products={filteredPromos.map((product) => ({
              ...product,
              price: convertPrice(product.price),
            }))}
            showSpecs={true}
          />
        </BorderedContainer>
      </MainContent>
    </Container>
  );
};

export default OfertaPage;

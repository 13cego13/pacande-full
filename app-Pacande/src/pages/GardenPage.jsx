import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ProductGallery from '../components/ProductGallery'; // Componente de galería reutilizado
import Sidebar from '../components/Sidebar'; // Importa el sidebar
import macetaImage from '../images/maceta.jpg';
import maceta2Image from '../images/maceta2.jpg';
import maceta3Image from '../images/maceta3.jpg';
import regaderaImage from '../images/regadera.jpg';
import regadera2Image from '../images/regadera2.jpg';
import regadera3Image from '../images/regadera3.jpg';
import hamacaImage from '../images/hamaca.jpg';
import hamaca2Image from '../images/hamaca2.jpg';
import hamaca3Image from '../images/hamaca3.jpg';
import lucesImage from '../images/luces.jpg';
import luces2Image from '../images/luces2.jpg';
import luces3Image from '../images/luces3.jpg';
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

// Lista de productos (cosas del jardín)
const gardenProducts = [
  { title: 'Maceta de Cerámica', price: 50000, image: macetaImage, sizes: ['Pequeña', 'Mediana', 'Grande'], discount: true, category: 'Macetas' },
  { title: 'Maceta de Barro', price: 60000, image: maceta2Image, sizes: ['Mediana', 'Grande'], discount: false, category: 'Macetas' },
  { title: 'Maceta Decorativa', price: 55000, image: maceta3Image, sizes: ['Pequeña', 'Mediana'], discount: true, category: 'Macetas' },
  { title: 'Regadera Metálica', price: 40000, image: regaderaImage, sizes: ['Pequeña', 'Mediana'], discount: false, category: 'Herramientas' },
  { title: 'Regadera Plástica', price: 35000, image: regadera2Image, sizes: ['Grande'], discount: true, category: 'Herramientas' },
  { title: 'Regadera Vintage', price: 45000, image: regadera3Image, sizes: ['Mediana'], discount: false, category: 'Herramientas' },
  { title: 'Hamaca de Tela', price: 250000, image: hamacaImage, sizes: ['Individual', 'Doble'], discount: true, category: 'Muebles de Jardín' },
  { title: 'Hamaca Reforzada', price: 270000, image: hamaca2Image, sizes: ['Doble'], discount: false, category: 'Muebles de Jardín' },
  { title: 'Hamaca de Malla', price: 230000, image: hamaca3Image, sizes: ['Individual'], discount: true, category: 'Muebles de Jardín' },
  { title: 'Luces Solares', price: 80000, image: lucesImage, sizes: ['Pack de 4', 'Pack de 8'], discount: false, category: 'Iluminación' },
  { title: 'Luces LED', price: 75000, image: luces2Image, sizes: ['Pack de 6'], discount: true, category: 'Iluminación' },
  { title: 'Luces Decorativas', price: 90000, image: luces3Image, sizes: ['Pack de 10'], discount: false, category: 'Iluminación' },
];

const GardenPage = () => {
  const [currency, setCurrency] = useState('COP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredGarden, setFilteredGarden] = useState(gardenProducts);

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
    const filteredProducts = filteredGarden.filter(product => product.category === category);
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
      <Sidebar currency={currency} setCurrency={setCurrency} /> {/* Sidebar agregado */}
      
      <MainContent>
        {renderSection('Macetas')}
        {renderSection('Herramientas')}
        {renderSection('Muebles de Jardín')}
        {renderSection('Iluminación')}
      </MainContent>
    </Container>
  );
};

export default GardenPage;

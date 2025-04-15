import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import Sidebar from '../components/Sidebar'; // Importa el nuevo componente de barra lateral
import { fetchExchangeRates, convertCurrency } from '../services/CurrencyService';

// Importación de imágenes
import CamisetaAzul from '../images/CamisetaAzul.jpg';
import PantalonNegro from '../images/PantalonNegro.jpg';
import ChaquetaCuero from '../images/ChaquetaCuero.jpg';
import CamisetaNegra from '../images/CamisetaNegra.jpg';
import PantalonJeans from '../images/PantalonJeans.jpg';
import ChaquetaInvierno from '../images/ChaquetaInvierno.jpg';
import CamisetaAmarilla from '../images/CamisetaAmarilla.jpg';
import CamisetaBlanca from '../images/CamisetaBlanca.jpg';
import PantalonChino from '../images/PantalonChino.jpg';
import ChaquetaDeportiva from '../images/ChaquetaDeportiva.jpg';
import CamisetaRoja from '../images/CamisetaRoja.jpg';
import PantalonCargo from '../images/PantalonCargo.jpg';
import ChaquetaLarga from '../images/ChaquetaLarga.jpg';
import CamisetaGris from '../images/CamisetaGris.jpg';
import PantalonFormal from '../images/PantalonFormal.jpg'; // Nuevo pantalón
import PantalonDeportivo from '../images/PantalonDeportivo.jpg'; // Nuevo pantalón
import ChaquetaFormal from '../images/ChaquetaFormal.jpg'; // Nueva chaqueta
import ChaquetaCasual from '../images/ChaquetaCasual.jpg'; // Nueva chaqueta

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

// Lista de productos con nombres únicos y sus imágenes locales
const ropaProducts = [
  { title: 'Camiseta Azul', price: 80000, image: CamisetaAzul, sizes: ['S', 'M', 'L', 'XL'], discount: false, category: 'Camisetas' },
  { title: 'Pantalón Negro', price: 160000, image: PantalonNegro, sizes: ['S', 'M', 'L'], discount: false, category: 'Pantalones' },
  { title: 'Chaqueta de Cuero', price: 240000, image: ChaquetaCuero, sizes: ['S', 'M', 'L'], discount: true, category: 'Chaquetas' },
  { title: 'Camiseta Negra', price: 80000, image: CamisetaNegra, sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Camisetas' },
  { title: 'Pantalón Jeans', price: 160000, image: PantalonJeans, sizes: ['S', 'M', 'L'], discount: false, category: 'Pantalones' },
  { title: 'Chaqueta de Invierno', price: 240000, image: ChaquetaInvierno, sizes: ['S', 'M', 'L'], discount: true, category: 'Chaquetas' },
  { title: 'Camiseta Amarilla', price: 80000, image: CamisetaAmarilla, sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Camisetas' },
  { title: 'Camiseta Blanca', price: 80000, image: CamisetaBlanca, sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Camisetas' },
  { title: 'Pantalón Chino', price: 160000, image: PantalonChino, sizes: ['S', 'M', 'L'], discount: false, category: 'Pantalones' },
  { title: 'Chaqueta Deportiva', price: 240000, image: ChaquetaDeportiva, sizes: ['S', 'M', 'L'], discount: true, category: 'Chaquetas' },
  { title: 'Camiseta Roja', price: 80000, image: CamisetaRoja, sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Camisetas' },
  { title: 'Pantalón Cargo', price: 160000, image: PantalonCargo, sizes: ['S', 'M', 'L'], discount: false, category: 'Pantalones' },
  { title: 'Chaqueta Larga', price: 240000, image: ChaquetaLarga, sizes: ['S', 'M', 'L'], discount: true, category: 'Chaquetas' },
  { title: 'Camiseta Gris', price: 80000, image: CamisetaGris, sizes: ['S', 'M', 'L', 'XL'], discount: true, category: 'Camisetas' },
  { title: 'Pantalón Formal', price: 180000, image: PantalonFormal, sizes: ['S', 'M', 'L'], discount: false, category: 'Pantalones' }, // Nuevo pantalón
  { title: 'Pantalón Deportivo', price: 150000, image: PantalonDeportivo, sizes: ['S', 'M', 'L'], discount: true, category: 'Pantalones' }, // Nuevo pantalón
  { title: 'Chaqueta Formal', price: 260000, image: ChaquetaFormal, sizes: ['S', 'M', 'L'], discount: true, category: 'Chaquetas' }, // Nueva chaqueta
  { title: 'Chaqueta Casual', price: 220000, image: ChaquetaCasual, sizes: ['S', 'M', 'L'], discount: false, category: 'Chaquetas' }, // Nueva chaqueta
];

const RopaMujerPage = () => {
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
      <Sidebar currency={currency} setCurrency={setCurrency} /> {/* Usa el nuevo componente Sidebar */}

      <MainContent>
        {renderSection('Camisetas')}
        {renderSection('Pantalones')}
        {renderSection('Chaquetas')}
      </MainContent>
    </Container>
  );
};

export default RopaMujerPage;


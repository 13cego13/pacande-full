import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ProductGallery from '../components/ProductGallery'; // Componente de galería reutilizado
import Sidebar from '../components/Sidebar'; // Sidebar añadido
import sofaImage from '../images/sofa.jpg';
import sofa2Image from '../images/sofa2.jpg';
import sofa3Image from '../images/sofa3.jpg';
import mesaImage from '../images/mesa.jpg';
import mesa2Image from '../images/mesa2.jpg';
import mesa3Image from '../images/mesa3.jpg';
import sillaImage from '../images/silla.jpg';
import silla2Image from '../images/silla2.jpg';
import silla3Image from '../images/silla3.jpg';
import estanteriaImage from '../images/estanteria.jpg';
import estanteria2Image from '../images/estanteria2.jpg';
import estanteria3Image from '../images/estanteria3.jpg';
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

// Lista de productos (muebles para el hogar)
const mueblesProducts = [
  { title: 'Sofá Moderno', price: 800000, image: sofaImage, sizes: ['Pequeño', 'Mediano', 'Grande'], discount: true, category: 'Sofás' },
  { title: 'Sofá Clásico', price: 850000, image: sofa2Image, sizes: ['Pequeño', 'Grande'], discount: false, category: 'Sofás' },
  { title: 'Sofá Minimalista', price: 900000, image: sofa3Image, sizes: ['Mediano', 'Grande'], discount: true, category: 'Sofás' },
  { title: 'Mesa de Comedor', price: 600000, image: mesaImage, sizes: ['4 personas', '6 personas'], discount: false, category: 'Mesas' },
  { title: 'Mesa de Centro', price: 300000, image: mesa2Image, sizes: ['Pequeña', 'Mediana'], discount: true, category: 'Mesas' },
  { title: 'Mesa Plegable', price: 400000, image: mesa3Image, sizes: ['Compacta'], discount: false, category: 'Mesas' },
  { title: 'Silla de Oficina', price: 250000, image: sillaImage, sizes: ['Estándar'], discount: false, category: 'Sillas' },
  { title: 'Silla de Gaming', price: 450000, image: silla2Image, sizes: ['Grande'], discount: true, category: 'Sillas' },
  { title: 'Silla Vintage', price: 350000, image: silla3Image, sizes: ['Estándar'], discount: false, category: 'Sillas' },
  { title: 'Estantería de Madera', price: 450000, image: estanteriaImage, sizes: ['Pequeña', 'Grande'], discount: true, category: 'Estanterías' },
  { title: 'Estantería Metálica', price: 500000, image: estanteria2Image, sizes: ['Mediana'], discount: false, category: 'Estanterías' },
  { title: 'Estantería Modular', price: 550000, image: estanteria3Image, sizes: ['Grande'], discount: true, category: 'Estanterías' },
];

const HogarPage = () => {
  const [currency, setCurrency] = useState('COP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredMuebles, setFilteredMuebles] = useState(mueblesProducts);

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
    const filteredProducts = filteredMuebles.filter(product => product.category === category);
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
      {/* Sidebar añadido */}
      <Sidebar currency={currency} setCurrency={setCurrency} />

      <MainContent>
        {renderSection('Sofás')}
        {renderSection('Mesas')}
        {renderSection('Sillas')}
        {renderSection('Estanterías')}
      </MainContent>
    </Container>
  );
};

export default HogarPage;

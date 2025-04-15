import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import Sidebar from '../components/Sidebar';
import { fetchExchangeRates, convertCurrency } from '../services/CurrencyService';

// Importar imágenes
import auricularesBluetoothImage from '../images/Auriculares Bluetooth.jpg';
import auricularesNoiseCancellingImage from '../images/Auriculares Noise Cancelling.jpg';
import auricularesDeportivosImage from '../images/Auriculares Deportivos.jpg';
import cargadorRapidoImage from '../images/Cargador Rápido USB-C.jpg';
import cargadorInalambricoImage from '../images/Cargador Inalámbrico.jpg';
import cargadorAutoImage from '../images/Cargador para Auto.jpg';
import fundaIphone14Image from '../images/Funda para iPhone 14.jpg';
import fundaSamsungGalaxyImage from '../images/Funda para Samsung Galaxy.jpg';
import fundaPixelImage from '../images/Funda para Google Pixel.jpg';
import tecladoMecanicoImage from '../images/Teclado Mecánico.jpg';
import tecladoRGBImage from '../images/Teclado RGB.jpg';
import tecladoCompactoImage from '../images/Teclado Compacto.jpg';
import ratonGamingImage from '../images/Ratón Gaming.jpg';
import ratonInalambricoImage from '../images/Ratón Inalámbrico.jpg';
import ratonVerticalImage from '../images/Ratón Vertical.jpg';
import soporteCelularImage from '../images/Soporte para Celular.jpg';
import soporteTabletImage from '../images/Soporte para Tablet.jpg';
import soporteEscritorioImage from '../images/Soporte de Escritorio.jpg';
import powerBankImage from '../images/Power Bank 10000mAh.jpg';
import powerBankSolarImage from '../images/Power Bank Solar.jpg';
import powerBankRapidoImage from '../images/Power Bank Carga Rápida.jpg';
import adaptadorHDMIImage from '../images/Adaptador HDMI.jpg';
import adaptadorVGAImage from '../images/Adaptador VGA.jpg';
import adaptadorUSBImage from '../images/Adaptador USB.jpg';

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

// Lista de productos de accesorios tecnológicos
const accesoriosTecnologicosProducts = [
  // Auriculares
  { title: 'Auriculares Bluetooth', price: 120000, image: auricularesBluetoothImage, discount: true, category: 'Auriculares' },
  { title: 'Auriculares Noise Cancelling', price: 250000, image: auricularesNoiseCancellingImage, discount: false, category: 'Auriculares' },
  { title: 'Auriculares Deportivos', price: 80000, image: auricularesDeportivosImage, discount: true, category: 'Auriculares' },
  
  // Cargadores
  { title: 'Cargador Rápido USB-C', price: 50000, image: cargadorRapidoImage, discount: false, category: 'Cargadores' },
  { title: 'Cargador Inalámbrico', price: 90000, image: cargadorInalambricoImage, discount: true, category: 'Cargadores' },
  { title: 'Cargador para Auto', price: 45000, image: cargadorAutoImage, discount: false, category: 'Cargadores' },
  
  // Fundas
  { title: 'Funda para iPhone 14', price: 30000, image: fundaIphone14Image, discount: true, category: 'Fundas' },
  { title: 'Funda para Samsung Galaxy', price: 35000, image: fundaSamsungGalaxyImage, discount: false, category: 'Fundas' },
  { title: 'Funda para Google Pixel', price: 40000, image: fundaPixelImage, discount: false, category: 'Fundas' },
  
  // Teclados
  { title: 'Teclado Mecánico', price: 200000, image: tecladoMecanicoImage, discount: false, category: 'Teclados' },
  { title: 'Teclado RGB', price: 250000, image: tecladoRGBImage, discount: true, category: 'Teclados' },
  { title: 'Teclado Compacto', price: 150000, image: tecladoCompactoImage, discount: false, category: 'Teclados' },
  
  // Ratones
  { title: 'Ratón Gaming', price: 90000, image: ratonGamingImage, discount: true, category: 'Ratones' },
  { title: 'Ratón Inalámbrico', price: 70000, image: ratonInalambricoImage, discount: false, category: 'Ratones' },
  { title: 'Ratón Vertical', price: 85000, image: ratonVerticalImage, discount: true, category: 'Ratones' },
  
  // Soportes
  { title: 'Soporte para Celular', price: 35000, image: soporteCelularImage, discount: false, category: 'Soportes' },
  { title: 'Soporte para Tablet', price: 45000, image: soporteTabletImage, discount: true, category: 'Soportes' },
  { title: 'Soporte de Escritorio', price: 40000, image: soporteEscritorioImage, discount: true, category: 'Soportes' },
  
  // Baterías
  { title: 'Power Bank 10000mAh', price: 80000, image: powerBankImage, discount: false, category: 'Baterías' },
  { title: 'Power Bank Solar', price: 120000, image: powerBankSolarImage, discount: true, category: 'Baterías' },
  { title: 'Power Bank Carga Rápida', price: 100000, image: powerBankRapidoImage, discount: false, category: 'Baterías' },
  
  // Adaptadores
  { title: 'Adaptador HDMI', price: 40000, image: adaptadorHDMIImage, discount: true, category: 'Adaptadores' },
  { title: 'Adaptador VGA', price: 30000, image: adaptadorVGAImage, discount: false, category: 'Adaptadores' },
  { title: 'Adaptador USB', price: 25000, image: adaptadorUSBImage, discount: true, category: 'Adaptadores' },
];

const AccesoriosTecnologicosPage = () => {
  const location = useLocation();
  const [currency, setCurrency] = useState('COP');
  const [exchangeRates, setExchangeRates] = useState({});
  const [filteredAccesorios, setFilteredAccesorios] = useState(accesoriosTecnologicosProducts);

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
    const filteredProducts = filteredAccesorios.filter(product => product.category === category);
    return (
      <>
        <SectionTitle>{category}</SectionTitle>
        <BorderedContainer>
          <ProductGallery 
            products={filteredProducts.map(product => ({
              ...product,
              price: convertPrice(product.price)
            }))} 
            showSizes={false} 
          />
        </BorderedContainer>
      </>
    );
  };

  return (
    <Container>
      <Sidebar currency={currency} setCurrency={setCurrency} />

      <MainContent>
        {renderSection('Auriculares')}
        {renderSection('Cargadores')}
        {renderSection('Fundas')}
        {renderSection('Teclados')}
        {renderSection('Ratones')}
        {renderSection('Soportes')}
        {renderSection('Baterías')}
        {renderSection('Adaptadores')}
      </MainContent>
    </Container>
  );
};

export default AccesoriosTecnologicosPage;

import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import { HashLink } from 'react-router-hash-link';

// Importa las imágenes locales
import mujerImage from '../images/mujer1.jpg';
import hombreImage from '../images/hombre.jpg';
import carruselImage from '../images/carrusel1.jpg';
import carrusel2Image from '../images/carrusel2.jpg';
import carrusel3Image from '../images/carrusel3.jpg';
import celulares from '../images/celulares.jpg';
import computadores from '../images/computadores.jpeg';
import accesorios from '../images/accesorios.jpeg';
import futbol from '../images/futbol.jpeg';
import baloncesto from '../images/baloncesto.jpeg';
import variedad from '../images/variedad.jpeg';
import muebles from '../images/muebles.jpeg';
import decoracion from '../images/decoracion.jpeg';
import jardin from '../images/jardin.jpeg';

const HomePageContainer = styled.div`
  background-color: #FFFFFF; /* Fondo Blanco Puro */
  color: #333333; /* Texto Gris Antracita */
  text-align: center;
  padding: 20px;
  margin: 0;
  width: 100%;
  box-sizing: border-box; /* Incluye el padding en el ancho total */
`;

const WideCardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  gap: 25px; /* Espacio entre cartas */
`;


const WideCard = styled.div`
  width: 45%;
  padding: 50px;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: #000000;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.3s, background-color 0.3s;

  /* Capa de opacidad sobre la imagen */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Añade opacidad del 50% */
    z-index: 1;
    transition: background-color 0.3s;
  }

  span {
    position: relative;
    z-index: 2; /* Para que el texto quede por encima de la capa de opacidad */
    color: #FFFFFF; /* Texto en blanco */
  }

  &:hover {
    transform: scale(1.05); /* Efecto de zoom */
  }
`;

const StyledLink = styled(HashLink)`
  position: relative;
  z-index: 2;
  color: #FFFFFF;
  text-decoration: none;
  outline: none; /* Quita el delineado azul */
  border-bottom: 3px solid transparent; /* Sin borde al inicio */

  &:hover {
    text-decoration: none; /* Quita el subrayado al pasar el ratón */
  }
  &:focus {
    outline: none; /* Asegura que no haya delineado al hacer clic */
    text-decoration: none; /* Quita el subrayado al hacer clic */
  }

  
`;

// Componente para las tarjetas de Tecnología
const TechWideCard = styled(WideCard)`
  height: 550px; /* Aumentar la altura solo para la sección de Tecnología */
  width: 300px; /* Ajustar el ancho para que quepan 3 tarjetas */
  font-size: 40px;
`;

const TechCardContainer = styled(WideCardContainer)`
  background-color: #000000; /* Fondo Negro */
  padding: 20px;
  color: #FFFFFF;
`;

const HomePage = () => {
  const slideshowRef = useRef(null);

  useEffect(() => {
    if (window.UIkit) {
      const ukSlideshow = window.UIkit.slideshow(slideshowRef.current);

      const handleMouseEnter = () => {
        ukSlideshow.pause();
      };

      const handleMouseLeave = () => {
        ukSlideshow.start();
      };

      slideshowRef.current.addEventListener('mouseenter', handleMouseEnter);
      slideshowRef.current.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        slideshowRef.current.removeEventListener('mouseenter', handleMouseEnter);
        slideshowRef.current.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <HomePageContainer>
      {/* Carrusel */}
      <div
        ref={slideshowRef}
        uk-slideshow="animation: fade; autoplay: true; autoplay-interval: 3000; ratio: 7:3;"
      >
        <ul className="uk-slideshow-items">
          <li>
            <img src={carruselImage} alt="Imagen de Carrusel" uk-cover="true" />
          </li>
          <li>
            <img src={carrusel2Image} alt="Imagen de Ejemplo 2" uk-cover="true" />
          </li>
          <li>
            <img src={carrusel3Image} alt="Imagen de Ejemplo 3" uk-cover="true" />
          </li>
        </ul>

        <a
          className="uk-position-center-left uk-position-small uk-hidden-hover"
          href="#"
          uk-slidenav-previous="true"
          uk-slideshow-item="previous"
        ></a>
        <a
          className="uk-position-center-right uk-position-small uk-hidden-hover"
          href="#"
          uk-slidenav-next="true"
          uk-slideshow-item="next"
        ></a>
      </div>

      {/* Sección de Ropa */}
      <h2>ROPA</h2>
      <WideCardContainer>
        <WideCard image={mujerImage}>
           <StyledLink to="/Ropamujer">
             <span>MUJER</span>
           </StyledLink>
        </WideCard>
        <WideCard image={hombreImage}>
           <StyledLink to="/ropa">
             <span>HOMBRE</span>
            </StyledLink>
        </WideCard>
      </WideCardContainer>

      {/* Sección de Tecnología */}
      <h2>TECNOLOGÍA</h2>
      <TechCardContainer>
        <TechWideCard image={celulares}>
            <StyledLink to="/Tecnologia">
             <span>CELULARES</span>
            </StyledLink>
        </TechWideCard>
        <TechWideCard image={computadores}>
             <StyledLink to="/Tecpc">
             <span>COMPUTADORES</span>
            </StyledLink>
        </TechWideCard>
        <TechWideCard image={accesorios}>
            <StyledLink to="/Tecaccesorios">
             <span>ACCESORIOS</span>
            </StyledLink>
        </TechWideCard>
      </TechCardContainer>

      {/* Sección de Hogar */}
      <h2>HOGAR</h2>
      <WideCardContainer>
        <WideCard image={muebles}>
            <StyledLink to="/HogarPage">
             <span>MUEBLES</span>
            </StyledLink>
        </WideCard>
        <WideCard image={decoracion}>
            <StyledLink to="/DecoraPage">
             <span>DECORACION</span>
            </StyledLink>
        </WideCard>
        <WideCard image={jardin}>
            <StyledLink to="/GardenPage">
             <span>JARDIN</span>
            </StyledLink>
          
        </WideCard>
      </WideCardContainer>

      {/* Sección de Deportes */}
      <h2>DEPORTE</h2>
      <TechCardContainer>
        <TechWideCard image={futbol}>
            <StyledLink to="/deporte">
             <span>FUTBOL</span>
            </StyledLink>
        </TechWideCard>
        <TechWideCard image={baloncesto}>
            <StyledLink to="/BaloncestoPage">
             <span>BALONCESTO</span>
            </StyledLink>
        </TechWideCard>
        <TechWideCard image={variedad}>
            <StyledLink to="/VariedadPage">
             <span>VARIEDAD</span>
            </StyledLink>
        </TechWideCard>
      </TechCardContainer>
    </HomePageContainer>
  );
};

export default HomePage;

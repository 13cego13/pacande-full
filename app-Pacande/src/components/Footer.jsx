import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

// Contenedor principal del footer
const FooterContainer = styled.footer`
  background-color: #000000;
  position: relative;
  z-index: 5;
  padding: 40px 20px;
  text-align: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
`;

// Contenido del footer
const FooterContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
  }
`;

// Sección del footer
const Section = styled.div`
  flex-basis: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 0;
    text-align: center;
  }
`;

// Lista de enlaces
const Links = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    margin: 5px 0;

    a {
      color: #ffffff;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: #FF0000; // Color al pasar el mouse
      }
    }
  }
`;

// Iconos de redes sociales
const SocialIcons = styled.div`
  margin-top: 10px;

  a {
    color: #ffffff;
    margin: 0 10px;
    font-size: 24px;
    transition: color 0.3s;

    &:hover {
      color: #FF0000; // Color al pasar el mouse
    }
  }
`;

// Título de sección
const SectionTitle = styled.h4`
  color: #ff0000;
  margin-bottom: 10px;
`;

const Footer = () => {
  const handleContactClick = () => {
    window.scrollTo(0, 0); // Desplazarse a la parte superior
  };

  return (
    <FooterContainer>
      <FooterContent>
        <Section>
          <SectionTitle>Sobre Nosotros</SectionTitle>
          <p>
            Somos una empresa comprometida con brindar la mejor experiencia de compra en línea.
          </p>
        </Section>
        <Section>
          <SectionTitle>Enlaces útiles</SectionTitle>
          <Links>
            <li><Link to="/terms">Términos y condiciones</Link></li>
            <li><Link to="/privacy">Política de privacidad</Link></li>
            <li><Link to="/contact" onClick={handleContactClick}>Contacto</Link></li>
            <li><Link to="/help">Ayuda</Link></li>
          </Links>
        </Section>
        <Section>
          <SectionTitle>Síguenos</SectionTitle>
          <SocialIcons>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </SocialIcons>
        </Section>
      </FooterContent>
      <p>© 2024 Pacande. Todos los derechos reservados.</p>
    </FooterContainer>
  );
};

export default Footer;

import React from 'react';
import styled from '@emotion/styled';
import 'uikit/dist/css/uikit.min.css';
import { Link } from 'react-router-dom';

const TermsContainer = styled.div`
  background-color: #ffffff;
  color: #000000;
  padding: 40px 20px;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #ff0000;
  text-align: center;
  margin-top: 80px; /* Distancia adicional para evitar que el navbar tape el contenido */
  margin-bottom: 20px;
`;

const Section = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #000000;
  margin-bottom: 10px;
`;

const ContactLink = styled(Link)`
  display: block;
  margin: 20px 0;
  text-align: center;
  color: #ff0000;
  text-decoration: underline;

  &:hover {
    color: #d40000; /* Color más oscuro en hover */
  }
`;

const TermsPage = () => {
  return (
    <TermsContainer>
      <Title>Términos y Condiciones</Title>

      <Section>
        <SectionTitle>1. Introducción</SectionTitle>
        <p>Bienvenido a nuestra página. Al acceder y utilizar nuestro sitio web, aceptas cumplir con los siguientes términos y condiciones. Si no estás de acuerdo con estos términos, te recomendamos no utilizar nuestro sitio.</p>
      </Section>

      <Section>
        <SectionTitle>2. Uso del Sitio</SectionTitle>
        <p>Este sitio está destinado únicamente para el uso personal y no comercial. No puedes utilizar nuestro sitio para ningún propósito ilegal o no autorizado.</p>
      </Section>

      <Section>
        <SectionTitle>3. Propiedad Intelectual</SectionTitle>
        <p>Todo el contenido de este sitio, incluyendo textos, gráficos, logotipos y software, es propiedad de nuestra empresa o de nuestros proveedores y está protegido por las leyes de propiedad intelectual.</p>
      </Section>

      <Section>
        <SectionTitle>4. Modificaciones de Términos</SectionTitle>
        <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Te recomendamos revisar esta página periódicamente para estar al tanto de los cambios.</p>
      </Section>

      <Section>
        <SectionTitle>5. Contacto</SectionTitle>
        <p>Si tienes preguntas sobre estos términos, no dudes en contactarnos a través de nuestra página de contacto.</p>
      </Section>

      <ContactLink to="/contact">Contáctanos</ContactLink>
    </TermsContainer>
  );
};

export default TermsPage;

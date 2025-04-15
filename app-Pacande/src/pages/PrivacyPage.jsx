import React from 'react';
import styled from '@emotion/styled';
import 'uikit/dist/css/uikit.min.css';
import { Link } from 'react-router-dom';

const PrivacyContainer = styled.div`
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

const PrivacyPage = () => {
  return (
    <PrivacyContainer>
      <Title>Política de Privacidad</Title>

      <Section>
        <SectionTitle>1. Introducción</SectionTitle>
        <p>En nuestra página, la privacidad de nuestros usuarios es de suma importancia. Esta política explica cómo recopilamos, usamos y protegemos la información personal que proporcionas al usar nuestro sitio.</p>
      </Section>

      <Section>
        <SectionTitle>2. Información que Recopilamos</SectionTitle>
        <p>Recopilamos información personal cuando te registras en nuestro sitio, realizas un pedido o interactúas con nosotros. Esta información puede incluir tu nombre, dirección de correo electrónico, dirección de envío y detalles de pago.</p>
      </Section>

      <Section>
        <SectionTitle>3. Uso de la Información</SectionTitle>
        <p>Utilizamos la información recopilada para procesar tus pedidos, mejorar nuestro sitio y comunicarnos contigo sobre tus pedidos y ofertas especiales.</p>
      </Section>

      <Section>
        <SectionTitle>4. Protección de la Información</SectionTitle>
        <p>Tomamos medidas de seguridad adecuadas para proteger tu información personal contra accesos no autorizados, alteraciones o destrucción.</p>
      </Section>

      <Section>
        <SectionTitle>5. Cambios en Nuestra Política de Privacidad</SectionTitle>
        <p>Podemos actualizar esta política de privacidad de vez en cuando. Te notificaremos sobre cualquier cambio publicando la nueva política en esta página.</p>
      </Section>

      <ContactLink to="/contact">Contáctanos</ContactLink>
    </PrivacyContainer>
  );
};

export default PrivacyPage;

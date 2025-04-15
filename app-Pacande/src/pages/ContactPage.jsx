// src/pages/ContactPage.js
import React from 'react';
import styled from '@emotion/styled';

const ContactContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center ;
  margin: 10px 40px;
  background-color: #f4f4f4; /* Fondo claro */
  min-height: 100vh;
  gap: 40px; /* Espacio entre las columnas */
`;

const ContactFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%; 
`;

const ContactTitle = styled.h1`
  color: #ff0000; /* Rojo del estilo de la app */
  margin-bottom: 20px;
`;

const ContactText = styled.p`
  color: #333;
  max-width: 600px;
  text-align: left;
  margin-bottom: 40px;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  min-height: 100px;
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #ff0000; /* Botón rojo */
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cc0000; /* Color oscuro al hacer hover */
  }
`;

const MapContainer = styled.div`
  width: 50%; /* El mapa ocupa el 50% del ancho */
  iframe {
    width: 100%;
    border: none;
    height: 450px;
    border: 2px solid #000; /* Borde de 1px color negro */
  }
`;

const LocationTitle = styled.h2`
  color: #ff0000;
  margin-bottom: 20px;
`;

const ContactPage = () => {
  return (
    <ContactContainer>
      <ContactFormContainer>
        <ContactTitle>Contacto</ContactTitle>
        <ContactText>
          Si tienes alguna pregunta, no dudes en comunicarte con nosotros llenando el siguiente formulario.
        </ContactText>
        <ContactForm>
          <InputField type="text" placeholder="Nombre" />
          <InputField type="email" placeholder="Correo Electrónico" />
          <TextArea placeholder="Escribe tu mensaje aquí..." />
          <SubmitButtonContainer>
            <SubmitButton type="submit">Enviar</SubmitButton>
          </SubmitButtonContainer>
        </ContactForm>
      </ContactFormContainer>

      <MapContainer>
        <LocationTitle>Ubicación Atención al Cliente</LocationTitle>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1992.296125645193!2d-75.29339491736967!3d2.9328919163689875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b7461923f146b%3A0x246fb0668c08d133!2zQm9va2Fmw6k!5e0!3m2!1ses!2sco!4v1729444789151!5m2!1ses!2sco"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </MapContainer>
    </ContactContainer>
  );
};

export default ContactPage;


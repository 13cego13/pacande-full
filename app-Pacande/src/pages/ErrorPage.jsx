// src/pages/ErrorPage.js
import React from 'react';
import styled from '@emotion/styled';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  color: #fff;
  background-color: #000; /* Fondo negro */
  z-index: 100000;
`;

const ErrorCode = styled.h1`
  font-size: 100px;
  color: #FF0000; /* Rojo */
`;

const ErrorMessage = styled.h2`
  font-size: 24px;
`;

const ErrorPage = () => {
  return (
    <ErrorContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorMessage>Página no encontrada</ErrorMessage>
      <p>La página que estás buscando no existe o ha sido movida.</p>
    </ErrorContainer>
  );
};

export default ErrorPage;

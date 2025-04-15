import React from 'react';
import styled from '@emotion/styled';

const TooltipContainer = styled.div`
  position: absolute;
  top: 70%; /* Ahora se coloca justo debajo del botón */
  left: 50%; /* Centra horizontalmente */
  transform: translateX(-50%); /* Centra el tooltip */
  background-color: #333; /* Fondo oscuro */
  color: #fff; /* Color de texto blanco */
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px; /* Tamaño de fuente */
  white-space: nowrap; /* Evita que el texto se divida en varias líneas */
  z-index: 101; /* Asegura que el tooltip esté por encima de otros elementos */
  transition: opacity 0.3s;
  opacity: ${({ visible }) => (visible ? 1 : 0)}; /* Transición de visibilidad */
`;

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }} 
      onMouseEnter={() => setVisible(true)} 
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <TooltipContainer visible={visible}>
        {text}
      </TooltipContainer>
    </div>
  );
};

export default Tooltip;

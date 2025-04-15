import React from 'react';
import styled from '@emotion/styled';
import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit';

const HelpContainer = styled.div`
  background-color: #ffffff;
  color: #000000;
  padding: 40px;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #ff0000;
  text-align: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.h2`
  color: #000000;
  margin-bottom: 20px;
  text-align: center;
`;

const HelpContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-size: 18px;
  line-height: 1.6;

  p {
    margin-bottom: 15px;
  }

  ul {
    padding-left: 20px;
    list-style-type: disc;
  }
`;

const Accordion = styled.div`
  margin: 20px auto; /* Centra el acordeón */
  max-width: 800px; /* Ancho máximo igual al contenido */

  .uk-accordion-title {
    background-color: #000000;
    color: #ffffff;
    padding: 15px;
    border-radius: 5px;
    text-align: left; /* Alineación del texto a la izquierda */
    transition: background-color 0.3s, color 0.3s; /* Añadir transición */

    &:hover {
      background-color: #ff0000; /* Color de fondo en hover */
      color: #ffffff; /* Texto en blanco cuando está en hover */
    }

    
  }

  .uk-accordion-content {
    padding: 15px;
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .uk-open .uk-accordion-title {
    background-color: #ff000; /* Color de fondo cuando está abierto */
    color: #ffffff; /* Texto en blanco cuando está abierto */
  }
`;

// Estilo para acordeón interno
const InnerAccordion = styled.div`
  margin-top: 10px; /* Espacio superior para acordeón interno */

  .uk-accordion-title {
    background-color: #ff000; /* Fondo azul claro para acordeón interno */
    color: #ffffff; /* Texto blanco por defecto */
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s; /* Añadir transición */

    &:hover {
      background-color: #ff000; /* Color de fondo más oscuro en hover */
      color: #ffffff; /* Texto en blanco cuando está en hover */
    }

     &:focus {
      background-color: #ff000; /* Color de fondo más oscuro en hover */
      color: #ffffff; /* Texto en blanco cuando está en hover */
    }
  }

  .uk-accordion-content {
    padding: 10px;
    background-color: #eaeaea; /* Fondo claro para contenido interno */
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .uk-open .uk-accordion-title {
    background-color: #ff00000; /* Color de fondo más oscuro cuando está abierto */
    color: #ffffff; /* Texto en blanco cuando está abierto */
  }
`;

const HelpPage = () => {
  return (
    <HelpContainer>
      <Title>Ayuda</Title>
      <SubTitle>Encuentra respuestas a las preguntas más comunes</SubTitle>

      <HelpContent>
        <p>Bienvenido a nuestra página de Ayuda. Aquí podrás encontrar información detallada sobre cómo utilizar nuestro sitio web y solucionar problemas comunes. Si tienes alguna otra duda, no dudes en contactarnos.</p>
        
        <h3>Guía rápida:</h3>
        <ul>
          <li>Compra productos fácilmente siguiendo los pasos de nuestro proceso de compra.</li>
          <li>Realiza pagos seguros con diferentes métodos de pago.</li>
          <li>Consulta nuestra política de devoluciones para más información sobre cambios o reembolsos.</li>
          <li>Accede a tu cuenta para ver el estado de tus pedidos.</li>
        </ul>
        
        <p>Navega por las preguntas más frecuentes a continuación para obtener más detalles sobre los temas más consultados.</p>
      </HelpContent>

      <Accordion>
        <ul uk-accordion="multiple: true">
          <li>
            <a className="uk-accordion-title" href="#">¿Cómo puedo comprar en la página?</a>
            <div className="uk-accordion-content">
              <p>Para comprar en nuestra página, selecciona los productos que desees y agréguelos a tu carrito. Luego, sigue los pasos del proceso de pago.</p>
              <InnerAccordion>
                <ul uk-accordion="multiple: true">
                  <li>
                    <a className="uk-accordion-title" href="#">¿Qué pasa si tengo problemas durante el proceso de compra?</a>
                    <div className="uk-accordion-content">
                      <p>Si experimentas problemas, asegúrate de que tu conexión a internet sea estable. Si el problema persiste, contáctanos a través de nuestro formulario de contacto.</p>
                    </div>
                  </li>
                  <li>
                    <a className="uk-accordion-title" href="#">¿Puedo modificar mi pedido después de haberlo realizado?</a>
                    <div className="uk-accordion-content">
                      <p>Una vez que tu pedido ha sido confirmado, no podrás modificarlo. Sin embargo, puedes cancelar tu pedido y realizar uno nuevo si es necesario.</p>
                    </div>
                  </li>
                </ul>
              </InnerAccordion>
            </div>
          </li>
          <li>
            <a className="uk-accordion-title" href="#">¿Qué métodos de pago aceptan?</a>
            <div className="uk-accordion-content">
              <p>Aceptamos tarjetas de crédito, débito y pagos por PayPal. También ofrecemos la opción de pagar mediante transferencias bancarias.</p>
              <InnerAccordion>
                <ul uk-accordion="multiple: true">
                  <li>
                    <a className="uk-accordion-title" href="#">¿Qué hago si mi pago no se procesa?</a>
                    <div className="uk-accordion-content">
                      <p>Si tu pago no se procesa, verifica que los detalles de tu tarjeta sean correctos y que tengas fondos suficientes. Si el problema persiste, contacta a tu banco.</p>
                    </div>
                  </li>
                  <li>
                    <a className="uk-accordion-title" href="#">¿Es seguro pagar en su página?</a>
                    <div className="uk-accordion-content">
                      <p>Sí, utilizamos protocolos de seguridad avanzados para proteger tu información personal y financiera durante el proceso de pago.</p>
                    </div>
                  </li>
                </ul>
              </InnerAccordion>
            </div>
          </li>
          <li>
            <a className="uk-accordion-title" href="#">¿Cómo hago seguimiento a mi pedido?</a>
            <div className="uk-accordion-content">
              <p>Después de realizar tu pedido, recibirás un correo electrónico con un enlace para rastrear el estado de tu compra.</p>
              <InnerAccordion>
                <ul uk-accordion="multiple: true">
                  <li>
                    <a className="uk-accordion-title" href="#">¿Qué debo hacer si no recibo el correo de seguimiento?</a>
                    <div className="uk-accordion-content">
                      <p>Si no recibes el correo de seguimiento, revisa tu carpeta de spam. Si no lo encuentras, contáctanos para que podamos ayudarte.</p>
                    </div>
                  </li>
                </ul>
              </InnerAccordion>
            </div>
          </li>
          <li>
            <a className="uk-accordion-title" href="#">¿Cuál es la política de devoluciones?</a>
            <div className="uk-accordion-content">
              <p>Puedes devolver los productos en un plazo de 30 días después de la compra, siempre y cuando se encuentren en su estado original.</p>
              <InnerAccordion>
                <ul uk-accordion="multiple: true">
                  <li>
                    <a className="uk-accordion-title" href="#">¿Cómo inicio una devolución?</a>
                    <div className="uk-accordion-content">
                      <p>Para iniciar una devolución, visita nuestra sección de devoluciones en el sitio web y completa el formulario correspondiente.</p>
                    </div>
                  </li>
                  <li>
                    <a className="uk-accordion-title" href="#">¿Los gastos de envío son reembolsables?</a>
                    <div className="uk-accordion-content">
                      <p>No, los gastos de envío no son reembolsables, a menos que el producto esté defectuoso o haya un error en el envío.</p>
                    </div>
                  </li>
                </ul>
              </InnerAccordion>
            </div>
          </li>
        </ul>
      </Accordion>
    </HelpContainer>
  );
};

export default HelpPage;

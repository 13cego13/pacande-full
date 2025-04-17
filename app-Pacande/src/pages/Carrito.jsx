import React from 'react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button
} from '@mui/material';

const Carrito = () => {
  const { cartItems, removeFromCart } = useCart();

  // Cálculo del total, asegurándonos de que cada precio sea un número válido
  const total = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingTop: '130px',     // Espacio para el navbar
        paddingBottom: '120px'   // Espacio para el footer
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        🛒 Tu Carrito
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" align="center">
          El carrito está vacío.
        </Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cartItems.map((item) => (
              <Grid item xs={12} md={6} key={item._id}> {/* Usamos _id aquí */}
                <ProductCard
                  id={item._id}             
                  name={item.name}           // Pasa el nombre
                  description={item.description}  // Pasa la descripción
                  price={item.price}         // Pasa el precio
                  image={item.image}         // Pasa la imagen
                  removeFromCart={removeFromCart} // Pasa la función para eliminar
                  showActions={false} // Oculta botones y estrellas
                />
              </Grid>
            ))}
          </Grid>

          <Grid container justifyContent="space-between" sx={{ mt: 3 }}>
            <Grid item>
              <Typography variant="h6">
                Total: <strong>{total.toLocaleString()} COP</strong>
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="success" sx={{ mt: 2 }}>
                Proceder al pago
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Carrito;

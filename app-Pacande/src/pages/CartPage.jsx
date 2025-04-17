import React from 'react';
import { useCart } from '../context/CartContext';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Divider,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingTop: '120px',     // Espacio para el navbar
        paddingBottom: '120px',  // Espacio para el footer
      }}
    >
      <Typography variant="h4" gutterBottom align="center" color="primary.main">
        Carrito de Compras
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary">
          Tu carrito está vacío 🛒
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cartItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}> {/* Usamos _id aquí */}
                <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: '100%', height: 200, objectFit: 'contain' }}
                    image={item.image || 'http://placekitten.com/500/500'}
                    alt={item.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" color="text.primary">
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      ${item.price}
                    </Typography>
                    {item.category && (
                      <Typography variant="body2" color="text.secondary">
                        Categoría: {item.category}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <IconButton color="error" onClick={() => removeFromCart(item._id)}> {/* Usamos _id aquí también */}
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ marginY: 4 }} />

          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 2 }}>
              <Button variant="outlined" color="error" onClick={clearCart}>
                Vaciar Carrito
              </Button>
              <Button variant="contained" color="primary">
                Proceder al Pago
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CartPage;

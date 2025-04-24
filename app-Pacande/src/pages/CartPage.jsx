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
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

  // Calcular el total general
  const total = cartItems.reduce((sum, item) => {
    const price = item.price || 0; // Validar que el precio exista
    const quantity = item.quantity || 0; // Validar que la cantidad exista
    return sum + price * quantity;
  }, 0);

  return (
    <Container
      maxWidth="lg"
      sx={{
        paddingTop: '120px', // Espacio para el navbar
        paddingBottom: '20px', // Espacio para el footer
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
            {cartItems.map((item) => {
              const price = item.price || 0; // Validar que el precio exista
              const quantity = item.quantity || 0; // Validar que la cantidad exista
              const subtotal = price * quantity; // Calcular el subtotal

              return (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: '100%', height: 200, objectFit: 'contain' }}
                      image={item.image || 'http://placekitten.com/500/500'}
                      alt={item.title || 'Producto'}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" color="text.primary">
                        {item.title || 'Producto sin título'}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Precio unitario: ${price.toFixed(2)}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Subtotal: ${subtotal.toFixed(2)}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 2 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => updateQuantity(item._id, quantity - 1)}
                          disabled={quantity <= 1}
                        >
                          -
                        </Button>
                        <TextField
                          value={quantity}
                          size="small"
                          inputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                          sx={{ width: 50 }}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => updateQuantity(item._id, quantity + 1)}
                        >
                          +
                        </Button>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      {/* Ícono de eliminar */}
                      <IconButton
                        color="error"
                        onClick={() => removeFromCart(item._id)}
                        title="Eliminar del carrito"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Divider sx={{ marginY: 4 }} />
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6" color="text.primary">
              Total: ${total.toFixed(2)}
            </Typography>
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
import React from 'react';
import { Container, Box, Grid, Typography } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import CartItem from '../components/CartItem/CartItem';
import useAppSelector from '../Hooks/useAppSelector';
import CartCalculator from '../components/CartCalculator/CartCalculator';
import CenteredContainer from '../components/CenterContainer/CenterContainer';
import { CartItem as CartItemType } from '../types/cart';

const Cart = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  if (!cartItems.length) {
    return (
      <CenteredContainer>
        <Typography gutterBottom>YOUR BAG IS EMPTY!!</Typography>
        <ShoppingBagIcon style={{ fontSize: '5rem' }} />
      </CenteredContainer>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} marginTop={'2rem'}>
        <Grid item xs={12} md={8}>
          <Box mt={4}>
            {cartItems.map((item: CartItemType) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <CartCalculator />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;

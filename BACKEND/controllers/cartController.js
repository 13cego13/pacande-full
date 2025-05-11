import Cart from '../models/Cart.js';

export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();
      res.status(200).json(cart);
    } else {
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity }],
      });

      res.status(201).json(newCart);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};

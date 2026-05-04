import Cart from '../models/Cart.js';

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (cart) {
      res.status(200).json(cart.cartItems);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil keranjang', error: error.message });
  }
};

export const syncCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    
    let cart = await Cart.findOne({ userId });

    if (cart) {
      cart.cartItems = cartItems;
      await cart.save();
    } else {
      cart = new Cart({ userId, cartItems });
      await cart.save();
    }
    
    res.status(200).json({ message: 'Keranjang berhasil disinkronisasi dengan database' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menyimpan keranjang', error: error.message });
  }
};
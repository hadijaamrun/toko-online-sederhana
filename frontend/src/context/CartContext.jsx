import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext'; 

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    const fetchCartFromDB = async () => {
      if (user && user._id) {
        try {
          const response = await axios.get(`https://toko-online-sederhana.vercel.app/api/cart/${user._id}`);
          setCart(response.data);
        } catch (error) {
          console.error("Gagal menarik keranjang dari database:", error);
        }
      } else {
        const savedCart = localStorage.getItem('cartItems_guest');
        setCart(savedCart ? JSON.parse(savedCart) : []);
      }
    };
    
    fetchCartFromDB();
  }, [user]);

  useEffect(() => {
    const syncCartToDB = async () => {
      if (user && user._id) {
        try {e
          await axios.post('https://toko-online-sederhana.vercel.app/api/cart/sync', {
            userId: user._id,
            cartItems: cart
          });
        } catch (error) {
          console.error("Gagal menyimpan keranjang ke database:", error);
        }
      } else {
        localStorage.setItem('cartItems_guest', JSON.stringify(cart));
      }
    };

    syncCartToDB();
  }, [cart, user]);

  const addToCart = (product, quantity = 1) => { 
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + quantity,
        };
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: quantity }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; 

    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        clearCart,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import '../styles/cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="empty-cart-wrapper">
        <div className="empty-cart-minimal">
          <h2>Keranjang Anda masih kosong</h2>
          <p>Mari jelajahi produk kami dan temukan yang Anda butuhkan.</p>
          <Link to="/products" className="btn-simple">
            Lihat Produk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container cart-container">
      <h2>Keranjang Belanja</h2>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={`/${item.image}`} alt={item.name} />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-price">Rp {item.price.toLocaleString('id-ID')}</p>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button className="btn-remove" onClick={() => removeFromCart(item.id)}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Ringkasan Belanja</h3>
          <div className="summary-row">
            <span>Total Harga</span>
            <strong>Rp {getCartTotal().toLocaleString('id-ID')}</strong>
          </div>
          <button className="btn-checkout">Checkout Sekarang</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
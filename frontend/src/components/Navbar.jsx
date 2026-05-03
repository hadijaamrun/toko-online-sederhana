import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>TOS</h2>
      </div>
      <div className="navbar-links">
        <Link to="/">Beranda</Link>
        <Link to="/products">Produk</Link>
        
        {user ? (
          <>
            <Link to="/cart" className="cart-link">
              🛒 Keranjang {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
            <span className="nav-user-greeting">Halo, {user.name}</span>
            <button onClick={handleLogout} className="btn-nav-logout">Keluar</button>
          </>
        ) : (
          <Link to="/login" className="btn-nav-login">Masuk!</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
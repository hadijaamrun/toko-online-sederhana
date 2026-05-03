import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext'; 
import '../styles/Product.css'; 

const API_URL = 'http://localhost:5000/uploads/';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('https://toko-online-sederhana.vercel.app/api/products');
        setProduct({ ...response.data, id: response.data._id });
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="container" style={{textAlign: 'center', marginTop: '5rem'}}><h2>⏳ Memuat...</h2></div>;
  if (!product) return <div className="container" style={{textAlign: 'center'}}><h2>Produk tidak ditemukan.</h2><Link to="/products">Kembali</Link></div>;

  return (
    <div className="container product-detail-container">
      <Link to="/products" className="back-link">&larr; Kembali ke Daftar Produk</Link>
      <div className="detail-layout">
        <div className="detail-image-wrapper">
          <img src={`${API_URL}${product.image}`} alt={product.name} className="detail-image" />
        </div>
        <div className="detail-info">
          <span className="product-badge">TOS Original</span>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">Rp {product.price.toLocaleString('id-ID')}</p>
          <div className="detail-divider"></div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            <button className="btn-buy" onClick={() => { addToCart(product, quantity); alert('Ditambahkan ke keranjang!'); }}>
              🛒 Masukkan Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
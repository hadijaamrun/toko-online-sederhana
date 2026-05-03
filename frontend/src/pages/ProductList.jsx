import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Product.css'; 

const API_URL = 'http://localhost:5000/uploads/';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        const normalizedData = response.data.map(item => ({ ...item, id: item._id }));
        setProducts(normalizedData);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="container" style={{textAlign: 'center', marginTop: '5rem'}}><h2>⏳ Memuat Produk...</h2></div>;

  return (
    <div className="container">
      <h2>Daftar Produk Kami</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={`${API_URL}${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Rp {product.price.toLocaleString('id-ID')}</p>
            <Link to={`/products/${product.id}`} className="btn-detail">Lihat Detail</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
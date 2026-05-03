import { Link } from 'react-router-dom';
import '../styles/Home.css'; 

const Home = () => {
  return (
    <div>
      <header className="hero-section">
        <div className="hero-content">
          <h1>Gaya Kasual Terbaik Ada di TOS</h1>
          <p>Temukan koleksi sepatu, tas, dan pakaian dengan kualitas premium dan harga terjangkau.</p>
          <Link to="/products" className="btn-cta">Belanja Sekarang</Link>
        </div>
      </header>

      <section className="features-section">
        <div className="feature-box">
          <h3>🚚 Gratis Ongkir</h3>
          <p>Pengiriman bebas biaya ke seluruh Indonesia tanpa syarat yang rumit.</p>
        </div>
        <div className="feature-box">
          <h3>⭐ Kualitas Premium</h3>
          <p>Semua barang telah melewati uji seleksi untuk menjamin kepuasan Anda.</p>
        </div>
        <div className="feature-box">
          <h3>⚡ Respon Cepat</h3>
          <p>Pesan hari ini, barang langsung kami proses dan kirim di hari yang sama.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
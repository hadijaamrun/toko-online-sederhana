import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Auth.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan. Periksa email dan password Anda.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Masuk ke TOS</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={submitHandler} className="auth-form">
          <input 
            type="email" 
            placeholder="Email" 
            className="auth-input"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="auth-input"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="btn-auth">Masuk</button>
        </form>
        
        <p className="auth-footer">
          Belum punya akun? 
          <Link to="/register" className="auth-link">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
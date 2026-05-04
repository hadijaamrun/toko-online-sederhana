import { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  });

  const login = async (email, password) => {
    const response = await axios.post('https://toko-online-sederhana.vercel.app/api/users/login', { email, password });
    setUser(response.data);
    localStorage.setItem('userInfo', JSON.stringify(response.data)); 
  };

  const register = async (name, email, password) => {
    const response = await axios.post('https://toko-online-sederhana.vercel.app/api/users/register', { name, email, password });
    setUser(response.data);
    localStorage.setItem('userInfo', JSON.stringify(response.data)); 
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo'); 
    
    localStorage.removeItem('cartItems'); 
    window.location.reload(); 
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
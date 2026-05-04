import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'; 
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    'https://toko-kasual-sederhana.vercel.app', 
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  console.log('Menghubungkan ke MongoDB Atlas...');
  return mongoose.connect(process.env.MONGO_URI);
};
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next(); 
  } catch (err) {
    console.error('❌ Gagal terhubung ke Database:', err);
    res.status(500).json({ message: 'Terjadi kesalahan pada koneksi database.' });
  }
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);

app.get('/', (req, res) => {
  res.send('API Toko Online Berjalan Lancar! 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

export default app;
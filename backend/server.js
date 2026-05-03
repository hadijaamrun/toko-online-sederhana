import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/images')));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Terhubung ke database MongoDB Atlas'))
  .catch((err) => console.error('❌ Gagal terhubung ke MongoDB:', err));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server berjalan pada port ${PORT}`));
import mongoose from 'mongoose';
import Product from './models/Product.js';

mongoose.connect('mongodb://127.0.0.1:27017/toko_online_db');

const sampleProducts = [
  {
    name: "Sepatu Sneakers TOS",
    price: 250000,
    description: "Sepatu sneakers kasual yang nyaman digunakan sehari-hari.",
    image: "sepatu.png"
  },
  {
    name: "Kaos Polos Premium",
    price: 75000,
    description: "Kaos katun 100% yang menyerap keringat dan anti gerah.",
    image: "kaospolos.png"
  },
  {
    name: "Tas Ransel TOS",
    price: 150000,
    description: "Tas ransel luas dengan banyak kompartemen untuk laptop dan buku.",
    image: "tas.png"
  },
  {
    name: "Topi Baseball TOS",
    price: 45000,
    description: "Topi bergaya kasual untuk melindungi dari sinar matahari.",
    image: "topi.png"
  },
  {
    name: "Jaket Bomber TOS",
    price: 350000,
    description: "Jaket bomber bahan premium, tahan angin dan stylish.",
    image: "jaket.png"
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log('✅ Data berhasil dimasukkan ke MongoDB!');
    process.exit();
  } catch (error) {
    console.error('❌ Gagal:', error);
    process.exit(1);
  }
};

importData();
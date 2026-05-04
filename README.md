Markdown
# TOS - Toko Online Sederhana 

TOS adalah aplikasi e-commerce sederhana berbasis web yang dibangun menggunakan **MERN Stack** (MongoDB, Express.js, React, Node.js). Aplikasi ini memungkinkan pengguna untuk melihat daftar produk, melihat detail produk, mengelola keranjang belanja, serta melakukan pendaftaran akun.

## Fitur Utama
*   **Autentikasi Pengguna**: Registrasi dan Login akun (menggunakan JWT & Context API).
*   **Manajemen Produk**: Menampilkan daftar produk secara dinamis dari database.
*   **Detail Produk**: Informasi lengkap produk beserta pemilihan jumlah (*quantity*).
*   **Keranjang Belanja**: Menambah, menghapus, dan memperbarui jumlah item di keranjang dengan kalkulasi total harga otomatis.
*   **Responsive Design**: Tampilan yang optimal di berbagai perangkat.

##  Teknologi yang Digunakan
*   **Frontend**: React.js, Vite, Axios, React Router, Context API.
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB Atlas (Cloud).
*   **Deployment**: Vercel (Frontend & Backend).

##  Struktur Folder
```text
toko-online/
├── backend/            # Server-side (Node.js & Express)
│   ├── models/         # Skema Database (Mongoose)
│   ├── routes/         # Endpoint API
│   ├── server.js       # Entry point server
│   └── seeder.js       # Script untuk mengisi data awal
├── frontend/           # Client-side (React & Vite)
│   ├── public/         # File gambar statis
│   ├── src/
│   │   ├── components/ # Komponen UI
│   │   ├── context/    # State Management (Cart & Auth)
│   │   └── pages/      # Halaman aplikasi
└── README.md
⚙️ Instalasi Lokal
Jika ingin menjalankan proyek ini di laptop sendiri:

Clone Repositori

Bash
git clone [https://github.com/username-anda/toko-online-sederhana.git](https://github.com/username-anda/toko-online-sederhana.git)
cd toko-online-sederhana
Setup Backend

Bash
cd backend
npm install
Buat file .env di folder backend dan isi dengan:

Code snippet
MONGO_URI=your_mongodb_atlas_uri
PORT=5000
Jalankan server: node server.js

Setup Frontend

Bash
cd ../frontend
npm install
npm run dev
🌐 Link Deployment
Frontend (Website): https://toko-kasual-sederhana.vercel.app

Backend API: https://toko-online-sederhana.vercel.app/api/products


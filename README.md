# Course Management API

RESTful API untuk manajemen data kursus menggunakan Node.js, Express, dan MySQL.

## 📋 Deskripsi

API ini menyediakan endpoints untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada data kursus. Dilengkapi dengan dokumentasi Swagger/OpenAPI untuk memudahkan pengembangan dan testing.

## 🚀 Fitur

- ✅ Mendapatkan semua data kursus
- ✅ Mendapatkan data kursus berdasarkan ID
- ✅ Menambah kursus baru
- ✅ Mengupdate data kursus
- ✅ Menghapus data kursus
- 📚 Dokumentasi API dengan Swagger UI
- 🗄️ Database MySQL
- 🔧 Error handling yang lengkap

## 🛠️ Teknologi yang Digunakan

- **Node.js** - Runtime JavaScript
- **Express.js** - Web framework
- **MySQL** - Database
- **Swagger UI Express** - Dokumentasi API
- **Swagger JSDoc** - Generate dokumentasi dari komentar
- **Nodemon** - Development server dengan auto-reload

## 📦 Instalasi

### 1. Clone repository

```bash
git clone <repository-url>
cd mission-2-intermediate-be
2. Install dependencies
bash
npm install
3. Setup Database
Pastikan MySQL sudah terinstall dan running
Buat database baru
Import file SQL yang diperlukan
Konfigurasi koneksi database di config/db.js

4. Jalankan aplikasi

npm start
atau langsung dengan node:

node app.js


🔧 Konfigurasi
Pastikan file konfigurasi database (config/db.js) sudah sesuai dengan environment Anda:


const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

module.exports = conn;


📚 API Endpoints
Courses
Method	Endpoint	      Description
GET	   /course	      Mendapatkan semua data courses
GET	   /course/:id	   Mendapatkan course berdasarkan ID
POST	   /course	      Membuat course baru
PUT	   /course/:id	   Mengupdate course berdasarkan ID
DELETE	/course/:id	   Menghapus course berdasarkan ID


🎯 Contoh Penggunaan
1. Mendapatkan Semua Courses
GET http://localhost:3000/course

2. Mendapatkan Course by ID
GET http://localhost:3000/course/1

3. Menambah Course Baru
POST http://localhost:3000/course
Content-Type: application/json

{
  "title": "JavaScript Fundamentals",
  "description": "Belajar dasar-dasar JavaScript",
  "thumbnail_url": "https://example.com/thumbnail.jpg",
  "price": 199000,
  "category_id": 1,
  "instructor_id": 1,
  "average_rating": 4.5,
  "total_ratings": 100,
  "is_published": true
}

4. Mengupdate Course
PUT http://localhost:3000/course/1
Content-Type: application/json

{
  "title": "JavaScript Fundamentals Updated",
  "description": "Belajar dasar-dasar JavaScript - Updated",
  "thumbnail_url": "https://example.com/thumbnail.jpg",
  "price": 199000,
  "category_id": 1,
  "instructor_id": 1,
  "average_rating": 4.5,
  "total_ratings": 100,
  "is_published": true
}

5. Menghapus Course
DELETE http://localhost:3000/course/1

📖 Dokumentasi API
Dokumentasi API lengkap dapat diakses melalui Swagger UI:

http://localhost:3000/api-docs

# CampusEventHUB

CampusEventHUB adalah sistem terintegrasi berbasis microservices untuk mengelola berbagai kegiatan kampus seperti seminar, workshop, webinar, lomba, pelatihan, dan sertifikasi.

## 🚀 Port Configuration (Konfigurasi Port)

Untuk menghindari bentrokan (collision) saat menjalankan semua service secara lokal, berikut adalah port yang telah ditentukan untuk masing-masing service:

| Service Name | Technology / Framework | Port | URL Lokal |
| :--- | :--- | :--- | :--- |
| **frontend** | Next.js 15 (React 19) | `3000` | `http://localhost:3000` |
| **user-service** | Laravel 12 (PHP 8.2+) | `8001` | `http://localhost:8001` |
| **event-service** | Laravel 12 (PHP 8.2+) | `8002` | `http://localhost:8002` |
| **registration-service** | Laravel 12 (PHP 8.2+) | `8003` | `http://localhost:8003` |
| **notification-service** | Laravel 12 (PHP 8.2+) | `8004` | `http://localhost:8004` |

---

## 🛠️ Cara Menjalankan Service Secara Lokal (How to Run Locally)

### 1. Menjalankan Backend Services (Laravel)
Masuk ke masing-masing direktori service (misal: `user-service`) dan jalankan Artisan Server dengan port spesifik:

```bash
# Jalankan User Service (Port 8001)
cd user-service
php artisan serve --port=8001

# Jalankan Event Service (Port 8002)
cd ../event-service
php artisan serve --port=8002

# Jalankan Registration Service (Port 8003)
cd ../registration-service
php artisan serve --port=8003

# Jalankan Notification Service (Port 8004)
cd ../notification-service
php artisan serve --port=8004
```

### 2. Menjalankan Frontend App (Next.js)
Masuk ke folder `frontend` dan jalankan development server:

```bash
cd frontend
npm run dev
```

---

## 📂 Struktur Repositori

```text
CampusEventHUB/
├── docs/                 # Dokumentasi sistem & desain
├── frontend/             # Next.js 15 Frontend
├── user-service/         # User Microservice (Laravel 12)
├── event-service/        # Event Microservice (Laravel 12)
├── registration-service/ # Registration Microservice (Laravel 12)
├── notification-service/ # Notification Microservice (Laravel 12)
├── LICENSE               # MIT License
└── README.md             # Dokumen panduan utama ini
```

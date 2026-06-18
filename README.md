<div align="center">

# 🎓 CampusEventHUB

**Integrated Campus Event Management Platform built with Microservices Architecture**

[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-Message%20Broker-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)](https://www.rabbitmq.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p>
  <strong>CampusEventHUB</strong> adalah platform terintegrasi berbasis microservices untuk mengelola berbagai kegiatan kampus — mulai dari seminar, workshop, webinar, lomba, pelatihan, hingga penerbitan sertifikat digital secara otomatis.
</p>

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Services & Ports](#-services--ports)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Overview](#-api-overview)
- [Message Broker Events](#-message-broker-events)
- [Database Design](#-database-design)
- [Documentation](#-documentation)
- [Team](#-team)
- [License](#-license)

---

## 🌟 Overview

CampusEventHUB hadir sebagai solusi atas permasalahan umum dalam pengelolaan event kampus yang selama ini dilakukan secara manual — melalui formulir terpisah, spreadsheet, dan media sosial.

Platform ini mengintegrasikan seluruh proses dalam satu ekosistem yang kohesif:

- 🔍 **Mahasiswa** dapat menemukan dan mendaftar event secara online.
- 🛠️ **Panitia** dapat mengelola event, peserta, dan melihat statistik secara real-time.
- 🤖 **Sistem** mengirim notifikasi otomatis dan menerbitkan sertifikat digital setelah event selesai.

> Proyek ini dikembangkan sebagai implementasi konsep **Enterprise Application Integration (EAI)** menggunakan pendekatan **Microservices Architecture**.

---

## ✨ Features

<table>
<thead>
  <tr>
    <th>🎓 Mahasiswa</th>
    <th>🛠️ Panitia (Committee)</th>
    <th>🤖 Sistem</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Registrasi & Login akun</td>
    <td>Membuat & mengedit event</td>
    <td>Notifikasi otomatis via RabbitMQ</td>
  </tr>
  <tr>
    <td>Melihat daftar & detail event</td>
    <td>Mengelola peserta & kehadiran</td>
    <td>Penerbitan sertifikat digital</td>
  </tr>
  <tr>
    <td>Pendaftaran event online</td>
    <td>Mempublikasikan event</td>
    <td>GraphQL via Hasura & Lighthouse</td>
  </tr>
  <tr>
    <td>Riwayat pendaftaran</td>
    <td>Melihat statistik event</td>
    <td>Role-Based Access Control (RBAC)</td>
  </tr>
  <tr>
    <td>Unduh sertifikat digital</td>
    <td>Manajemen kategori event</td>
    <td>Docker-based deployment</td>
  </tr>
</tbody>
</table>

---

## 🏛️ Architecture

CampusEventHUB menggunakan **Microservices Architecture** di mana setiap service memiliki database, REST API, GraphQL, dan container Docker-nya sendiri. Komunikasi antar service dilakukan melalui REST API, GraphQL, dan **RabbitMQ** sebagai message broker.

```
┌────────────────────────────────────────────────────┐
│                   Frontend (Next.js 15)            │
│               http://localhost:3000                │
└──────────────────────┬─────────────────────────────┘
                       │  REST API / GraphQL
          ┌────────────┼────────────────────┐
          │            │                    │
          ▼            ▼                    ▼
   ┌────────────┐ ┌──────────────┐ ┌────────────────┐
   │    User    │ │    Event     │ │  Registration  │
   │  Service   │ │   Service    │ │    Service     │
   │ :8001      │ │   :8002      │ │    :8003       │
   └─────┬──────┘ └──────┬───────┘ └───────┬────────┘
         │               │                 │
         ▼               ▼                 ▼
    MySQL (users)  MySQL (events)  MySQL (registrations)
         │               │                 │
         └───────────────┴─────────────────┘
                         │
                    ┌────▼─────┐
                    │ RabbitMQ │
                    └────┬─────┘
                         │
                         ▼
              ┌──────────────────────┐
              │  Notification &      │
              │  Certificate Service │
              │       :8004          │
              └──────────┬───────────┘
                         │
                         ▼
               MySQL (notifications)

         ┌───────────────────────┐
         │  Hasura GraphQL Engine│
         │  (Auto-generated API) │
         └───────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS |
| **Backend** | Laravel 12, PHP 8.3 |
| **Database** | MySQL 8 (per-service) |
| **GraphQL (Manual)** | Laravel Lighthouse |
| **GraphQL Engine** | Hasura |
| **Message Broker** | RabbitMQ |
| **Containerization** | Docker, Docker Compose |

---

## 🌐 Services & Ports

| Service | Framework | Port | Local URL |
| :--- | :--- | :---: | :--- |
| **frontend** | Next.js 15 (React 19) | `3000` | http://localhost:3000 |
| **user-service** | Laravel 12 (PHP 8.3) | `8001` | http://localhost:8001 |
| **event-service** | Laravel 12 (PHP 8.3) | `8002` | http://localhost:8002 |
| **registration-service** | Laravel 12 (PHP 8.3) | `8003` | http://localhost:8003 |
| **notification-service** | Laravel 12 (PHP 8.3) | `8004` | http://localhost:8004 |

---

## 📦 Prerequisites

Pastikan tools berikut sudah terinstall di sistem kamu:

- [PHP](https://www.php.net/downloads) >= 8.3
- [Composer](https://getcomposer.org/) >= 2.x
- [Node.js](https://nodejs.org/) >= 20.x & npm >= 10.x
- [MySQL](https://www.mysql.com/) >= 8.0
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (untuk deployment berbasis container)
- [Git](https://git-scm.com/)

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/MasArik09/CampusEventHUB.git
cd CampusEventHUB
```

---

### Option A — Run with Docker (Recommended)

Setiap service memiliki `docker-compose.yml` sendiri. Masuk ke direktori service yang ingin dijalankan, kemudian:

```bash
# Contoh: jalankan event-service
cd event-service
docker compose up -d
```

> Ulangi langkah yang sama untuk setiap service yang ingin dijalankan.

---

### Option B — Run Locally (Manual)

#### 1. Backend Services (Laravel)

Untuk setiap service (`user-service`, `event-service`, `registration-service`, `notification-service`), lakukan langkah berikut:

```bash
cd <service-name>

# Install dependencies
composer install

# Salin environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Jalankan migrasi database
php artisan migrate

# (Opsional) Jalankan seeder
php artisan db:seed
```

Kemudian jalankan masing-masing service di port yang telah ditentukan:

```bash
# Terminal 1 — User Service
cd user-service && php artisan serve --port=8001

# Terminal 2 — Event Service
cd event-service && php artisan serve --port=8002

# Terminal 3 — Registration Service
cd registration-service && php artisan serve --port=8003

# Terminal 4 — Notification Service
cd notification-service && php artisan serve --port=8004
```

#### 2. Frontend App (Next.js)

```bash
cd frontend

# Install dependencies
npm install

# Salin environment file (jika tersedia)
cp .env.example .env.local

# Jalankan development server
npm run dev
```

Akses aplikasi di: **http://localhost:3000**

---

## 📂 Project Structure

```text
CampusEventHUB/
│
├── 📁 docs/                      # Dokumentasi sistem & desain
│   ├── API_CONTRACT.md           # Kontrak API seluruh service
│   ├── ARCHITECTURE.md           # Dokumen arsitektur sistem
│   ├── FRONTEND_DESIGN.md        # Panduan desain frontend
│   ├── PRD.md                    # Product Requirements Document
│   ├── RequirementCampusEventHUB.md  # Dokumen kebutuhan sistem
│   ├── SYSTEM_DESIGN.md          # Dokumen desain sistem
│   ├── TASK_BREAKDOWN.md         # Pembagian tugas tim
│   └── UI_FLOW.md                # Alur antarmuka pengguna
│
├── 📁 frontend/                  # Next.js 15 Frontend Application
│   └── src/
│       ├── app/                  # App Router pages
│       ├── components/           # Reusable UI components
│       ├── context/              # React Context (state management)
│       └── services/             # API service clients
│
├── 📁 user-service/              # User Microservice (Laravel 12)
├── 📁 event-service/             # Event Microservice (Laravel 12)
├── 📁 registration-service/      # Registration Microservice (Laravel 12)
├── 📁 notification-service/      # Notification & Certificate Microservice (Laravel 12)
│
├── LICENSE                       # MIT License
└── README.md                     # Dokumen panduan utama ini
```

---

## 📡 API Overview

Setiap service mengekspos REST API dengan base URL masing-masing. Semua response menggunakan format JSON standar.

| Service | Base URL |
| :--- | :--- |
| User Service | `http://localhost:8001/api` |
| Event Service | `http://localhost:8002/api` |
| Registration Service | `http://localhost:8003/api` |
| Notification Service | `http://localhost:8004/api` |

**Contoh endpoint utama:**

```
POST   /api/register          → Registrasi pengguna baru
POST   /api/login             → Login pengguna
GET    /api/events            → Daftar semua event
POST   /api/events            → Buat event baru (Panitia)
POST   /api/registrations     → Daftar ke event
GET    /api/certificates      → Daftar sertifikat pengguna
```

> Lihat dokumentasi lengkap di [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md).

---

## 📨 Message Broker Events

Komunikasi asynchronous antar service menggunakan **RabbitMQ**:

| Event | Publisher | Consumer | Aksi |
| :--- | :--- | :--- | :--- |
| `event.created` | Event Service | Notification Service | Kirim notifikasi event baru |
| `registration.created` | Registration Service | Notification Service | Kirim notifikasi pendaftaran berhasil |
| `event.finished` | Event Service | Notification & Certificate Service | Generate sertifikat otomatis |
| `certificate.generated` | Notification Service | Notification Service | Kirim notifikasi sertifikat tersedia |

---

## 🗄️ Database Design

Setiap service memiliki database MySQL sendiri (**Database Per Service Pattern**):

| Service | Database | Tabel Utama |
| :--- | :--- | :--- |
| User Service | `campus_eventhub_users` | `users`, `roles`, `user_roles` |
| Event Service | `campus_eventhub_events` | `events`, `categories` |
| Registration Service | `campus_eventhub_registrations` | `registrations`, `attendances` |
| Notification Service | `campus_eventhub_notifications` | `notifications`, `certificates` |

---

## 📚 Documentation

| Dokumen | Keterangan |
| :--- | :--- |
| [`docs/PRD.md`](docs/PRD.md) | Product Requirements Document |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Arsitektur sistem secara menyeluruh |
| [`docs/API_CONTRACT.md`](docs/API_CONTRACT.md) | Kontrak API seluruh service |
| [`docs/SYSTEM_DESIGN.md`](docs/SYSTEM_DESIGN.md) | Detail desain sistem |
| [`docs/TASK_BREAKDOWN.md`](docs/TASK_BREAKDOWN.md) | Pembagian tugas & fase pengembangan |
| [`docs/UI_FLOW.md`](docs/UI_FLOW.md) | Alur antarmuka pengguna |
| [`docs/FRONTEND_DESIGN.md`](docs/FRONTEND_DESIGN.md) | Panduan desain frontend |

---

## 👥 Team

Proyek ini dikembangkan oleh tim beranggotakan **4 orang** dengan pembagian tanggung jawab sebagai berikut:

| Member | Service | Database |
| :--- | :--- | :--- |
| **Ilham Hilmi** | User Service | `campus_eventhub_users` |
| **Abdulloh Wahab** | Event Service | `campus_eventhub_events` |
| **Ghazi Rayshafiq** | Registration Service | `campus_eventhub_registrations` |
| **Naufal Syamdani** | Notification & Certificate Service | `campus_eventhub_notifications` |
| **All Members** | Frontend, Docker Deployment, GraphQL Integration, Testing, Documentation | — |

---

## 📄 License

Proyek ini dilisensikan di bawah **MIT License** — lihat file [LICENSE](LICENSE) untuk detail selengkapnya.

---

<div align="center">

Made with ❤️ by the CampusEventHUB Team

</div>

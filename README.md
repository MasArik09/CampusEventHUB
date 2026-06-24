<div align="center">

# 🎓 CampusEventHUB

**Integrated Campus Event Management Platform built with Microservices Architecture**

[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com)
[![GraphQL](https://img.shields.io/badge/GraphQL-Lighthouse-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://lighthouse-php.com)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-Message%20Broker-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)](https://www.rabbitmq.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p>
  <strong>CampusEventHUB</strong> adalah platform terintegrasi berbasis microservices untuk mengelola berbagai kegiatan kampus — mulai dari seminar, workshop, webinar, lomba, pelatihan, hingga penerbitan sertifikat digital secara otomatis.
</p>

<p>
  <em>Dikembangkan sebagai implementasi konsep <strong>Enterprise Application Integration (EAI)</strong> menggunakan pendekatan <strong>Microservices Architecture</strong>.</em>
</p>

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#️-architecture)
- [Tech Stack](#️-tech-stack)
- [Services & Ports](#-services--ports)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
  - [Step 1 — Clone Repository](#step-1--clone-repository)
  - [Step 2 — Start Shared Infrastructure](#step-2--start-shared-infrastructure-rabbitmq)
  - [Step 3 — Start User Service](#step-3--start-user-service)
  - [Step 4 — Start Event Service](#step-4--start-event-service)
  - [Step 5 — Start Frontend](#step-5--start-frontend-optional)
  - [Verify All Services](#step-6--verify-all-services)
  - [Stopping Services](#stopping-services)
- [Project Structure](#-project-structure)
- [API Overview](#-api-overview)
  - [User Service API](#-user-service-api)
  - [Event Service API](#-event-service-api)
- [GraphQL](#-graphql)
- [Message Broker Events](#-message-broker-events)
- [Database Design](#️-database-design)
- [Environment Variables](#-environment-variables)
- [Documentation](#-documentation)
- [Team](#-team)
- [License](#-license)

---

## 🌟 Overview

CampusEventHUB hadir sebagai solusi atas permasalahan umum dalam pengelolaan event kampus yang selama ini dilakukan secara manual — melalui formulir terpisah, spreadsheet, dan media sosial.

Platform ini mengintegrasikan seluruh proses dalam satu ekosistem yang kohesif:

| Aktor | Kemampuan |
| :--- | :--- |
| 🔍 **Mahasiswa** | Menemukan, mencari, dan mendaftar event secara online |
| 🛠️ **Panitia** | Mengelola event, peserta, kehadiran, dan melihat statistik secara real-time |
| 🤖 **Sistem** | Mengirim notifikasi otomatis dan menerbitkan sertifikat digital setelah event selesai |

---

## ✨ Key Features

<table>
<thead>
  <tr>
    <th>🎓 Mahasiswa</th>
    <th>🛠️ Panitia (Committee)</th>
    <th>🤖 Sistem & Integrasi</th>
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
    <td>Pencarian & filter event</td>
    <td>Mempublikasikan event</td>
    <td>GraphQL API via Lighthouse</td>
  </tr>
  <tr>
    <td>Pendaftaran event online</td>
    <td>Melihat statistik event</td>
    <td>Role-Based Access Control (RBAC)</td>
  </tr>
  <tr>
    <td>Riwayat pendaftaran</td>
    <td>Manajemen kategori event</td>
    <td>Docker-based deployment</td>
  </tr>
  <tr>
    <td>Unduh sertifikat digital</td>
    <td>Menyelesaikan (finish) event</td>
    <td>REST API + JSON standar</td>
  </tr>
</tbody>
</table>

---

## 🏛️ Architecture

CampusEventHUB menggunakan **Microservices Architecture** di mana setiap service memiliki database, REST API, GraphQL endpoint, dan container Docker-nya sendiri. Komunikasi antar service dilakukan melalui **RabbitMQ** sebagai message broker.

```text
┌──────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 15)                     │
│                   http://localhost:3000                      │
└────────────────────────────┬─────────────────────────────────┘
                             │  REST API / GraphQL
              ┌──────────────┼──────────────────────┐
              │              │                      │
              ▼              ▼                      ▼
     ┌──────────────┐ ┌──────────────┐ ┌────────────────────┐
     │    User      │ │    Event     │ │    Registration     │
     │   Service    │ │   Service    │ │      Service        │
     │   :8001      │ │   :8002      │ │      :8003          │
     │   Sanctum    │ │   GraphQL    │ │                     │
     └──────┬───────┘ └──────┬───────┘ └─────────┬───────────┘
            │                │                   │
            ▼                ▼                   ▼
       MySQL :3307     MySQL :3308          MySQL :3309
   (campus_eventhub  (campus_eventhub    (campus_eventhub
       _users)          _events)         _registrations)
            │                │                   │
            └────────────────┼───────────────────┘
                             │
                    ┌────────▼────────┐
                    │    RabbitMQ     │
                    │  :5672 / :15672 │
                    └────────┬────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │    Notification &    │
                  │  Certificate Service │
                  │       :8004          │
                  └──────────┬───────────┘
                             │
                             ▼
                        MySQL :3310
                  (campus_eventhub
                    _notifications)
```

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
| :--- | :--- | :---: |
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS | 15 / 19 / 5 |
| **Backend** | Laravel, PHP | 12 / 8.3 |
| **Database** | MySQL (Database Per Service Pattern) | 8.0 |
| **Authentication** | Laravel Sanctum (Bearer Token) | — |
| **GraphQL** | Laravel Lighthouse | — |
| **Message Broker** | RabbitMQ (Topic Exchange) | 3-management |
| **Containerization** | Docker, Docker Compose | — |
| **Web Server** | Nginx (Event Service), Built-in (User Service) | — |

---

## 🌐 Services & Ports

| Service | Container Name | Port | Local URL | Database Port |
| :--- | :--- | :---: | :--- | :---: |
| **User Service** | `user-service-app` | `8001` | http://localhost:8001 | `3307` |
| **Event Service** | `event-service-nginx` | `8002` | http://localhost:8002 | `3308` |
| **Registration Service** | — | `8003` | http://localhost:8003 | `3309` |
| **Notification Service** | — | `8004` | http://localhost:8004 | `3310` |
| **Frontend** | — | `3000` | http://localhost:3000 | — |
| **RabbitMQ** | `campus_eventhub_rabbitmq` | `5672` | — | — |
| **RabbitMQ Management** | `campus_eventhub_rabbitmq` | `15672` | http://localhost:15672 | — |

> **RabbitMQ Management UI:** Default credentials are `guest` / `guest`

---

## 📦 Prerequisites

Pastikan tools berikut sudah terinstall di sistem:

| Tool | Minimum Version | Download |
| :--- | :---: | :--- |
| **Docker** & **Docker Compose** | Latest | [docker.com](https://www.docker.com/) |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |
| **Node.js** *(untuk frontend)* | >= 20.x | [nodejs.org](https://nodejs.org/) |
| **npm** *(untuk frontend)* | >= 10.x | Bundled with Node.js |

> **Catatan:** PHP, Composer, dan MySQL **tidak perlu** diinstall secara lokal karena semua service backend berjalan di dalam Docker container.

---

## 🚀 Getting Started

Ikuti langkah-langkah berikut secara berurutan untuk menjalankan seluruh platform.

### Step 1 — Clone Repository

```bash
git clone https://github.com/MasArik09/CampusEventHUB.git
cd CampusEventHUB
```

---

### Step 2 — Start Shared Infrastructure (RabbitMQ)

Jalankan RabbitMQ terlebih dahulu karena digunakan oleh semua backend service:

```bash
docker compose -f docker-compose.shared.yml up -d
```

**Verifikasi:**
```bash
docker ps --filter "name=campus_eventhub_rabbitmq"
```

Pastikan container `campus_eventhub_rabbitmq` berstatus `Up`. Buka http://localhost:15672 untuk melihat RabbitMQ Management UI (login: `guest` / `guest`).

---

### Step 3 — Start User Service

```bash
cd user-service
docker compose up -d
```

**Verifikasi:**
```bash
# Pastikan container berjalan
docker ps --filter "name=user-service"

# Test health check endpoint
curl http://localhost:8001/api/health
```

**Expected Response:**
```json
{ "success": true, "message": "user-service is healthy" }
```

Kembali ke root directory:
```bash
cd ..
```

---

### Step 4 — Start Event Service

```bash
cd event-service
docker compose up -d
```

**Verifikasi:**
```bash
docker ps --filter "name=event-service"

# Test endpoint
curl http://localhost:8002/api/events
```

Kembali ke root directory:
```bash
cd ..
```

---

### Step 5 — Start Frontend *(Optional)*

```bash
cd frontend

# Install dependencies
npm install

# Salin environment file
cp .env.example .env.local  # Sesuaikan URL backend jika perlu

# Jalankan development server
npm run dev
```

Akses frontend di: **http://localhost:3000**

---

### Step 6 — Verify All Services

Setelah semua service berjalan, verifikasi dengan:

```bash
docker ps
```

**Expected output** (minimal):

| Container | Status | Port |
| :--- | :--- | :--- |
| `campus_eventhub_rabbitmq` | Up | 5672, 15672 |
| `user-service-app` | Up | 8001 |
| `user-service-mysql` | Up (healthy) | 3307 |
| `event-service-app` | Up | 9000 |
| `event-service-nginx` | Up | 8002 |
| `event-service-mysql` | Up | 3308 |

---

### Stopping Services

Untuk menghentikan seluruh service:

```bash
# Stop Event Service
cd event-service && docker compose down && cd ..

# Stop User Service
cd user-service && docker compose down && cd ..

# Stop Shared Infrastructure (RabbitMQ)
docker compose -f docker-compose.shared.yml down
```

> **Tip:** Data MySQL disimpan di Docker volume, sehingga data tetap tersimpan meskipun container dihentikan.

---

## 📂 Project Structure

```text
CampusEventHUB/
│
├── 📄 docker-compose.shared.yml         # Shared infrastructure (RabbitMQ + network)
├── 📄 README.md                         # Dokumentasi utama ini
├── 📄 LICENSE                           # MIT License
│
├── 📁 docs/                             # Dokumentasi sistem & desain
│   ├── PRD.md                           #   Product Requirements Document
│   ├── ARCHITECTURE.md                  #   Arsitektur sistem
│   ├── API_CONTRACT.md                  #   Kontrak API seluruh service
│   ├── SYSTEM_DESIGN.md                 #   Desain sistem
│   ├── TASK_BREAKDOWN.md                #   Pembagian tugas tim
│   ├── FRONTEND_DESIGN.md               #   Panduan desain frontend
│   ├── UI_FLOW.md                       #   Alur antarmuka pengguna
│   └── RequirementCampusEventHUB.md     #   Dokumen kebutuhan sistem
│
├── 📁 user-service/                     # 🔐 User & Auth Microservice
│   ├── app/
│   │   ├── Http/Controllers/Api/        #   AuthController, ProfileController
│   │   ├── Http/Middleware/             #   EnsureRole (RBAC)
│   │   ├── Http/Requests/              #   LoginRequest, RegisterRequest, UpdateProfileRequest
│   │   ├── Http/Resources/             #   UserResource
│   │   ├── GraphQL/Mutations/          #   RegisterUser, UpdateProfile
│   │   └── Models/                     #   User, Role, Certificate
│   ├── database/
│   │   ├── migrations/                 #   users, roles, user_roles, certificates
│   │   └── seeders/                    #   RoleSeeder, UserSeeder
│   ├── graphql/schema.graphql          #   GraphQL schema (Query + Mutation)
│   ├── routes/api.php                  #   REST API routes
│   ├── docker-compose.yml              #   Docker config (app + MySQL + RabbitMQ)
│   └── Dockerfile                      #   PHP 8.3 container image
│
├── 📁 event-service/                    # 📅 Event Management Microservice
│   ├── app/
│   │   ├── Http/Controllers/Api/        #   EventController (CRUD + publish + finish)
│   │   ├── Http/Requests/              #   StoreEventRequest, UpdateEventRequest
│   │   ├── Http/Resources/             #   EventResource
│   │   ├── Services/                   #   RabbitMQService (publisher)
│   │   └── Models/                     #   Event, Category
│   ├── database/
│   │   ├── migrations/                 #   events, categories
│   │   └── seeders/                    #   CategorySeeder (Seminar, Workshop, dll.)
│   ├── graphql/schema.graphql          #   GraphQL schema (Event + Category queries)
│   ├── routes/api.php                  #   REST API routes
│   ├── docs/API.md                     #   Dokumentasi API lengkap
│   ├── tests/Feature/EventApiTest.php  #   Automated API tests
│   ├── CampusEventHUB_Event_Service.postman_collection.json
│   ├── docker-compose.yml              #   Docker config (app + Nginx + MySQL)
│   └── docker/
│       ├── php/Dockerfile              #   PHP-FPM container image
│       └── nginx/default.conf          #   Nginx reverse proxy config
│
├── 📁 registration-service/             # 📝 Registration & Attendance Microservice
│   ├── app/
│   ├── database/
│   └── docker-compose.yml
│
├── 📁 notification-service/             # 🔔 Notification & Certificate Microservice
│   ├── app/
│   ├── database/
│   └── docker-compose.yml
│
└── 📁 frontend/                         # 🌐 Next.js 15 Frontend Application
    └── src/
        ├── app/                         #   App Router pages
        ├── components/                  #   Reusable UI components
        ├── context/                     #   React Context (state management)
        └── services/                    #   API service clients
```

---

## 📡 API Overview

Semua backend service mengekspos REST API dengan format JSON standar. Sertakan header berikut di setiap request:

```
Accept: application/json
Content-Type: application/json
```

---

### 🔐 User Service API

**Base URL:** `http://localhost:8001/api`

| Method | Endpoint | Auth | Description |
| :---: | :--- | :---: | :--- |
| `POST` | `/users/register` | ❌ | Registrasi pengguna baru |
| `POST` | `/users/login` | ❌ | Login dan dapatkan Bearer Token |
| `POST` | `/users/logout` | 🔒 | Logout (revoke token) |
| `GET` | `/users/profile` | 🔒 | Lihat profil user yang sedang login |
| `PUT` | `/users/profile` | 🔒 | Update profil user |
| `GET` | `/health` | ❌ | Health check endpoint |

> 🔒 = Membutuhkan header `Authorization: Bearer {token}`

<details>
<summary><strong>📌 Contoh: Register</strong></summary>

**Request:**
```http
POST /api/users/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```

**Response (201 Created):**
```json
{
    "success": true,
    "message": "User registered successfully",
    "data": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```
</details>

<details>
<summary><strong>📌 Contoh: Login</strong></summary>

**Request:**
```http
POST /api/users/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "password123"
}
```

**Response (200 OK):**
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com"
        },
        "token": "1|abc123def456..."
    }
}
```
</details>

---

### 📅 Event Service API

**Base URL:** `http://localhost:8002/api`

| Method | Endpoint | Description |
| :---: | :--- | :--- |
| `GET` | `/events` | Daftar event (dengan search, filter & pagination) |
| `POST` | `/events` | Buat event baru |
| `GET` | `/events/{id}` | Detail satu event |
| `PUT` | `/events/{id}` | Update event |
| `DELETE` | `/events/{id}` | Hapus event |
| `PATCH` | `/events/{id}/publish` | Publish event (draft → published) |
| `PATCH` | `/events/{id}/finish` | Selesaikan event (→ finished) |

**Query Parameters** untuk `GET /events`:

| Parameter | Type | Example | Description |
| :--- | :--- | :--- | :--- |
| `search` | string | `?search=laravel` | Pencarian di judul & deskripsi |
| `category_id` | integer | `?category_id=1` | Filter berdasarkan kategori |
| `status` | string | `?status=published` | Filter: `draft`, `published`, `finished` |
| `date` | string | `?date=2026-07-20` | Filter event pada tanggal tertentu |

> Parameter dapat dikombinasikan: `?search=ai&status=published&category_id=1`

<details>
<summary><strong>📌 Contoh: Create Event</strong></summary>

**Request:**
```http
POST /api/events
Content-Type: application/json

{
    "title": "Seminar Nasional AI 2026",
    "description": "Seminar mengenai perkembangan AI di masa depan.",
    "location": "Gedung Serbaguna Kampus A",
    "start_date": "2026-07-20 09:00:00",
    "end_date": "2026-07-20 15:00:00",
    "quota": 100,
    "category_id": 1,
    "created_by": 12
}
```

**Response (201 Created):**
```json
{
    "success": true,
    "message": "Event berhasil dibuat.",
    "data": {
        "id": 1,
        "title": "Seminar Nasional AI 2026",
        "description": "Seminar mengenai perkembangan AI di masa depan.",
        "location": "Gedung Serbaguna Kampus A",
        "start_date": "2026-07-20 09:00:00",
        "end_date": "2026-07-20 15:00:00",
        "quota": 100,
        "status": "draft",
        "created_by": 12,
        "category": {
            "id": 1,
            "name": "Seminar"
        },
        "created_at": "2026-06-20T04:10:00.000000Z",
        "updated_at": "2026-06-20T04:10:00.000000Z"
    }
}
```
</details>

<details>
<summary><strong>📌 Contoh: Get Events (dengan Filter)</strong></summary>

**Request:**
```http
GET /api/events?search=seminar&status=draft&category_id=1
Accept: application/json
```

**Response (200 OK):**
```json
{
    "data": [
        {
            "id": 1,
            "title": "Seminar Nasional AI 2026",
            "description": "Seminar mengenai perkembangan AI di masa depan.",
            "location": "Gedung Serbaguna Kampus A",
            "start_date": "2026-07-20 09:00:00",
            "end_date": "2026-07-20 15:00:00",
            "quota": 100,
            "status": "draft",
            "created_by": 12,
            "category": {
                "id": 1,
                "name": "Seminar"
            }
        }
    ],
    "links": {
        "first": "http://localhost:8002/api/events?page=1",
        "last": "http://localhost:8002/api/events?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "current_page": 1,
        "last_page": 1,
        "per_page": 10,
        "total": 1
    },
    "success": true
}
```
</details>

<details>
<summary><strong>📌 Contoh: Validation Error</strong></summary>

**Request (data tidak lengkap):**
```http
POST /api/events
Content-Type: application/json

{
    "title": "",
    "start_date": "2026-07-20 09:00:00",
    "end_date": "2026-07-19 15:00:00"
}
```

**Response (422 Unprocessable Content):**
```json
{
    "message": "Judul event wajib diisi. (and 5 more errors)",
    "errors": {
        "title": ["Judul event wajib diisi."],
        "description": ["Deskripsi event wajib diisi."],
        "location": ["Lokasi event wajib diisi."],
        "end_date": ["Tanggal selesai harus sama atau setelah tanggal mulai."],
        "quota": ["Kuota event wajib diisi."],
        "category_id": ["Kategori event wajib dipilih."]
    }
}
```
</details>

> 📖 Dokumentasi API lengkap tersedia di [`event-service/docs/API.md`](event-service/docs/API.md)
>
> 📬 Postman Collection tersedia di [`event-service/CampusEventHUB_Event_Service.postman_collection.json`](event-service/CampusEventHUB_Event_Service.postman_collection.json)

---

## 🔮 GraphQL

Setiap service mengekspos GraphQL endpoint via **Laravel Lighthouse** di `/graphql`.

### User Service GraphQL

**Endpoint:** `http://localhost:8001/graphql`

**Queries:**
```graphql
# Get single user (requires auth)
query {
    user(id: 1) {
        id
        name
        email
        roles { id, name }
    }
}

# Get paginated users (requires auth)
query {
    users(first: 10) {
        data { id, name, email }
        paginatorInfo { total, currentPage }
    }
}
```

**Mutations:**
```graphql
# Register new user
mutation {
    registerUser(name: "John", email: "john@mail.com", password: "secret123") {
        id
        name
        email
    }
}

# Update profile (requires auth)
mutation {
    updateProfile(name: "John Updated") {
        id
        name
        email
    }
}
```

### Event Service GraphQL

**Endpoint:** `http://localhost:8002/graphql`

**Queries:**
```graphql
# Get all events
query {
    events {
        id
        title
        description
        location
        start_date
        end_date
        quota
        status
        category { id, name }
    }
}

# Get single event
query {
    event(id: 1) {
        id
        title
        status
        category { name }
    }
}

# Get all categories with their events
query {
    categories {
        id
        name
        events { id, title, status }
    }
}
```

---

## 📨 Message Broker Events

Komunikasi asynchronous antar service menggunakan **RabbitMQ** dengan **Topic Exchange** (`campus_eventhub`):

| Routing Key | Publisher | Consumer | Trigger | Aksi |
| :--- | :--- | :--- | :--- | :--- |
| `event.created` | Event Service | Notification Service | `POST /events` | Kirim notifikasi event baru |
| `event.finished` | Event Service | Notification & Certificate Service | `PATCH /events/{id}/finish` | Generate sertifikat otomatis |
| `registration.created` | Registration Service | Notification Service | `POST /registrations` | Notifikasi pendaftaran berhasil |
| `certificate.generated` | Notification Service | Notification Service | Internal | Notifikasi sertifikat tersedia |

**Message Format (JSON):**

```json
// event.created
{
    "event_id": 1,
    "title": "Seminar Nasional AI 2026"
}

// event.finished
{
    "event_id": 1
}
```

---

## 🗄️ Database Design

Setiap service memiliki database MySQL sendiri (**Database Per Service Pattern**):

| Service | Database Name | Port | Tables |
| :--- | :--- | :---: | :--- |
| User Service | `campus_eventhub_users` | `3307` | `users`, `roles`, `user_roles`, `certificates`, `sessions`, `cache`, `jobs` |
| Event Service | `campus_eventhub_events` | `3308` | `events`, `categories`, `sessions`, `cache`, `jobs` |
| Registration Service | `campus_eventhub_registrations` | `3309` | `registrations`, `attendances` |
| Notification Service | `campus_eventhub_notifications` | `3310` | `notifications`, `certificates` |

**Seed Data:**

| Service | Seeder | Data |
| :--- | :--- | :--- |
| User Service | `RoleSeeder` | Roles: `admin`, `committee`, `student` |
| User Service | `UserSeeder` | Default admin & test users |
| Event Service | `CategorySeeder` | Categories: `Seminar`, `Workshop`, `Webinar`, `Competition`, `Training` |

---

## 🔧 Environment Variables

Setiap service memiliki file `.env` sendiri. Variabel utama yang perlu diperhatikan:

| Variable | User Service | Event Service | Description |
| :--- | :--- | :--- | :--- |
| `APP_PORT` | `8001` | `8002` | Port aplikasi |
| `DB_HOST` | `mysql-user` | `mysql` | Hostname MySQL container |
| `DB_PORT` | `3306` | `3306` | Port MySQL (internal) |
| `DB_DATABASE` | `campus_eventhub_users` | `campus_eventhub_events` | Nama database |
| `DB_USERNAME` | `root` | `root` | Username database |
| `DB_PASSWORD` | `secret` | `root` | Password database |
| `RABBITMQ_HOST` | `rabbitmq` | `campus_eventhub_rabbitmq` | Hostname RabbitMQ |
| `RABBITMQ_PORT` | `5672` | `5672` | Port AMQP |
| `RABBITMQ_USER` | `guest` | `guest` | Username RabbitMQ |
| `RABBITMQ_PASSWORD` | `guest` | `guest` | Password RabbitMQ |

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
| [`event-service/docs/API.md`](event-service/docs/API.md) | Dokumentasi REST API Event Service |

---

## 👥 Team

Proyek ini dikembangkan oleh tim beranggotakan **4 orang** dengan pembagian tanggung jawab sebagai berikut:

| Member | Role | Service | Database |
| :--- | :--- | :--- | :--- |
| **Ilham Hilmi** | Backend Developer | User Service | `campus_eventhub_users` |
| **Abdulloh Wahab** | Backend Developer | Event Service | `campus_eventhub_events` |
| **Ghazi Rayshafiq** | Backend Developer | Registration Service | `campus_eventhub_registrations` |
| **Naufal Syamdani** | Backend Developer | Notification & Certificate Service | `campus_eventhub_notifications` |
| **All Members** | Fullstack | Frontend, Docker, GraphQL, Testing, Documentation | — |

---

## 📄 License

Proyek ini dilisensikan di bawah **MIT License** — lihat file [LICENSE](LICENSE) untuk detail selengkapnya.

---

<div align="center">

Made with ❤️ by the **CampusEventHUB Team**

[⬆ Back to Top](#-campuseventhub)

</div>

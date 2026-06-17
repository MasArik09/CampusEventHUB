# Task Breakdown Document

# CampusEventHUB

Version: 2.0

Status: Final

---

# Team Structure

Jumlah Anggota:

4 Orang

Metode Pengembangan:

Parallel Development

Architecture:

Microservices

---

# Important Development Rules

## Rule 1

Setiap anggota wajib memiliki:

* 1 Microservice
* 1 Database
* 1 Docker Deployment
* REST API
* GraphQL Endpoint
* API Documentation

---

## Rule 2

Setiap service harus dapat dijalankan secara independen menggunakan Docker.

Contoh:

```bash
docker compose up -d
```

Setiap service memiliki:

* Dockerfile
* docker-compose.yml
* .env
* Source Code

---

## Rule 3

Database tidak boleh diakses langsung oleh service lain.

Komunikasi antar service hanya boleh melalui:

* REST API
* GraphQL
* RabbitMQ

---

# Development Phases

## Phase 1

Service Initialization

Target:

Membuat fondasi masing-masing service.

Output:

* Laravel Setup
* MySQL Setup
* Docker Setup
* GraphQL Setup

PIC:

Masing-masing anggota

---

## Phase 2

Service Development

Target:

Mengembangkan fitur utama tiap service.

PIC:

Masing-masing anggota

---

## Phase 3

Service Integration

Target:

Menghubungkan seluruh service menggunakan RabbitMQ.

PIC:

Semua Anggota

---

## Phase 4

Frontend Development

Target:

Mengembangkan antarmuka sistem.

PIC:

Semua Anggota

---

## Phase 5

Testing & Demo

Target:

Menyiapkan demonstrasi dan presentasi.

PIC:

Semua Anggota

---

# Member 1

## User Service Owner

Service:

user-service

Database:

campus_eventhub_users

Technology:

* Laravel
* MySQL
* Docker
* GraphQL

---

### Features

* Register
* Login
* Logout
* User Profile
* Role Management

---

### REST API

POST /register

POST /login

POST /logout

GET /profile

PUT /profile

---

### GraphQL

Queries:

* User
* Users

Mutations:

* Register
* UpdateProfile

---

### Docker Tasks

* Dockerfile
* docker-compose.yml
* MySQL Container
* Environment Configuration

---

### Deliverables

* Source Code
* Database Schema
* Docker Configuration
* Postman Collection

---

# Member 2

## Event Service Owner

Service:

event-service

Database:

campus_eventhub_events

Technology:

* Laravel
* MySQL
* Docker
* GraphQL

---

### Features

* Create Event
* Update Event
* Delete Event
* Publish Event
* Event Category

---

### REST API

GET /events

GET /events/{id}

POST /events

PUT /events/{id}

DELETE /events/{id}

---

### GraphQL

Queries:

* Events
* Event

Mutations:

* CreateEvent
* UpdateEvent

---

### RabbitMQ Publisher

* event.created
* event.finished

---

### Docker Tasks

* Dockerfile
* docker-compose.yml
* MySQL Container
* Environment Configuration

---

### Deliverables

* Source Code
* Database Schema
* Docker Configuration
* Postman Collection

---

# Member 3

## Registration Service Owner

Service:

registration-service

Database:

campus_eventhub_registrations

Technology:

* Laravel
* MySQL
* Docker
* GraphQL

---

### Features

* Register Event
* Cancel Registration
* Attendance Management

---

### REST API

POST /registrations

DELETE /registrations/{id}

GET /registrations

GET /registrations/history

---

### GraphQL

Queries:

* Registrations
* Registration

Mutations:

* RegisterEvent
* CancelRegistration

---

### RabbitMQ Publisher

* registration.created

---

### Docker Tasks

* Dockerfile
* docker-compose.yml
* MySQL Container
* Environment Configuration

---

### Deliverables

* Source Code
* Database Schema
* Docker Configuration
* Postman Collection

---

# Member 4

## Notification & Certificate Service Owner

Service:

notification-service

Database:

campus_eventhub_notifications

Technology:

* Laravel
* MySQL
* Docker
* GraphQL

---

### Features

* Send Notification
* Notification History
* Generate Certificate
* Verify Certificate

---

### RabbitMQ Consumer

Consume:

* event.created
* registration.created
* event.finished

---

### RabbitMQ Publisher

Publish:

* certificate.generated

---

### REST API

GET /notifications

GET /certificates

GET /certificates/{id}

---

### GraphQL

Queries:

* Notifications
* Certificates

---

### Docker Tasks

* Dockerfile
* docker-compose.yml
* MySQL Container
* Environment Configuration

---

### Deliverables

* Source Code
* Database Schema
* Docker Configuration
* Postman Collection

---

# Shared Frontend Development

Framework:

Next.js 15

Language:

TypeScript

UI:

Tailwind CSS

Owner:

Semua Anggota

---

## Pages

### Authentication

* Login
* Register

### Student

* Dashboard
* Event List
* Event Detail
* Registration History
* Certificate Dashboard

### Committee

* Event Management
* Participant Management

### Admin

* User Management
* System Monitoring

---

# Shared Integration Tasks

Owner:

Semua Anggota

---

## RabbitMQ Integration

Tasks:

* Exchange Configuration
* Queue Configuration
* Event Communication

---

## GraphQL Integration

Tasks:

* Lighthouse Setup
* Hasura Setup

---

## Documentation

Tasks:

* PRD
* System Design
* API Contract
* ERD
* Presentation

---

# Repository Structure

```text
CampusEventHUB/

frontend-app/

services/

├── user-service/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── source-code/

├── event-service/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── source-code/

├── registration-service/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── source-code/

└── notification-service/
    ├── Dockerfile
    ├── docker-compose.yml
    └── source-code/

docs/

README.md
```

---

# Final Deliverables

## Source Code

* Frontend Application
* User Service
* Event Service
* Registration Service
* Notification Service

---

## Documentation

* RequirementCampusEventHUB.md
* PRD.md
* SYSTEM_DESIGN.md
* TASK_BREAKDOWN.md
* API_CONTRACT.md
* ERD.md

---

## Demonstration Checklist

* Register User
* Login User
* Create Event
* Register Event
* RabbitMQ Event Trigger
* Generate Certificate
* GraphQL Query
* Hasura Query
* Docker Deployment Per Service

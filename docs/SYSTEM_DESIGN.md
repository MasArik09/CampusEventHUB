# System Design Document (SDD)

# CampusEventHUB

Version: 1.0

Status: Approved

---

# 1. System Overview

CampusEventHUB menggunakan arsitektur Microservices yang terdiri dari beberapa service independen yang saling berkomunikasi menggunakan REST API, GraphQL, dan Message Broker (RabbitMQ).

Setiap service memiliki database sendiri (Database Per Service Pattern) untuk menjaga loose coupling dan scalability.

Frontend berfungsi sebagai client utama yang mengakses REST API maupun GraphQL API.

---

# 2. Architecture Style

Architecture Pattern:

Microservices Architecture

Supporting Patterns:

* Database Per Service
* Event Driven Architecture
* API Based Communication
* Containerized Deployment

---

# 3. High Level Architecture

```text
┌─────────────────────┐
│     Frontend        │
│      Next.js        │
└──────────┬──────────┘
           │
           │
           ▼

┌─────────────────────┐
│ GraphQL Gateway     │
│ Lighthouse GraphQL  │
└──────────┬──────────┘
           │
           │
────────────────────────────────────

     REST API COMMUNICATION

────────────────────────────────────

┌───────────────┐
│ User Service  │
└───────┬───────┘
        │
        ▼
   MySQL User

┌───────────────┐
│ Event Service │
└───────┬───────┘
        │
        ▼
  MySQL Event

┌─────────────────────┐
│ Registration Service│
└──────────┬──────────┘
           │
           ▼
 MySQL Registration

┌─────────────────────┐
│ Notification Service│
└──────────┬──────────┘
           │
           ▼
 MySQL Notification

─────────────────────────

RabbitMQ

─────────────────────────

event.created
registration.created
event.finished
certificate.generated

─────────────────────────

Hasura

─────────────────────────
```

---

# 4. Technology Stack

## Frontend

Framework:
Next.js 15

Language:
TypeScript

UI:
Tailwind CSS

---

## Backend

Framework:
Laravel 12

Language:
PHP 8.3

Authentication:
Laravel Sanctum

---

## Database

MySQL 8

Setiap service memiliki database masing-masing.

---

## GraphQL

Manual GraphQL:

Laravel Lighthouse

GraphQL Engine:

Hasura

---

## Message Broker

RabbitMQ

---

## Containerization

Docker

Docker Compose

---

# 5. Service Design

## User Service

### Responsibility

Mengelola seluruh data pengguna.

### Features

* Register
* Login
* Logout
* Profile
* Role

### Database

campus_eventhub_users

### Ownership

Anggota 1

---

## Event Service

### Responsibility

Mengelola event kampus.

### Features

* Create Event
* Update Event
* Delete Event
* Publish Event

### Database

campus_eventhub_events

### Ownership

Anggota 2

---

## Registration Service

### Responsibility

Mengelola pendaftaran peserta.

### Features

* Register Event
* Cancel Registration
* Attendance

### Database

campus_eventhub_registrations

### Ownership

Anggota 3

---

## Notification & Certificate Service

### Responsibility

Mengelola notifikasi dan sertifikat.

### Features

* Send Notification
* Generate Certificate
* Verify Certificate

### Database

campus_eventhub_notifications

### Ownership

Anggota 4

---

# 6. Database Design Strategy

Setiap service memiliki database sendiri.

Tidak diperbolehkan query langsung ke database service lain.

Komunikasi data harus melalui:

* REST API
* GraphQL
* RabbitMQ

Pattern:

Database Per Service

---

# 7. Database List

## Database User

campus_eventhub_users

Tables:

* users
* roles
* user_roles

---

## Database Event

campus_eventhub_events

Tables:

* events
* categories

---

## Database Registration

campus_eventhub_registrations

Tables:

* registrations
* attendances

---

## Database Notification

campus_eventhub_notifications

Tables:

* notifications
* certificates

---

# 8. REST API Design

Setiap service menyediakan REST API.

Format Response:

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

Format Error:

```json
{
  "success": false,
  "message": "Validation Error",
  "errors": {}
}
```

---

# 9. GraphQL Design

## Lighthouse

Digunakan untuk custom GraphQL schema.

Contoh Query:

```graphql
query {
  events {
    id
    title
    location
  }
}
```

---

## Hasura

Digunakan untuk:

* Auto CRUD
* Filtering
* Pagination
* Aggregation

---

# 10. Message Broker Design

RabbitMQ digunakan untuk komunikasi asynchronous.

---

## Event Created

Publisher:

Event Service

Event:

event.created

Consumer:

Notification Service

Action:

Mengirim notifikasi event baru.

---

## Registration Created

Publisher:

Registration Service

Event:

registration.created

Consumer:

Notification Service

Action:

Mengirim notifikasi pendaftaran berhasil.

---

## Event Finished

Publisher:

Event Service

Event:

event.finished

Consumer:

Notification Service

Action:

Generate sertifikat.

---

## Certificate Generated

Publisher:

Notification Service

Event:

certificate.generated

Consumer:

User Service

Action:

Menampilkan sertifikat pada dashboard pengguna.

---

# 11. Security Design

Authentication:

JWT Token

Authorization:

Role Based Access Control (RBAC)

Roles:

* Admin
* Committee
* Student

Password:

bcrypt hashing

---

# 12. Docker Design

Container List:

Frontend

* frontend-app

Backend

* user-service
* event-service
* registration-service
* notification-service

Databases

* mysql-user
* mysql-event
* mysql-registration
* mysql-notification

Infrastructure

* rabbitmq
* hasura

Total:

10 Containers

---

# 13. Deployment Structure

```text
CampusEventHUB/

frontend-app/

user-service/
├── Dockerfile
├── docker-compose.yml
└── ...

event-service/
├── Dockerfile
├── docker-compose.yml
└── ...

registration-service/
├── Dockerfile
├── docker-compose.yml
└── ...

notification-service/
├── Dockerfile
├── docker-compose.yml
└── ...

README.md
```

---

# 14. Monitoring & Logging

Future Scope:

* Prometheus
* Grafana

Untuk versi tugas besar belum diimplementasikan.

---

# 15. Scalability Plan

Service dapat di-scale secara independen.

Contoh:

Jika Event Service memiliki trafik tinggi maka hanya Event Service yang perlu ditambah instance.

Tidak perlu menambah seluruh aplikasi.

---

# 16. Success Criteria

Sistem dianggap berhasil apabila:

* Seluruh service berjalan.
* REST API berjalan.
* GraphQL berjalan.
* Hasura berjalan.
* RabbitMQ berjalan.
* Docker Compose berjalan.
* Frontend dapat mengakses seluruh service.
* Demonstrasi berjalan tanpa error.

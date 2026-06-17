# Architecture Document

# CampusEventHUB

Version: 1.0

Status: Final

---

# 1. System Architecture Overview

CampusEventHUB menggunakan pendekatan Microservices Architecture.

Setiap service memiliki:

* Database sendiri
* REST API sendiri
* GraphQL sendiri
* Docker sendiri

Komunikasi antar service dilakukan menggunakan:

* REST API
* GraphQL
* RabbitMQ

---

# 2. High Level Architecture Diagram

```text
┌──────────────────────────┐
│        Frontend          │
│      Next.js 15          │
└─────────────┬────────────┘
              │
              │
              ▼

 ┌────────────────────────┐
 │ GraphQL Gateway        │
 │ Laravel Lighthouse     │
 └────────────┬───────────┘
              │
              │
────────────────────────────────────

           REST API

────────────────────────────────────

┌─────────────────────────┐
│      User Service       │
└────────────┬────────────┘
             │
             ▼
      MySQL User DB

┌─────────────────────────┐
│      Event Service      │
└────────────┬────────────┘
             │
             ▼
      MySQL Event DB

┌─────────────────────────┐
│ Registration Service    │
└────────────┬────────────┘
             │
             ▼
 MySQL Registration DB

┌─────────────────────────┐
│ Notification Service    │
└────────────┬────────────┘
             │
             ▼
 MySQL Notification DB

────────────────────────────────────

            RabbitMQ

────────────────────────────────────
```

---

# 3. Service Architecture

## User Service

Responsibilities:

* Authentication
* Authorization
* User Management
* Profile Management

Database:

campus_eventhub_users

Owner:

Member 1

---

## Event Service

Responsibilities:

* Event Management
* Category Management
* Event Publishing

Database:

campus_eventhub_events

Owner:

Member 2

---

## Registration Service

Responsibilities:

* Event Registration
* Attendance Tracking

Database:

campus_eventhub_registrations

Owner:

Member 3

---

## Notification & Certificate Service

Responsibilities:

* Notification Management
* Certificate Generation
* Certificate Verification

Database:

campus_eventhub_notifications

Owner:

Member 4

---

# 4. Database Architecture

Pattern:

Database Per Service

Rules:

* Setiap service memiliki database sendiri.
* Service tidak boleh melakukan query langsung ke database service lain.
* Komunikasi data harus melalui API atau RabbitMQ.

Diagram:

```text
User Service
     │
     ▼
MySQL User DB

Event Service
     │
     ▼
MySQL Event DB

Registration Service
     │
     ▼
MySQL Registration DB

Notification Service
     │
     ▼
MySQL Notification DB
```

---

# 5. REST Communication Flow

Frontend berkomunikasi dengan service menggunakan REST API.

Contoh:

```text
Frontend
   │
   ▼
Event Service
   │
   ▼
MySQL Event DB
```

---

# 6. GraphQL Architecture

GraphQL digunakan untuk kebutuhan query fleksibel.

Implementasi:

## Laravel Lighthouse

Digunakan untuk custom schema.

Contoh:

```graphql
query {
  events {
    id
    title
  }
}
```

---

## Hasura

Digunakan untuk:

* Auto CRUD
* Filtering
* Pagination
* Aggregate Query

---

# 7. RabbitMQ Architecture

RabbitMQ digunakan sebagai Message Broker.

Pattern:

Event Driven Architecture

---

## Exchange

```text
campus_eventhub
```

Type:

```text
topic
```

---

# 8. Event Flow Diagram

## Event Created

```text
Event Service
      │
      ▼
event.created
      │
      ▼
RabbitMQ
      │
      ▼
Notification Service
```

Action:

Mengirim notifikasi event baru.

---

## Registration Created

```text
Registration Service
         │
         ▼
registration.created
         │
         ▼
RabbitMQ
         │
         ▼
Notification Service
```

Action:

Mengirim notifikasi pendaftaran berhasil.

---

## Event Finished

```text
Event Service
      │
      ▼
event.finished
      │
      ▼
RabbitMQ
      │
      ▼
Notification Service
```

Action:

Generate sertifikat.

---

## Certificate Generated

```text
Notification Service
        │
        ▼
certificate.generated
        │
        ▼
RabbitMQ
        │
        ▼
User Service
```

Action:

Menampilkan sertifikat pada dashboard pengguna.

---

# 9. Frontend Architecture

Framework:

Next.js 15

Language:

TypeScript

UI Framework:

Tailwind CSS

---

# Frontend Modules

## Authentication

* Login
* Register

## Student Module

* Dashboard
* Event List
* Event Detail
* Registration History
* Certificate Dashboard

## Committee Module

* Event Management
* Participant Management

## Admin Module

* User Management
* Monitoring

---

# 10. Docker Architecture

Setiap service memiliki container sendiri.

---

## User Service

Containers:

* user-service-app
* user-service-mysql

---

## Event Service

Containers:

* event-service-app
* event-service-mysql

---

## Registration Service

Containers:

* registration-service-app
* registration-service-mysql

---

## Notification Service

Containers:

* notification-service-app
* notification-service-mysql

---

## Shared Infrastructure

Containers:

* rabbitmq
* hasura

---

# 11. Deployment Diagram

```text
Frontend Container
        │
        ▼

User Service Container
        │
        ▼
User MySQL Container

Event Service Container
        │
        ▼
Event MySQL Container

Registration Service Container
        │
        ▼
Registration MySQL Container

Notification Service Container
        │
        ▼
Notification MySQL Container

RabbitMQ Container

Hasura Container
```

---

# 12. Security Architecture

Authentication:

JWT

Authorization:

RBAC

Roles:

* Admin
* Committee
* Student

Password Storage:

bcrypt

---

# 13. Scalability Strategy

Setiap service dapat di-scale secara independen.

Contoh:

Jika Event Service mengalami trafik tinggi maka hanya Event Service yang perlu ditambah instance.

Tidak perlu melakukan scaling seluruh aplikasi.

---

# 14. Availability Strategy

Seluruh service berjalan dalam Docker Container.

Keuntungan:

* Mudah deployment
* Mudah testing
* Konsisten di semua environment

---

# 15. Architecture Principles

1. Single Responsibility Per Service
2. Database Per Service
3. API First Design
4. Event Driven Communication
5. Independent Deployment
6. Loose Coupling
7. High Maintainability

---

# 16. Architecture Success Criteria

Architecture dianggap berhasil apabila:

* Seluruh service berjalan independen.
* REST API berjalan.
* GraphQL berjalan.
* RabbitMQ berjalan.
* Docker berjalan.
* Frontend dapat mengakses seluruh service.
* Demonstrasi berjalan tanpa error.

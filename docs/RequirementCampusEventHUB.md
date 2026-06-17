# CampusEventHUB Requirements Document

## Project Information

### Project Name

CampusEventHUB

### Repository Description

Campus EventHub adalah sistem terintegrasi berbasis microservices untuk mengelola berbagai kegiatan kampus seperti seminar, workshop, webinar, lomba, pelatihan, dan sertifikasi. Sistem memungkinkan mahasiswa melakukan pendaftaran event, panitia mengelola event, sistem mengirim notifikasi otomatis, dan sertifikat digital diterbitkan setelah event selesai.

---

# Project Goals

Membangun sistem enterprise berbasis microservices yang mengimplementasikan:

* RESTful API
* GraphQL API (Manual)
* GraphQL Hasura
* Message Broker
* Docker Deployment
* Database Per Service
* Frontend Terintegrasi

---

# Technology Stack

## Backend

* Laravel 12
* PHP 8.3

## Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS

## Database

* MySQL 8

## GraphQL

### Manual GraphQL

* Lighthouse GraphQL

### GraphQL Engine

* Hasura

## Message Broker

* RabbitMQ

## Containerization

* Docker
* Docker Compose

---

# High Level Architecture

Frontend akan berkomunikasi dengan:

* REST API Service
* GraphQL Gateway
* Hasura GraphQL Engine

Setiap microservice memiliki database sendiri (Database Per Service Pattern).

Komunikasi asynchronous antar service menggunakan RabbitMQ.

---

# Service Architecture

## Service 1 - User Service

### Responsibility

Mengelola data pengguna sistem.

### Features

* Register User
* Login User
* JWT Authentication
* Profile Management
* Role Management
* User Information

### Database

campus_eventhub_users

### Main Tables

* users
* roles
* user_roles

### REST Endpoints

POST /api/register

POST /api/login

GET /api/profile

PUT /api/profile

### GraphQL

* User
* Users
* UserProfile

---

## Service 2 - Event Service

### Responsibility

Mengelola seluruh event kampus.

### Features

* Create Event
* Update Event
* Delete Event
* Publish Event
* Event Category Management
* Event Detail Management

### Database

campus_eventhub_events

### Main Tables

* events
* categories

### REST Endpoints

GET /api/events

GET /api/events/{id}

POST /api/events

PUT /api/events/{id}

DELETE /api/events/{id}

### GraphQL

* Event
* Events
* EventDetail

---

## Service 3 - Registration Service

### Responsibility

Mengelola pendaftaran peserta event.

### Features

* Register Event
* Cancel Registration
* Participant Validation
* Attendance Management
* Registration History

### Database

campus_eventhub_registrations

### Main Tables

* registrations
* attendances

### REST Endpoints

POST /api/registrations

DELETE /api/registrations/{id}

GET /api/registrations

GET /api/registrations/history

### GraphQL

* Registration
* Registrations
* Participant

---

## Service 4 - Notification & Certificate Service

### Responsibility

Mengelola notifikasi dan sertifikat digital.

### Features

* Notification Management
* Certificate Generation
* Certificate Verification
* Notification History

### Database

campus_eventhub_notifications

### Main Tables

* notifications
* certificates

### REST Endpoints

POST /api/notifications

GET /api/notifications

GET /api/certificates

GET /api/certificates/{id}

### GraphQL

* Notification
* Notifications
* Certificate

---

# Shared Frontend Application

## Responsibility

Menyediakan antarmuka pengguna untuk seluruh sistem.

### Features

#### Mahasiswa

* Login
* Registrasi Akun
* Melihat Daftar Event
* Detail Event
* Pendaftaran Event
* Riwayat Pendaftaran
* Download Sertifikat

#### Panitia

* Dashboard Event
* Membuat Event
* Mengubah Event
* Mengelola Peserta
* Melihat Statistik Event

### Communication

Frontend dapat mengakses:

* REST API
* GraphQL API
* Hasura GraphQL API

---

# Message Broker Architecture

RabbitMQ digunakan untuk komunikasi asynchronous antar service.

---

## Event Created

Publisher:

Event Service

Consumer:

Notification Service

Event:

event.created

Action:

Mengirim notifikasi event baru.

---

## Registration Created

Publisher:

Registration Service

Consumer:

Notification Service

Event:

registration.created

Action:

Mengirim notifikasi pendaftaran berhasil.

---

## Event Finished

Publisher:

Event Service

Consumer:

Notification & Certificate Service

Event:

event.finished

Action:

Generate sertifikat otomatis.

---

## Certificate Generated

Publisher:

Notification & Certificate Service

Consumer:

Notification Service

Event:

certificate.generated

Action:

Mengirim notifikasi sertifikat tersedia.

---

# GraphQL Implementation

## Manual GraphQL

Menggunakan Laravel Lighthouse.

Fitur:

* Query User
* Query Event
* Query Registration
* Query Certificate
* Mutation Event
* Mutation Registration

---

## Hasura GraphQL

Menggunakan Hasura sebagai GraphQL Engine.

Fitur:

* Auto Generated Schema
* Auto CRUD
* Relationship Query
* Filtering
* Pagination
* Aggregate Query

---

# Docker Deployment

Setiap service berjalan dalam container berbeda.

## Containers

Frontend

* frontend-app

Backend Services

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

Total Container:

10 Container

---

# Database Design

## User Service Database

* users
* roles
* user_roles

## Event Service Database

* events
* categories

## Registration Service Database

* registrations
* attendances

## Notification Service Database

* notifications
* certificates

---

# Functional Requirements

## User Management

* User dapat register.
* User dapat login.
* User dapat mengubah profil.

## Event Management

* Panitia dapat membuat event.
* Panitia dapat mengubah event.
* Panitia dapat menghapus event.
* Panitia dapat mempublikasikan event.

## Registration Management

* Mahasiswa dapat mendaftar event.
* Mahasiswa dapat membatalkan pendaftaran.
* Sistem menyimpan riwayat pendaftaran.

## Notification Management

* Sistem mengirim notifikasi otomatis.
* Sistem menyimpan riwayat notifikasi.

## Certificate Management

* Sistem membuat sertifikat otomatis.
* Mahasiswa dapat mengunduh sertifikat.
* Sertifikat dapat diverifikasi.

---

# Non Functional Requirements

## Security

* JWT Authentication
* Password Hashing
* Role Based Access Control

## Performance

* Response Time < 2 Seconds

## Scalability

* Docker Based Deployment
* Independent Services

## Maintainability

* Clean Architecture
* Service Isolation
* API Documentation

---

# Deliverables

1. GitHub Repository
2. Docker Compose Deployment
3. REST API Documentation (Postman)
4. GraphQL Documentation
5. Hasura Documentation
6. Architecture Diagram
7. Final Report PDF
8. Presentation Slide
9. Demo Video

---

# Team Distribution

## Member 1

User Service

## Member 2

Event Service

## Member 3

Registration Service

## Member 4

Notification & Certificate Service

## All Members

Frontend Application
Docker Deployment
GraphQL Integration
System Testing
Documentation
Presentation

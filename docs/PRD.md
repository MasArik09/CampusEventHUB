# Product Requirements Document (PRD)

# CampusEventHUB

Version: 1.0

Status: Approved

---

# 1. Project Overview

## 1.1 Project Name

CampusEventHUB

## 1.2 Project Description

CampusEventHUB adalah platform terintegrasi berbasis microservices yang digunakan untuk mengelola berbagai kegiatan kampus seperti seminar, workshop, webinar, lomba, pelatihan, dan kegiatan akademik lainnya.

Sistem memungkinkan mahasiswa menemukan dan mendaftar event kampus secara online, panitia mengelola event dan peserta, sistem mengirim notifikasi otomatis, serta menghasilkan sertifikat digital setelah event selesai.

Project ini dikembangkan sebagai implementasi konsep Enterprise Application Integration (EAI) menggunakan pendekatan Microservices Architecture.

---

# 2. Problem Statement

Proses pengelolaan event kampus sering dilakukan secara manual menggunakan formulir online terpisah, spreadsheet, dan komunikasi melalui media sosial.

Masalah yang sering muncul:

* Data peserta tersebar di berbagai platform.
* Sulit melakukan monitoring peserta.
* Tidak ada sistem notifikasi otomatis.
* Sertifikat dibuat secara manual.
* Sulit mengintegrasikan data antar bagian.

CampusEventHUB hadir sebagai solusi untuk mengintegrasikan seluruh proses tersebut dalam satu platform.

---

# 3. Project Objectives

Tujuan utama sistem:

* Mengelola event kampus secara terpusat.
* Memudahkan mahasiswa menemukan event.
* Mempermudah proses pendaftaran peserta.
* Mengotomatisasi notifikasi.
* Mengotomatisasi pembuatan sertifikat.
* Mengimplementasikan konsep Microservices.
* Mengimplementasikan REST API.
* Mengimplementasikan GraphQL.
* Mengimplementasikan Message Broker.
* Mengimplementasikan Docker Deployment.

---

# 4. Target Users

## Mahasiswa

Pengguna yang mengikuti event kampus.

Hak akses:

* Registrasi akun
* Login
* Melihat event
* Mendaftar event
* Melihat riwayat pendaftaran
* Mengunduh sertifikat

---

## Panitia Event

Pengguna yang mengelola event.

Hak akses:

* Membuat event
* Mengubah event
* Menghapus event
* Mengelola peserta
* Menandai event selesai

---

## Administrator

Pengguna yang mengelola sistem secara keseluruhan.

Hak akses:

* Mengelola pengguna
* Mengelola role
* Monitoring seluruh event
* Monitoring seluruh service

---

# 5. Product Scope

## Included Scope

### User Management

* Registrasi akun
* Login
* Logout
* Profile management
* Role management

### Event Management

* Membuat event
* Mengubah event
* Menghapus event
* Publish event
* Event category

### Registration Management

* Pendaftaran event
* Pembatalan pendaftaran
* Riwayat pendaftaran
* Validasi peserta

### Attendance Management

* Kehadiran peserta
* Rekap kehadiran

### Notification Management

* Notifikasi event baru
* Notifikasi pendaftaran berhasil
* Notifikasi sertifikat tersedia

### Certificate Management

* Generate sertifikat
* Download sertifikat
* Verifikasi sertifikat

---

## Excluded Scope

Fitur berikut tidak termasuk dalam versi pertama:

* Pembayaran online
* Video conference
* Livestreaming
* Mobile application
* Integrasi email kampus
* AI recommendation system

---

# 6. Core Features

## Feature 1

User Registration & Authentication

Deskripsi:

Mahasiswa dapat membuat akun dan login ke sistem.

Priority:

High

---

## Feature 2

Event Discovery

Deskripsi:

Mahasiswa dapat melihat daftar event yang tersedia.

Priority:

High

---

## Feature 3

Event Registration

Deskripsi:

Mahasiswa dapat mendaftar ke event.

Priority:

High

---

## Feature 4

Event Management

Deskripsi:

Panitia dapat membuat dan mengelola event.

Priority:

High

---

## Feature 5

Notification Automation

Deskripsi:

Sistem mengirim notifikasi otomatis berdasarkan event tertentu.

Priority:

Medium

---

## Feature 6

Certificate Generation

Deskripsi:

Sertifikat dibuat secara otomatis ketika event selesai.

Priority:

High

---

# 7. User Journey

## Mahasiswa

Register

↓

Login

↓

Melihat Daftar Event

↓

Melihat Detail Event

↓

Mendaftar Event

↓

Mengikuti Event

↓

Mendapat Sertifikat

↓

Download Sertifikat

---

## Panitia

Login

↓

Membuat Event

↓

Publish Event

↓

Mengelola Peserta

↓

Menandai Event Selesai

↓

Sertifikat Dibuat Otomatis

---

# 8. Business Rules

## User Rules

* Email harus unik.
* Password minimal 8 karakter.
* User harus login sebelum mendaftar event.

---

## Event Rules

* Event harus memiliki tanggal mulai.
* Event harus memiliki tanggal selesai.
* Event harus memiliki kuota peserta.

---

## Registration Rules

* Peserta tidak boleh mendaftar dua kali pada event yang sama.
* Pendaftaran ditutup ketika kuota penuh.

---

## Certificate Rules

* Sertifikat hanya dapat dibuat untuk peserta yang hadir.
* Sertifikat hanya tersedia setelah event selesai.

---

# 9. Microservices Definition

## User Service

Bertanggung jawab terhadap:

* Authentication
* User management
* Role management

Database:

campus_eventhub_users

---

## Event Service

Bertanggung jawab terhadap:

* Event management
* Event category

Database:

campus_eventhub_events

---

## Registration Service

Bertanggung jawab terhadap:

* Registration
* Attendance

Database:

campus_eventhub_registrations

---

## Notification & Certificate Service

Bertanggung jawab terhadap:

* Notification
* Certificate

Database:

campus_eventhub_notifications

---

# 10. Frontend Application

Framework:

Next.js

Tujuan:

Menyediakan antarmuka pengguna untuk seluruh sistem.

Fitur utama:

* Authentication UI
* Event Dashboard
* Event Registration
* User Dashboard
* Certificate Dashboard
* Admin Dashboard

---

# 11. Integration Requirements

## REST API

Digunakan untuk komunikasi standar antar client dan service.

---

## GraphQL

Digunakan untuk kebutuhan query fleksibel.

Implementasi:

* Laravel Lighthouse
* Hasura

---

## Message Broker

RabbitMQ digunakan untuk komunikasi asynchronous.

Event utama:

* event.created
* registration.created
* event.finished
* certificate.generated

---

# 12. Non Functional Requirements

## Security

* User Authentication
* Password Hashing
* RBAC

---

## Performance

* Response time kurang dari 2 detik

---

## Availability

* Service berjalan menggunakan Docker

---

## Scalability

* Setiap service dapat dikembangkan secara independen

---

## Maintainability

* Clean Architecture
* Modular Services
* API Documentation

---

# 13. Success Criteria

Project dianggap berhasil apabila:

* Semua microservice berjalan.
* REST API berjalan.
* GraphQL berjalan.
* Hasura berjalan.
* RabbitMQ berjalan.
* Docker deployment berhasil.
* Mahasiswa dapat mendaftar event.
* Panitia dapat mengelola event.
* Sertifikat dapat dihasilkan otomatis.
* Sistem dapat didemonstrasikan dengan baik.

---

# 14. Deliverables

* Source Code
* Docker Compose
* REST API Documentation
* GraphQL Documentation
* Hasura Configuration
* Architecture Diagram
* Database Schema
* Final Report
* Presentation Slides
* Demo Project

# UI Flow Document

# CampusEventHUB

Version: 1.0

Status: Final

---

# 1. Overview

Dokumen ini menjelaskan alur navigasi pengguna pada aplikasi CampusEventHUB.

Frontend menggunakan:

* Next.js 15
* TypeScript
* Tailwind CSS

Target User:

* Student
* Committee
* Admin

---

# 2. Sitemap

```text
Landing Page
│
├── Login
├── Register
│
└── Dashboard
     │
     ├── Event List
     │    └── Event Detail
     │          └── Register Event
     │
     ├── Registration History
     │
     ├── Certificates
     │
     └── Profile
```

---

# 3. Authentication Flow

```text
User
 │
 ▼
Login Page
 │
 ▼
Input Email & Password
 │
 ▼
Authentication Success
 │
 ▼
Dashboard
```

---

# Register Flow

```text
User
 │
 ▼
Register Page
 │
 ▼
Input Data
 │
 ▼
Create Account
 │
 ▼
Login
 │
 ▼
Dashboard
```

---

# 4. Student Flow

## View Events

```text
Dashboard
 │
 ▼
Event List
 │
 ▼
Event Detail
```

---

## Register Event

```text
Event Detail
 │
 ▼
Register Event
 │
 ▼
Registration Success
 │
 ▼
Notification Created
```

---

## View Registration History

```text
Dashboard
 │
 ▼
Registration History
```

---

## Download Certificate

```text
Dashboard
 │
 ▼
Certificate Dashboard
 │
 ▼
Certificate Detail
 │
 ▼
Download Certificate
```

---

# 5. Committee Flow

## Create Event

```text
Committee Dashboard
 │
 ▼
Create Event
 │
 ▼
Publish Event
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

---

## Manage Event

```text
Committee Dashboard
 │
 ▼
Event List
 │
 ▼
Event Detail
 │
 ▼
Edit Event
```

---

## Manage Participants

```text
Committee Dashboard
 │
 ▼
Participant List
 │
 ▼
Attendance Management
```

---

## Finish Event

```text
Committee Dashboard
 │
 ▼
Event Detail
 │
 ▼
Finish Event
 │
 ▼
event.finished
 │
 ▼
RabbitMQ
 │
 ▼
Certificate Generated
```

---

# 6. Admin Flow

## Manage Users

```text
Admin Dashboard
 │
 ▼
User List
 │
 ▼
User Detail
```

---

## System Monitoring

```text
Admin Dashboard
 │
 ▼
Service Monitoring
 │
 ▼
Statistics
```

---

# 7. Page List

## Public Pages

### Landing Page

Route:

```text
/
```

Purpose:

Menampilkan informasi sistem.

---

### Login Page

Route:

```text
/login
```

---

### Register Page

Route:

```text
/register
```

---

# Student Pages

### Dashboard

Route:

```text
/dashboard
```

---

### Event List

Route:

```text
/events
```

---

### Event Detail

Route:

```text
/events/[id]
```

---

### Registration History

Route:

```text
/registrations
```

---

### Certificates

Route:

```text
/certificates
```

---

### Profile

Route:

```text
/profile
```

---

# Committee Pages

### Event Management

Route:

```text
/committee/events
```

---

### Create Event

Route:

```text
/committee/events/create
```

---

### Edit Event

Route:

```text
/committee/events/[id]/edit
```

---

### Participant Management

Route:

```text
/committee/participants
```

---

# Admin Pages

### User Management

Route:

```text
/admin/users
```

---

### Monitoring

Route:

```text
/admin/monitoring
```

---

# 8. UI Components

## Shared Components

* Navbar
* Sidebar
* Footer
* Notification Dropdown
* User Menu
* Pagination
* Search Bar

---

## Event Components

* Event Card
* Event Detail Card
* Category Badge
* Registration Button

---

## Certificate Components

* Certificate Card
* Download Button
* Verification Badge

---

# 9. Dashboard Widgets

## Student Dashboard

* Total Registered Events
* Upcoming Events
* Certificates Earned
* Recent Notifications

---

## Committee Dashboard

* Total Events
* Total Participants
* Upcoming Events
* Event Statistics

---

## Admin Dashboard

* Total Users
* Total Events
* Total Registrations
* System Statistics

---

# 10. Responsive Design

Supported Devices:

* Desktop
* Tablet
* Mobile

Breakpoints:

* Mobile
* Tablet
* Desktop

---

# 11. UI Flow Success Criteria

UI dianggap berhasil apabila:

* User dapat login.
* User dapat melihat event.
* User dapat mendaftar event.
* User dapat melihat riwayat pendaftaran.
* User dapat mengunduh sertifikat.
* Committee dapat mengelola event.
* Admin dapat mengelola pengguna.

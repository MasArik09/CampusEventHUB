# Frontend Design Document

# CampusEventHUB

Version: 1.0

Status: Final

---

# 1. Design Philosophy

CampusEventHUB menggunakan pendekatan desain:

* Modern
* Professional
* Clean

Inspirasi utama:

Eventbrite

Target utama:

Mahasiswa Kampus

Target sekunder:

Panitia Event

---

# 2. Design Goals

Frontend harus:

* Mudah digunakan
* Terlihat profesional
* Mudah didemonstrasikan
* Konsisten di seluruh halaman
* Cepat dikembangkan menggunakan AI Agent

Prioritas:

1. Tampilan Profesional
2. Banyak Fitur
3. Mudah Demo
4. Kecepatan Development
5. Mobile Friendly

---

# 3. Visual Identity

## Brand Personality

Campus Event Platform

Karakter:

* Modern
* Academic
* Startup Style
* Friendly
* Professional

---

# 4. Color System

## Primary Color

Orange

Purpose:

* CTA Button
* Active Navigation
* Highlight

Suggested:

```css
#F97316
```

---

## Secondary Color

Maroon

Purpose:

* Branding
* Header Accent
* Logo Accent

Suggested:

```css
#7F1D1D
```

---

## Dark Background

Suggested:

```css
#111827
```

---

## Surface Color

Suggested:

```css
#1F2937
```

---

## Border Color

Suggested:

```css
#374151
```

---

## Text Primary

Suggested:

```css
#F9FAFB
```

---

## Text Secondary

Suggested:

```css
#9CA3AF
```

---

## Success

```css
#22C55E
```

---

## Warning

```css
#F59E0B
```

---

## Danger

```css
#EF4444
```

---

# 5. Theme

Default Theme:

Dark Mode

Tidak perlu Light Mode.

Fokus:

Desktop Experience

---

# 6. Typography

Font Family:

Inter

Fallback:

sans-serif

---

# Heading

Weight:

700

---

# Body

Weight:

400

---

# Button

Weight:

600

---

# 7. Layout System

## Desktop Layout

Pattern:

Top Navigation

```text
+--------------------------------------+
| Logo | Menu | Notification | Profile |
+--------------------------------------+

+--------------------------------------+
|                                      |
|           Page Content               |
|                                      |
+--------------------------------------+
```

---

## Content Width

Max Width:

1280px

Container Centered:

Yes

---

# 8. Landing Page Design

Route:

/

---

## Section 1

Hero Section

Content:

* Headline
* Subheadline
* Browse Events Button
* Register Button

---

## Section 2

Featured Events

Display:

Event Cards

Maximum:

6 Event Cards

---

## Section 3

FAQ

Accordion Layout

---

## Section 4

Footer

Content:

* About
* Contact
* Social Media
* Copyright

---

# 9. Student Dashboard

Route:

/dashboard

---

## Dashboard Widgets

* Total Registered Events
* Upcoming Events
* Unread Notifications

---

## Dashboard Layout

```text
[Widget][Widget][Widget]

[Upcoming Events]

[Recent Notifications]
```

---

# 10. Event List Page

Route:

/events

---

## Layout

Card Grid

Columns:

Desktop:

3 Columns

Tablet:

2 Columns

Mobile:

1 Column

---

## Event Card Content

* Event Banner
* Event Title
* Category
* Date
* Location
* Remaining Quota
* Detail Button

---

## Features

Search

Filters:

* Category
* Date
* Location

Sort:

* Latest
* Oldest

---

# 11. Event Detail Page

Route:

/events/[id]

---

## Sections

* Banner
* Event Information
* Description
* Schedule
* Location
* Quota
* Register Button

---

# 12. Registration Page

Route:

/registrations

---

## Features

* Registration History
* Status Badge
* Attendance Status

---

# 13. Certificate Page

Route:

/certificates

---

## Layout

Card Grid

Certificate Card:

* Certificate Number
* Event Name
* Issue Date
* Download Button

---

## Actions

* Download PDF
* View Detail

---

# 14. Notification System

Display:

Bell Icon

Position:

Navbar Right

---

## Dropdown Content

* Event Notification
* Registration Notification
* Certificate Notification

---

# 15. Committee Dashboard

Route:

/committee

---

## Widgets

* Total Events
* Active Events
* Completed Events
* Total Participants

---

## Statistics

Library:

Recharts

Charts:

* Event Participation Trend
* Event Category Distribution

---

# 16. Event Management

Route:

/committee/events

---

## Table Features

* Search
* Pagination
* Sorting
* Filter

---

## Actions

* Create
* Edit
* Delete
* Publish
* Finish Event

---

# 17. Participant Management

Route:

/committee/participants

---

## Table Content

* Participant Name
* Event Name
* Registration Status
* Attendance Status

---

## Actions

* Mark Attendance
* View Detail

---

# 18. Component Library

UI Library:

shadcn/ui

---

## Icon Library

Lucide React

---

## Tables

TanStack Table

---

## Forms

React Hook Form

Validation:

Zod

---

# 19. Component Rules

All forms must use:

* Card Container
* Label
* Input
* Validation Message

---

All tables must support:

* Pagination
* Search
* Loading State
* Empty State

---

All buttons must support:

* Hover State
* Disabled State
* Loading State

---

# 20. Responsive Rules

Desktop:

Primary Target

---

Tablet:

Supported

---

Mobile:

Basic Support Only

---

# 21. AI Agent Frontend Rules

Always use:

* Next.js App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide React
* TanStack Table
* React Hook Form
* Zod
* Recharts

Never use:

* Bootstrap
* jQuery
* Inline CSS
* Material UI
* Chakra UI

---

# 22. Design Success Criteria

Frontend dianggap berhasil apabila:

* Tampilan konsisten.
* Dark mode berjalan baik.
* Event mudah ditemukan.
* Dashboard mudah dipahami.
* Form mudah digunakan.
* Demo terlihat profesional.
* Terlihat seperti produk startup modern.

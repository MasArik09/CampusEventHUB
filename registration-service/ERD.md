# Registration Service ERD

Database:

campus_eventhub_registrations

---

# Tables

## registrations

| Column        | Type                       |
| ------------- | -------------------------- |
| id            | bigint                     |
| user_id       | bigint                     |
| event_id      | bigint                     |
| status        | enum(registered,cancelled) |
| registered_at | datetime                   |
| created_at    | timestamp                  |
| updated_at    | timestamp                  |

---

## attendances

| Column            | Type                 |
| ----------------- | -------------------- |
| id                | bigint               |
| registration_id   | bigint               |
| attendance_status | enum(present,absent) |
| attendance_time   | datetime             |
| created_at        | timestamp            |
| updated_at        | timestamp            |

---

# Relationship

registrations (1)

↓

attendances (1)

---

# Registration Status

* registered
* cancelled

---

# Attendance Status

* present
* absent

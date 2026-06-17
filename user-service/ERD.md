# User Service ERD

Database:

campus_eventhub_users

---

# Tables

## users

| Column     | Type         |
| ---------- | ------------ |
| id         | bigint       |
| name       | varchar(255) |
| email      | varchar(255) |
| password   | varchar(255) |
| role_id    | bigint       |
| created_at | timestamp    |
| updated_at | timestamp    |

---

## roles

| Column     | Type         |
| ---------- | ------------ |
| id         | bigint       |
| name       | varchar(100) |
| created_at | timestamp    |
| updated_at | timestamp    |

---

# Relationship

roles (1)

↓

users (N)

---

# Initial Roles

* Admin
* Committee
* Student

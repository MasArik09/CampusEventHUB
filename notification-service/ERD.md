# Notification & Certificate Service ERD

Database:

campus_eventhub_notifications

---

# Tables

## notifications

| Column     | Type         |
| ---------- | ------------ |
| id         | bigint       |
| user_id    | bigint       |
| title      | varchar(255) |
| message    | text         |
| is_read    | boolean      |
| created_at | timestamp    |
| updated_at | timestamp    |

---

## certificates

| Column             | Type         |
| ------------------ | ------------ |
| id                 | bigint       |
| user_id            | bigint       |
| event_id           | bigint       |
| certificate_number | varchar(100) |
| issued_at          | datetime     |
| verification_code  | varchar(255) |
| created_at         | timestamp    |
| updated_at         | timestamp    |

---

# Relationship

Tidak ada foreign key langsung ke database service lain.

Data user_id dan event_id disimpan sebagai reference ID.

---

# Notification Status

is_read

* true
* false

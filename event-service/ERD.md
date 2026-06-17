# Event Service ERD

Database:

campus_eventhub_events

---

# Tables

## categories

| Column     | Type         |
| ---------- | ------------ |
| id         | bigint       |
| name       | varchar(255) |
| created_at | timestamp    |
| updated_at | timestamp    |

---

## events

| Column      | Type                           |
| ----------- | ------------------------------ |
| id          | bigint                         |
| title       | varchar(255)                   |
| description | text                           |
| location    | varchar(255)                   |
| start_date  | datetime                       |
| end_date    | datetime                       |
| quota       | integer                        |
| category_id | bigint                         |
| status      | enum(draft,published,finished) |
| created_by  | bigint                         |
| created_at  | timestamp                      |
| updated_at  | timestamp                      |

---

# Relationship

categories (1)

↓

events (N)

---

# Event Status

* draft
* published
* finished

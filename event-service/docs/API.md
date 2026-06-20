# Event Service REST API Documentation

Base URL: `http://localhost:8002/api`

## Headers
Set the following headers for all requests:
*   `Accept`: `application/json`
*   `Content-Type`: `application/json`

---

## Endpoint List

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/events` | Get all events (with Search, Filter & Pagination) |
| **POST** | `/events` | Create a new event |
| **GET** | `/events/{id}` | Get event detail |
| **PUT** | `/events/{id}` | Update an event |
| **DELETE** | `/events/{id}` | Delete an event |
| **PATCH** | `/events/{id}/publish` | Publish an event |
| **PATCH** | `/events/{id}/finish` | Finish an event |

---

## Endpoints Detail

### 1. GET /events
Mendapatkan daftar event terpaginasi (10 item per halaman) beserta data kategori. Mendukung pencarian dan penyaringan.

*   **Query Parameters (Optional):**
    *   `search` (string): Pencarian berdasarkan judul atau deskripsi event (pencarian parsial `like`).
    *   `category_id` (integer): Filter berdasarkan ID kategori (e.g. `1` untuk Seminar).
    *   `status` (string): Filter berdasarkan status event (`draft`, `published`, `finished`).
    *   `date` (string `YYYY-MM-DD`): Filter event yang sedang berlangsung pada tanggal tersebut.

*   **Example Request:**
    `GET http://localhost:8002/api/events?search=laravel&status=draft`

*   **Example Response (200 OK):**
    ```json
    {
        "data": [
            {
                "id": 1,
                "title": "Workshop Laravel 12",
                "description": "Workshop intensif membangun REST API dengan Laravel 12",
                "location": "Aula Teknik Lantai 3",
                "start_date": "2026-07-01 08:00:00",
                "end_date": "2026-07-01 17:00:00",
                "quota": 50,
                "status": "draft",
                "created_by": 1,
                "category": {
                    "id": 2,
                    "name": "Workshop"
                },
                "created_at": "2026-06-20T03:20:00.000000Z",
                "updated_at": "2026-06-20T03:20:00.000000Z"
            }
        ],
        "links": {
            "first": "http://localhost:8002/api/events?page=1",
            "last": "http://localhost:8002/api/events?page=1",
            "prev": null,
            "next": null
        },
        "meta": {
            "current_page": 1,
            "from": 1,
            "last_page": 1,
            "links": [
                {
                    "url": null,
                    "label": "&laquo; Previous",
                    "active": false
                },
                {
                    "url": "http://localhost:8002/api/events?page=1",
                    "label": "1",
                    "active": true
                },
                {
                    "url": null,
                    "label": "Next &raquo;",
                    "active": false
                }
            ],
            "path": "http://localhost:8002/api/events",
            "per_page": 10,
            "to": 1,
            "total": 1
        },
        "success": true
    }
    ```

---

### 2. POST /events
Membuat event baru. Saat event berhasil dibuat, sistem akan mengirimkan event `event.created` ke RabbitMQ.

*   **Request Body (JSON):**
    ```json
    {
        "title": "Seminar Nasional AI 2026",
        "description": "Seminar mengenai perkembangan AI di masa depan.",
        "location": "Gedung Serbaguna Kampus A",
        "start_date": "2026-07-20 09:00:00",
        "end_date": "2026-07-20 15:00:00",
        "quota": 100,
        "category_id": 1,
        "created_by": 12
    }
    ```

*   **Example Response (201 Created):**
    ```json
    {
        "success": true,
        "message": "Event berhasil dibuat.",
        "data": {
            "id": 2,
            "title": "Seminar Nasional AI 2026",
            "description": "Seminar mengenai perkembangan AI di masa depan.",
            "location": "Gedung Serbaguna Kampus A",
            "start_date": "2026-07-20 09:00:00",
            "end_date": "2026-07-20 15:00:00",
            "quota": 100,
            "status": "draft",
            "created_by": 12,
            "category": {
                "id": 1,
                "name": "Seminar"
            },
            "created_at": "2026-06-20T04:10:00.000000Z",
            "updated_at": "2026-06-20T04:10:00.000000Z"
        }
    }
    ```

*   **Error Response (422 Unprocessable Content - Validasi Gagal):**
    ```json
    {
        "message": "Judul event wajib diisi. (and 6 more errors)",
        "errors": {
            "title": ["Judul event wajib diisi."],
            "end_date": ["Tanggal selesai harus sama atau setelah tanggal mulai."]
        }
    }
    ```

---

### 3. GET /events/{id}
Mendapatkan detail satu event berdasarkan ID.

*   **Example Response (200 OK):**
    ```json
    {
        "success": true,
        "data": {
            "id": 2,
            "title": "Seminar Nasional AI 2026",
            "description": "Seminar mengenai perkembangan AI di masa depan.",
            "location": "Gedung Serbaguna Kampus A",
            "start_date": "2026-07-20 09:00:00",
            "end_date": "2026-07-20 15:00:00",
            "quota": 100,
            "status": "draft",
            "created_by": 12,
            "category": {
                "id": 1,
                "name": "Seminar"
            },
            "created_at": "2026-06-20T04:10:00.000000Z",
            "updated_at": "2026-06-20T04:10:00.000000Z"
        }
    }
    ```

*   **Error Response (404 Not Found):**
    ```json
    {
        "message": "Record not found."
    }
    ```

---

### 4. PUT /events/{id}
Mengupdate sebagian atau seluruh data event.

*   **Request Body (JSON - Seluruh field opsional):**
    ```json
    {
        "title": "Seminar Nasional AI 2026 - Edisi Terbaru",
        "quota": 150
    }
    ```

*   **Example Response (200 OK):**
    ```json
    {
        "success": true,
        "message": "Event berhasil diperbarui.",
        "data": {
            "id": 2,
            "title": "Seminar Nasional AI 2026 - Edisi Terbaru",
            "description": "Seminar mengenai perkembangan AI di masa depan.",
            "location": "Gedung Serbaguna Kampus A",
            "start_date": "2026-07-20 09:00:00",
            "end_date": "2026-07-20 15:00:00",
            "quota": 150,
            "status": "draft",
            "created_by": 12,
            "category": {
                "id": 1,
                "name": "Seminar"
            },
            "created_at": "2026-06-20T04:10:00.000000Z",
            "updated_at": "2026-06-20T04:12:00.000000Z"
        }
    }
    ```

---

### 5. DELETE /events/{id}
Menghapus event berdasarkan ID.

*   **Example Response (200 OK):**
    ```json
    {
        "success": true,
        "message": "Event berhasil dihapus."
    }
    ```

---

### 6. PATCH /events/{id}/publish
Mengubah status event menjadi `published`.

*   **Example Response (200 OK):**
    ```json
    {
        "success": true,
        "message": "Event berhasil dipublish.",
        "data": {
            "id": 2,
            "title": "Seminar Nasional AI 2026 - Edisi Terbaru",
            "description": "Seminar mengenai perkembangan AI di masa depan.",
            "location": "Gedung Serbaguna Kampus A",
            "start_date": "2026-07-20 09:00:00",
            "end_date": "2026-07-20 15:00:00",
            "quota": 150,
            "status": "published",
            "created_by": 12,
            "category": {
                "id": 1,
                "name": "Seminar"
            },
            "created_at": "2026-06-20T04:10:00.000000Z",
            "updated_at": "2026-06-20T04:15:00.000000Z"
        }
    }
    ```

*   **Error Response (422 Unprocessable Content - Sudah Publish):**
    ```json
    {
        "success": false,
        "message": "Event sudah dalam status published."
    }
    ```

---

### 7. PATCH /events/{id}/finish
Mengubah status event menjadi `finished`. Saat berhasil, sistem akan mengirimkan event `event.finished` ke RabbitMQ.

*   **Example Response (200 OK):**
    ```json
    {
        "success": true,
        "message": "Event finished successfully",
        "data": {
            "id": 2,
            "title": "Seminar Nasional AI 2026 - Edisi Terbaru",
            "description": "Seminar mengenai perkembangan AI di masa depan.",
            "location": "Gedung Serbaguna Kampus A",
            "start_date": "2026-07-20 09:00:00",
            "end_date": "2026-07-20 15:00:00",
            "quota": 150,
            "status": "finished",
            "created_by": 12,
            "category": {
                "id": 1,
                "name": "Seminar"
            },
            "created_at": "2026-06-20T04:10:00.000000Z",
            "updated_at": "2026-06-20T04:20:00.000000Z"
        }
    }
    ```

*   **Error Response (422 Unprocessable Content - Sudah Finished):**
    ```json
    {
        "success": false,
        "message": "Event sudah dalam status finished."
    }
    ```

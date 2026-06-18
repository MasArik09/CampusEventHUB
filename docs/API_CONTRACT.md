# API Contract Document

# CampusEventHUB

Version: 1.0

Status: Final

---

# API Standard

## Base Response

Success Response

```json
{
  "success": true,
  "message": "Success",
  "data": {}
}
```

---

Error Response

```json
{
  "success": false,
  "message": "Validation Error",
  "errors": {}
}
```

---

# Authentication

Authentication Type:

Session / Basic Authentication

---

# USER SERVICE API

Base URL

```http
/api/users
```

---

## Register User

Endpoint

```http
POST /register
```

Request

```json
{
  "name": "Arik",
  "email": "arik@mail.com",
  "password": "password123"
}
```

Response

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

## Login User

Endpoint

```http
POST /login
```

Request

```json
{
  "email": "arik@mail.com",
  "password": "password123"
}
```

Response

```json
{
  "success": true
}
```

---

## Get Profile

Endpoint

```http
GET /profile
```

Response

```json
{
  "id": 1,
  "name": "Arik",
  "email": "arik@mail.com"
}
```

---

## Update Profile

Endpoint

```http
PUT /profile
```

Request

```json
{
  "name": "Arik Updated"
}
```

---

# EVENT SERVICE API

Base URL

```http
/api/events
```

---

## Create Event

Endpoint

```http
POST /events
```

Request

```json
{
  "title": "Laravel Workshop",
  "description": "Workshop Laravel",
  "location": "Auditorium",
  "start_date": "2026-07-01",
  "end_date": "2026-07-01",
  "quota": 100,
  "category_id": 1
}
```

Response

```json
{
  "success": true,
  "event_id": 1
}
```

---

## Get Events

Endpoint

```http
GET /events
```

---

## Get Event Detail

Endpoint

```http
GET /events/{id}
```

---

## Update Event

Endpoint

```http
PUT /events/{id}
```

---

## Delete Event

Endpoint

```http
DELETE /events/{id}
```

---

## Publish Event

Endpoint

```http
PATCH /events/{id}/publish
```

---

# REGISTRATION SERVICE API

Base URL

```http
/api/registrations
```

---

## Register Event

Endpoint

```http
POST /registrations
```

Request

```json
{
  "user_id": 1,
  "event_id": 1
}
```

Response

```json
{
  "success": true,
  "registration_id": 1
}
```

---

## Cancel Registration

Endpoint

```http
DELETE /registrations/{id}
```

---

## Registration History

Endpoint

```http
GET /registrations/history
```

---

## Attendance Check

Endpoint

```http
POST /attendances
```

Request

```json
{
  "registration_id": 1,
  "status": "present"
}
```

---

# NOTIFICATION SERVICE API

Base URL

```http
/api
```

---

## Get Notifications

Endpoint

```http
GET /notifications
```

---

## Get Certificates

Endpoint

```http
GET /certificates
```

---

## Get Certificate Detail

Endpoint

```http
GET /certificates/{id}
```

---

# GRAPHQL CONTRACT

## User Type

```graphql
type User {
  id: ID!
  name: String!
  email: String!
}
```

---

## Event Type

```graphql
type Event {
  id: ID!
  title: String!
  description: String
  location: String
  quota: Int
}
```

---

## Registration Type

```graphql
type Registration {
  id: ID!
  user_id: ID!
  event_id: ID!
}
```

---

## Certificate Type

```graphql
type Certificate {
  id: ID!
  certificate_number: String!
  download_url: String
}
```

---

# GRAPHQL QUERIES

```graphql
type Query {

  users: [User]

  user(id: ID!): User

  events: [Event]

  event(id: ID!): Event

  registrations: [Registration]

  certificates: [Certificate]

}
```

---

# GRAPHQL MUTATIONS

```graphql
type Mutation {

  registerUser(
    name: String!
    email: String!
    password: String!
  ): User

  createEvent(
    title: String!
    description: String
  ): Event

  registerEvent(
    event_id: ID!
  ): Registration

}
```

---

# RABBITMQ CONTRACT

Exchange

```text
campus_eventhub
```

Type

```text
topic
```

---

## Event Created

Routing Key

```text
event.created
```

Payload

```json
{
  "event_id": 1,
  "title": "Laravel Workshop"
}
```

Publisher

Event Service

Consumer

Notification Service

---

## Registration Created

Routing Key

```text
registration.created
```

Payload

```json
{
  "registration_id": 1,
  "user_id": 1,
  "event_id": 1
}
```

Publisher

Registration Service

Consumer

Notification Service

---

## Event Finished

Routing Key

```text
event.finished
```

Payload

```json
{
  "event_id": 1
}
```

Publisher

Event Service

Consumer

Notification Service

---

## Certificate Generated

Routing Key

```text
certificate.generated
```

Payload

```json
{
  "certificate_id": 1,
  "user_id": 1
}
```

Publisher

Notification Service

Consumer

User Service

---

# Versioning Rules

REST API

```text
/api/v1/*
```

GraphQL

```text
/graphql
```

Future Changes

* Tidak boleh menghapus field lama.
* Hanya boleh menambah field baru.
* Endpoint lama harus tetap kompatibel.

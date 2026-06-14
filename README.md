# HireHelper

A full-stack service marketplace platform that connects users with trusted local service providers for everyday tasks.

HireHelper allows users to register, log in securely, browse available service providers, view provider profiles, and book services through a modern web interface.

---

# Features

## Authentication & Security

- User Registration
- User Login
- JWT Authentication
- Password Encryption using BCrypt
- Protected APIs using Spring Security
- Token-based Authorization

---

## User Dashboard

- View available service providers
- Responsive card-based UI
- Modern dashboard interface
- Protected routes after login

---

## Provider Profile

- View individual provider details
- Dynamic routing using provider ID
- Service information display

---

## Booking System

- Create service bookings
- Store bookings in MySQL
- Booking status management
- User-to-provider service requests

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- CSS3

## Backend

- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT (JSON Web Token)
- BCrypt Password Encoder

## Database

- MySQL

## Build Tools

- Maven
- Vite

---

# Architecture

The application follows a 3-Tier Architecture.

```
Frontend (React)
        |
        v
REST API Layer
(Spring Boot Controllers)
        |
        v
Business Logic Layer
(Services)
        |
        v
Data Access Layer
(Repositories)
        |
        v
MySQL Database
```

---

# Project Structure

## Backend

```
src/main/java/com/tom/hirehelper

├── config
│   └── SecurityConfig.java
│
├── controller
│   └── AuthController.java
│
├── dto
│   ├── RegisterRequest.java
│   ├── LoginRequest.java
│   └── LoginResponse.java
│
├── entity
│   ├── User.java
│   └── Booking.java
│
├── repository
│   ├── UserRepository.java
│   └── BookingRepository.java
│
├── security
│   ├── JwtService.java
│   ├── JwtFilter.java
│   └── CustomUserDetailsService.java
│
├── service
│   ├── AuthService.java
│   └── BookingService.java
│
└── HirehelperApplication.java
```

---

## Frontend

```
src

├── login
│   ├── Login.jsx
│   └── login.css
│
├── dashboard
│   ├── Dashboard.jsx
│   └── dashboard.css
│
├── provider
│   ├── ProviderProfile.jsx
│   └── provider.css
│
├── assets
│
├── App.jsx
└── main.jsx
```

---

# Database Schema

## Users Table

```sql
CREATE TABLE users(

    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    username VARCHAR(100),

    email VARCHAR(100) UNIQUE,

    password VARCHAR(255),

    role VARCHAR(50)
);
```

---

## Bookings Table

```sql
CREATE TABLE bookings(

    id BIGINT PRIMARY KEY AUTO_INCREMENT,

    user_id BIGINT,

    provider_id BIGINT,

    booking_date VARCHAR(50),

    booking_time VARCHAR(50),

    status VARCHAR(50)
);
```

---

# API Endpoints

## Authentication

### Register User

```
POST /auth/register
```

Request

```json
{
  "username": "Tom",
  "email": "tom@gmail.com",
  "password": "123456",
  "role": "USER"
}
```

---

### Login

```
POST /auth/login
```

Request

```json
{
  "email": "tom@gmail.com",
  "password": "123456"
}
```

Response

```json
{
  "token": "JWT_TOKEN"
}
```

---

## Providers

### Get All Providers

```
GET /provider
```

Header

```text
Authorization: Bearer JWT_TOKEN
```

---

## Booking

### Create Booking

```
POST /booking
```

Request

```json
{
  "providerId": 1,
  "bookingDate": "2026-06-20",
  "bookingTime": "10:00 AM"
}
```

---

# Security Flow

```
User Login
    |
    v
Spring Security
    |
    v
Password Validation
    |
    v
JWT Generated
    |
    v
Token Sent To Frontend
    |
    v
Stored In localStorage
    |
    v
Attached To API Requests
    |
    v
JWT Filter Validates Token
    |
    v
Protected Resource Access
```

---

# How To Run

## Clone Repository

```bash
git clone https://github.com/your-username/HireHelper.git
```

---

# Backend Setup

Move to backend directory

```bash
cd back-end/hirehelper
```

Configure database in

```properties
application.properties
```

Example

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hirehelper

spring.datasource.username=root

spring.datasource.password=password

jwt.secret=your-secret-key

jwt.expiration=86400000
```

Run

```bash
mvn spring-boot:run
```

Backend runs on

```text
http://localhost:8080
```

---

# Frontend Setup

Move to frontend

```bash
cd front-end/hirehelper
```

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend runs on

```text
http://localhost:5173
```

---

# Current Development Status

## Completed

- JWT Authentication
- BCrypt Password Encryption
- Spring Security
- User Registration
- User Login
- Dashboard UI
- Provider Listing
- Provider Profile Routing
- Booking API
- MySQL Integration
- React Integration

---

## In Progress

- Booking History
- Dynamic Provider Profiles
- User Profiles
- Provider Management

---

## Planned Features

- Ratings & Reviews
- Real-Time Chat
- Email Notifications
- Location-Based Matching
- Payment Gateway
- Mobile Application
- AI Recommendations

---

# Learning Objectives

This project demonstrates:

- Spring Boot Development
- REST API Design
- JWT Authentication
- Spring Security
- React Frontend Development
- MySQL Database Integration
- Full Stack Application Architecture
- Secure User Authentication
- Service-Based Marketplace Design

---

# Author

**M. Thameem Mubarak**

Electronics and Communication Engineering Student

Full Stack Developer

GitHub:
https://github.com/TameemMubarak

LinkedIn:
https://www.linkedin.com/in/thameemmubarak-javadev
<h1 align="center"> O-API </h1>
<h2 align="center"> v0.14.1-beta </h2>
<br>
<br>

<div align="center">
<div align="center">

[![My Skills](https://skillicons.dev/icons?i=ts,nodejs,express,nestjs,mongodb,docker,redis,githubactions&theme=dark)](https://skillicons.dev)

</div>

![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-000000?style=for-the-badge&logo=letsencrypt&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
<br>
![DDD](https://img.shields.io/badge/Architecture-DDD-blue?style=for-the-badge)
![Clean Architecture](https://img.shields.io/badge/Architecture-Clean-brightgreen?style=for-the-badge)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

</div>




<div align="center">

![CI](https://github.com/mhndsy37-cmd/O-API/actions/workflows/ci.yml/badge.svg)

</div>

# O-API (E-Commerce Backend)

A production-ready, highly scalable RESTful API for a modern e-commerce platform. Built with **NestJS** and **TypeScript**, strictly following **Domain-Driven Design (DDD)** and **Clean Architecture** principles.

## Key Features

- **Passwordless Authentication**: Secure OTP-based login/registration via SMS or Email. Admin and Seller accounts are protected with a mandatory 2-Step Verification (OTP + Password).
- **High-Performance Storage**: Shopping cart and OTP data are stored in **Redis** for lightning-fast read/write operations and precise TTL expiration.
- **Full E-Commerce Flow**: Complete implementation of Products, Categories (Nested Tree), Cart, Address Management, Orders, and Payment abstraction.
- **Product Reviews & Ratings**: Users can leave reviews (0-5 stars), upload images, and interact via Like/Dislike. Enforces strict business rules (e.g., one review per user per product).
- **Advanced Image Validation**: Uses `Sharp` in the backend to validate image dimensions, aspect ratios, and formats to prevent Decompression Bombs and ensure UI consistency.
- **Event-Driven Architecture**: Decoupled modules communicating via Domain Events (e.g., triggering notifications on successful payment).
- **Robust Security**: JWT, Helmet, strict Rate Limiting (Throttler), Input Validation, and Redis-based OTP cooldowns.
- **DevOps Ready**: Dockerized environment, automated CI/CD via GitHub Actions, Pino logging, and Sentry monitoring.

## Architecture Overview

This project is structured into three distinct layers to ensure separation of concerns:
- **Domain Layer**: Contains Entities, Value Objects, Domain Events, and core business rules. (Zero dependencies on frameworks).
- **Application Layer**: Orchestrates use cases, containing Services, DTOs, and Controllers.
- **Infrastructure Layer**: Handles technical details like MongoDB Schemas, Repositories, Redis integration, and external Gateways.

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Cache / Temp Storage**: Redis (ioredis)
- **Authentication**: JWT, Bcrypt (or Bcryptjs)
- **Image Processing**: Sharp, Multer
- **Documentation**: Swagger (OpenAPI)
- **DevOps**: Docker, Docker Compose, GitHub Actions
- **Observability**: Pino (Logging), Sentry (Error Tracking)

---

## Getting Started

### Option 1: Running with Docker (Recommended)

The easiest way to run the entire stack (API + MongoDB + Redis) is using Docker.

1. Clone the repository:
   ```bash
   git clone https://github.com/mhndsy37-cmd/O-API.git
   cd O-API
   ```

2. Create a `.env` file in the root directory (or copy from `.env.example`) and fill in the required variables.

3. Build and start the containers:
   ```bash
   docker compose up -d --build
   ```

4. Access the API:
   - **Base URL**: `http://localhost:3000`
   - **Swagger Documentation**: `http://localhost:3000/api`

### Option 2: Local Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start MongoDB and Redis (using Docker):
   ```bash
   docker compose up -d mongodb redis
   ```

3. Run the application:
   ```bash
   npm run build
   npm run start
   ```

---

## API Documentation

Once the application is running, navigate to `http://localhost:3000/api` to access the interactive **Swagger UI**. 

### Core Modules Overview:

- **Auth**: OTP request/verify, Passwordless login, 2FA for admins.
- **Users**: Profile management, Role promotion (Admin only).
- **Products**: CRUD operations, Stock management, Image uploads (with strict validation).
- **Categories**: Nested category tree management.
- **Cart**: Add/Remove items, Update quantities (Stored in Redis).
- **Addresses**: Manage multiple shipping addresses per user.
- **Orders**: Checkout process (with address snapshotting), Order status tracking.
- **Reviews**: Create reviews, Like/Dislike, Image uploads.
- **Payments**: Initiate and verify transactions (Mock gateway included).

---

## Roadmap

- [x] Core Domain & DDD Setup
- [x] User Authentication & RBAC
- [x] Product & Category Management
- [x] Redis Integration (OTP & Cart)
- [x] Payment & Order Processing (Mock)
- [x] Address Management Module
- [x] Product Reviews, Ratings & Images
- [x] Swagger Documentation
- [x] CI/CD Pipeline (GitHub Actions)
- [ ] Real Payment Gateway Integration (ZarinPal)
- [ ] Real SMS/Email Provider Integration (Kavenegar, etc.)
- [ ] Automated Unit & E2E Testing

---

## License

This project is licensed under the [MIT License](LICENSE).
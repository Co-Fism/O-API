# O-API (E-Commerce Backend)

<h2 align="center">v0.18.5-beta</h2>

<div align="center">

[![My Skills](https://skillicons.dev/icons?i=ts,nodejs,express,nestjs,mongodb,docker,redis,githubactions&theme=dark)](https://skillicons.dev)

![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-000000?style=for-the-badge&logo=letsencrypt&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)

![DDD](https://img.shields.io/badge/Architecture-DDD-blue?style=for-the-badge)
![Clean Architecture](https://img.shields.io/badge/Architecture-Clean-brightgreen?style=for-the-badge)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)
![WebSocket](https://img.shields.io/badge/WebSocket-Real--Time-blue?style=for-the-badge)

![CI](https://github.com/mhndsy37-cmd/O-API/actions/workflows/ci.yml/badge.svg)

</div>

**WebSocket Enabled | Real-Time Communication**

A production-ready, scalable RESTful API for a modern e-commerce platform. Built with **NestJS** and **TypeScript**, strictly following **Domain-Driven Design (DDD)** and **Clean Architecture** principles.

## Key Features

- **Passwordless Authentication**: Secure OTP-based login and registration via SMS or Email. Admin and Seller accounts are protected with mandatory 2-Step Verification (OTP + Password).
- **High-Performance Storage**: Shopping cart and OTP data are stored in **Redis** for fast read/write operations and precise TTL expiration.
- **Full E-Commerce Flow**: Products, nested categories, cart, address management, orders, and payment abstraction.
- **Product Reviews & Ratings**: Users can leave reviews (0–5 stars), upload images, and interact through Like/Dislike. Enforces business rules such as one review per user per product.
- **Advanced Image Validation**: Uses `Sharp` to validate image dimensions, aspect ratios, and formats, helping prevent decompression bombs and maintain UI consistency.
- **Support Ticket System**: Dedicated support module for ticket management and communication between users, sellers, and administrators.
- **Wallet Module**: Dedicated wallet module integrated into the platform.
- **Real-Time WebSocket System**: WebSocket infrastructure for real-time communication and event delivery.
- **Event-Driven Architecture**: Decoupled modules communicating through Domain Events, such as triggering notifications after successful payment.
- **Robust Security**: JWT authentication, Helmet, Rate Limiting (Throttler), input validation, and Redis-based OTP cooldowns.
- **DevOps Ready**: Dockerized environment, automated CI/CD with GitHub Actions, Pino logging, and Sentry monitoring.

## Architecture Overview

The project is structured into three distinct layers to ensure separation of concerns:

- **Domain Layer**: Contains Entities, Value Objects, Domain Events, and core business rules. Independent of frameworks and infrastructure.
- **Application Layer**: Orchestrates use cases through Services, DTOs, and Controllers.
- **Infrastructure Layer**: Handles technical details such as MongoDB Schemas, Repositories, Redis integration, and external Gateways.

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Cache / Temporary Storage**: Redis (ioredis)
- **Authentication**: JWT, Bcrypt (or Bcryptjs)
- **Image Processing**: Sharp, Multer
- **Real-Time Communication**: WebSocket, Socket.IO
- **API Documentation**: Swagger (OpenAPI)
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

2. Create a `.env` file in the root directory (or copy it from `.env.example`) and configure the required environment variables.

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

2. Start MongoDB and Redis using Docker:

   ```bash
   docker compose up -d mongodb redis
   ```

3. Build and run the application:

   ```bash
   npm run build
   npm run start
   ```

---

## API Documentation

Once the application is running, navigate to:

`http://localhost:3000/api`

This opens the interactive **Swagger UI**, where you can explore and test the available REST API endpoints.

### Core Modules Overview

- **Auth**: OTP request/verification, passwordless login, and 2FA for administrators and sellers.
- **Users**: Profile management and role promotion (Admin only).
- **Products**: CRUD operations, stock management, and image uploads with strict validation.
- **Categories**: Nested category tree management.
- **Cart**: Add/remove items and update quantities. Cart data is stored in Redis.
- **Addresses**: Manage multiple shipping addresses per user.
- **Orders**: Checkout process with address snapshotting and order status tracking.
- **Reviews**: Create reviews, Like/Dislike interactions, ratings, and image uploads.
- **Payments**: Initiate and verify transactions, with a mock payment gateway included.
- **Wallet**: Wallet-related functionality.
- **Support**: Support ticket creation, ticket management, and real-time communication.
- **WebSocket**: Real-time communication infrastructure for supported application modules.

### Real-Time Communication

O-API includes a WebSocket system powered by Socket.IO.

The WebSocket infrastructure enables real-time communication between connected clients and the server.

The Support module uses this infrastructure to provide real-time ticket messaging.

Note: WebSocket events are not REST endpoints and cannot be tested directly through Swagger UI. Use a Socket.IO-compatible client such as Postman.

---

## Roadmap

### Completed

- [x] Core Domain & DDD Setup
- [x] User Authentication & RBAC
- [x] Product & Category Management
- [x] Redis Integration (OTP & Cart)
- [x] Payment & Order Processing (Mock)
- [x] Address Management Module
- [x] Product Reviews, Ratings & Images
- [x] Swagger Documentation
- [x] CI/CD Pipeline (GitHub Actions)
- [x] Support Module
- [x] Wallet Module
- [x] WebSocket Infrastructure

### Planned

- [ ] Internal Notification Module
- [ ] Real Payment Gateway Integration (ZarinPal)
- [ ] Real SMS/Email Provider Integration (Kavenegar, etc.)
- [ ] Automated Unit & E2E Testing

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Built with TypeScript, NestJS, and Clean Architecture.**

</div>
# E-Commerce Microservices Application

## Overview
This repository contains a full-stack e-commerce system implemented using a microservices architecture. It consists of two backend NestJS microservices — product-order-service and customer-service — communicating asynchronously via RabbitMQ. The frontend is built with Next.js using the App Router to provide a responsive and modular shopping experience.

## Features
- Decoupled microservices for product management, orders, and customers
- Event-driven communication with RabbitMQ
- PostgreSQL database for persistence
- Modern Next.js frontend supporting browsing, cart, checkout, and order history
- TypeScript for maintainability and type safety

## Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- Docker (recommended for RabbitMQ)

### Setup

1. Clone the repository:

https://github.com/Bijoya-Mondal/Ecommerce-Application

2. Start RabbitMQ using Docker:

docker run -d --hostname my-rabbit --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

3. Start backend services:

cd customer-service && npm install && npm run start:dev
cd product-order-service && npm install && npm run start:dev

4. Start the frontend:

cd ecommerce-frontend && npm install && npm run dev

## Usage
- Frontend accessible at http://localhost:3000 (or your custom port)
- RabbitMQ management UI at http://localhost:15672
- Backend APIs serve respective microservices

## Contributing
Contributions are welcome! Please fork the repository, create your feature branch, and submit a pull request.

## License
This project is licensed under the MIT License.

---

*Last updated: October 2025*

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

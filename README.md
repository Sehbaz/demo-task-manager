# Nila Task Manager

A full-stack project management tool built with **React (TypeScript + Mantine UI)**, **NestJS**, **Drizzle ORM**, **TypeBox**, **PostgreSQL**, and **Bun** — all wrapped in a Dockerized monorepo.

---

## 🚀 Hosted Links

- **Frontend**: [App](http://172.236.14.205:8080/)
- **API Docs (Swagger)**: [Swagger](http://172.236.14.205:8080/api)

---

## 📸 Screenshots

<!-- Add screenshots here -->
<!-- Example: ![Dashboard](./screenshots/dashboard.png) -->

---

## 🎥 Demo

<!-- Add demo video link here -->
<!-- Example: [Watch Demo](https://youtu.be/your-demo-link) -->

---

## 🏗️ Project Structure

```
nila-task-manager/
├── api/         # NestJS backend (Drizzle, TypeBox)
├── client/      # React frontend (Mantine, React Query)
├── nginx.conf   # Nginx reverse proxy config
├── docker-compose.yml
└── README.md
```

---

🧩 Tech Overview

### Frontend (`/client`)

- React + TypeScript + Mantine UI
- React Query(TanStack Query) for data fetching
- Feature-based folder structure

### Backend (`/api`)

- NestJS (TypeScript)
- Drizzle ORM (PostgreSQL)
- TypeBox for schema validation
- JWT auth
- Swagger UI at `/api`

### 🔹 Monorepo & Deployment

- Docker Compose powered
- Nginx reverse proxy unifies frontend and API
- Easily deployable on a single server

---

## ⚡️ Quick Start

### 1. Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Bun](https://bun.sh/)

### 2. Clone & Setup

```bash
git clone https://github.com/your-username/nila-task-manager.git
cd nila-task-manager
```

### 3. Start the App

```bash
docker-compose up --build
```

- Frontend: `http://localhost:8080`
- API Docs: `http://localhost:8080/api`

---

## 🧪 Testing

```bash
cd api
bun test
```

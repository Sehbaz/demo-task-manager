# Nila Task Manager

A full-stack project management tool built with **React (TypeScript + Mantine UI)**, **NestJS**, **Drizzle ORM**, **TypeBox**, **PostgreSQL**, and **Bun** — all wrapped in a Dockerized monorepo.

---

## 🚀 Hosted Links

- **Frontend**: [App](http://172.236.14.205:8080/)
- **API Docs (Swagger)**: [Swagger](http://172.236.14.205:8080/api)

---

## 📸 Screenshots
![screen](https://github.com/user-attachments/assets/0a07ea1b-d5cf-4a64-ad3c-7b75f4c4353a)
![screen1](https://github.com/user-attachments/assets/2e9d99fd-6f7c-4395-843e-b5bd78a0a343)
![screen3](https://github.com/user-attachments/assets/593e98d7-d041-4d0b-b68d-92a3a92dc684)
![screen4](https://github.com/user-attachments/assets/91fc732f-e93a-4c0a-9b42-89086ac9e41a)

---

## 🎥 Demo

https://github.com/user-attachments/assets/bc88b18f-3fca-4736-9abf-31489b0a89b3

---

## 🏗️ Project Structure

```
nila-task-manager/
├── api/               # NestJS backend (Drizzle, TypeBox)
├── client/            # React frontend (Mantine, React Query)
├── nginx.conf         # Nginx reverse proxy config
├── docker-compose.yml # Docker config
└── README.md
```

---

## Tech Overview

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

### Monorepo & Deployment

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

#  Task Manager

A lightweight project and task management app inspired by tools like Linear and Asana.
Built as part of a **Full-Stack Developer Take-Home Assignment** to demonstrate clean architecture, thoughtful decisions and effective use of the given tech stack.

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

## 🚀 Tech Stack

| Layer        | Tech                                               |
| ------------ | -------------------------------------------------- |
| Runtime      | [Bun](https://bun.sh)                              |
| Frontend     | React + TypeScript                                 |
| UI Framework | [Mantine UI](https://mantine.dev)                  |
| State Mgmt   | React Query (TanStack Query)                       |
| Backend      | NestJS + TypeScript                                |
| ORM          | [Drizzle ORM](https://orm.drizzle.team)            |
| Validation   | [TypeBox](https://github.com/sinclairzx81/typebox) |
| Database     | PostgreSQL                                         |

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

---

## 🔐 Authentication
Basic JWT auth is implemented with token stored in localStorage.

To log in and explore the app:
```
Email: admin@example.com
Password: admin123
```
⚠️ Registration is not implemented. Dummy user is pre-seeded for demonstration only.

---

## ✨ Features
Project Management
- Create, list and view projects
- View all tasks related to a project

Task Management
- Create tasks with title, description, status and priority
- Update and delete tasks
- Filter tasks by status (todo, in_progress, done) and priority (low, medium, high)

Data Persistence
- PostgreSQL with proper schema and foreign key relationships
- CRUD operations using Drizzle ORM

Authentication
- Minimal JWT-based login
- Auth-protected routes using stored token

---

## 🧠 Architecture & Thought Process
### Key Decisions
- Used TypeBox for shared DTO validation and schema typing
- Adopted Drizzle ORM for type-safe queries and migration handling
- Modular code structure (controllers, services, db, schemas)
- Choose React Query for efficient data caching and re-fetching
- Mantine UI allowed for fast, accessible UI development

### ⚠️ Known Limitations
- No sign-up flow (dummy user used for login)
- No mobile responsiveness (best viewed on desktop)
- No role-based access or admin panel
- No test coverage (unit/integration)

### What I'd Add With More Time
- Role-based auth (admin, member, guest)
- Full user registration with validation 
- Responsive design for mobile & tablet
- Admin dashboard to manage users & projects
- Unit tests for critical logic (auth, DB ops)

### Assumptions Made
- Single-user login (admin) is acceptable for demo purposes
- UI polish was deprioritized in favor of core logic

### 🤝 Final Notes
It was a genuinely fun challenge and I'm happy to discuss any decisions or expand on parts if needed!

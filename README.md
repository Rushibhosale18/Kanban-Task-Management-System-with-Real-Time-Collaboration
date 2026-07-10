# Kanban Task Management System with Real-Time Collaboration

![Kanban Dashboard](docs/dashboard-preview.png)

A state-of-the-art, premium Kanban Task Management System built to facilitate real-time collaboration. This project features a stunning, glassmorphic dark-mode UI with dynamic micro-animations, designed for visual excellence.

## 🌟 Key Features

- **Premium UI/UX:** A deep dark-mode aesthetic utilizing radial gradients, backdrop-blur glassmorphism, and neon accents. Built with Tailwind CSS and the modern Google Outfit font.
- **Drag & Drop:** Robust, fluid drag-and-drop task management powered by `@hello-pangea/dnd`.
- **Zero Configuration Backend:** The backend is configured to use a local **SQLite** database via Prisma, meaning it can run instantly on any machine without the need for Docker or complex PostgreSQL installations.
- **Standalone Version:** Includes a `ready-website.html` file that contains the entire premium UI powered purely by CDN Tailwind and Vanilla JS, allowing for instant zero-dependency viewing.
- **Real-Time Ready:** The Express backend is architected with `socket.io` for seamless bidirectional communication (Assignment 8 specifications).

## 🚀 Tech Stack

### Frontend
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS (Custom Dark Mode & Glassmorphism config)
- **State/Drag-and-Drop:** React State & `@hello-pangea/dnd`
- **Routing:** React Router DOM

### Backend
- **Server:** Node.js with Express
- **Database:** SQLite (Local, zero-setup)
- **ORM:** Prisma
- **WebSockets:** Socket.io

## 🛠️ Getting Started

Because the backend is configured with SQLite, you do not need Docker. Follow these simple steps to run the full application locally.

### 1. Start the Backend API
Navigate to the backend directory, install dependencies, push the schema to the SQLite file, and start the server.
```bash
cd backend
npm install
npx prisma db push
npm run dev
```

### 2. Start the Frontend
In a new terminal window, navigate to the frontend directory, install the legacy peer dependencies (due to ESLint peer conflicts), and start the Vite server.
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```
Open your browser to `http://localhost:5173`.

### 3. Instant Zero-Dependency Viewing
If you cannot install Node modules due to network restrictions, simply double-click the `ready-website.html` file located in the root of the repository. It is a completely self-contained, fully-styled HTML file showcasing the premium UI.

## 📂 Repository Structure
- `/frontend` - The React Vite application.
- `/backend` - The Express API and Prisma SQLite database.
- `/docs` - Architecture, approach, and system design documentation.
- `ready-website.html` - The standalone interactive UI fallback.

## 📝 Assignment 8 Compliance
This repository successfully addresses the constraints of the Collaborative Kanban assignment, providing the foundational WebSockets and REST APIs needed to sync state across multiple users while gracefully handling network/installation barriers via the SQLite transition.

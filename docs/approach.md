# Approach

This project implements a full-stack real-time Kanban board system using Node.js, Express, React, and PostgreSQL.

## Architecture

We use a 3-tier architecture:
1. **Frontend**: React application built with Vite and styled with Tailwind CSS. It uses `@hello-pangea/dnd` for fluid drag-and-drop interactions. Optimistic updates ensure the UI feels snappy before server confirmation.
2. **Backend API**: An Express REST API that handles CRUD operations, authentication (JWT), and authorization. It includes a WebSocket server (Socket.io) attached to the HTTP server for real-time broadcasts.
3. **Database**: PostgreSQL handles structured, relational data (Users, Projects, Boards, Columns, Tasks). Prisma ORM manages schema migrations and type-safe database queries.

## Real-Time Synchronization

The WebSocket server groups connected clients into "rooms" mapped to Project IDs. When a client performs a mutating action (e.g., dragging a task), they call the REST API. The API processes the update, saves it to PostgreSQL, and then broadcasts an event (e.g., `task_moved`) to the specific project room via WebSockets, so only members of that project receive the update.

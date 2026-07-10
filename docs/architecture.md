# Architecture

## Component Interaction
1. **Client Browser**: React application managing global state. Listens to WebSockets for live changes.
2. **REST API (Express)**: Exposes endpoints for data retrieval and modification (e.g., `POST /tasks`, `PATCH /tasks/:id/move`).
3. **WebSocket Server (Socket.io)**: Authenticates connections with JWT. Groups clients into rooms by Project ID.
4. **Database (PostgreSQL)**: Handles persistent state.

## Database Relations
- `User` 1:N `ProjectMember` N:1 `Project`
- `Project` 1:N `Board`
- `Board` 1:N `Column`
- `Column` 1:N `Task`
- `Task` 1:N `Comment`, `Attachment`, `Assignee`

## Drag & Drop Logic
When a task is dragged between columns or within the same column:
1. **Frontend**: Optimistically updates the UI state.
2. **Backend**: Receives `source` and `destination` indices. Re-calculates `position_index` for all affected tasks.
3. **Broadcast**: Dispatches the `task_moved` event to the specific project's Socket.io room.
4. **Other Clients**: Receive the event and update their local state without a page refresh.

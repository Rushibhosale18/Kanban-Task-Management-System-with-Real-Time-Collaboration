# Tradeoffs & Technical Decisions

1. **REST + WebSockets vs SSE**
   - *Decision*: We used standard REST for initial data fetching and WebSockets for real-time updates.
   - *Tradeoff*: Server-Sent Events (SSE) would have been sufficient for one-way updates (server -> client), but WebSockets offer a full bi-directional tunnel, which scales better if we introduce features like live cursors or chat in the future.

2. **Database Choice: PostgreSQL vs MongoDB**
   - *Decision*: PostgreSQL with Prisma.
   - *Tradeoff*: Kanban boards are inherently hierarchical (Projects -> Boards -> Columns -> Tasks -> Comments). Relational databases enforce these constraints natively and cascades deletes elegantly. MongoDB would have required manual cascading or denormalizing a lot of data, which gets messy for complex relations.

3. **Optimistic Updates**
   - *Decision*: Update UI instantly on drag-and-drop, revert if API fails.
   - *Tradeoff*: It improves perceived performance drastically but adds complexity to the frontend state management. The UI state and server state can briefly drift if an error occurs.

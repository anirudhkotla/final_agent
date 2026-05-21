# Architecture Document for Todo App with Supabase

## 1. System Overview
The **Todo App** is a web-based application that allows users to manage their tasks using **Supabase** as the backend. The app follows a **client-server architecture** with the following components:

1. **Frontend**: HTML, CSS, and JavaScript (Vanilla JS or lightweight framework).
2. **Backend**: Supabase (PostgreSQL database, authentication, and real-time subscriptions).
3. **Deployment**: Static files hosted on **GitHub Pages** or **Vercel**.


## 2. Component Diagram
```
┌─────────────┐       ┌─────────────┐       ┌─────────────────┐
│             │       │             │       │                 │
│   Frontend  │──────▶│  Supabase   │──────▶│  PostgreSQL     │
│  (Browser)  │◀──────│  (Backend)  │◀──────│  (Database)     │
│             │       │             │       │                 │
└─────────────┘       └─────────────┘       └─────────────────┘
```


## 3. Data Flow
1. **User Authentication**:
   - User signs up/logs in via Supabase Auth.
   - Supabase returns a JWT token for session management.

2. **Todo Operations**:
   - User creates, reads, updates, or deletes a todo.
   - Frontend sends HTTP requests to Supabase API.
   - Supabase updates the PostgreSQL database.
   - Real-time subscriptions notify all clients of changes.


## 4. Module Breakdown
| Module               | Responsibilities                                                                 |
|----------------------|----------------------------------------------------------------------------------|
| **Auth Module**      | Handle user sign-up, login, logout, and session management.                      |
| **Todo Module**      | Manage CRUD operations for todos.                                                |
| **UI Module**        | Render todos, handle user interactions, and update the DOM.                      |
| **Real-time Module** | Subscribe to Supabase real-time updates and sync todos across clients.           |


## 5. Database Schema
### Table: `todos`
| Column        | Type      | Description                                  |
|---------------|-----------|----------------------------------------------|
| `id`          | UUID      | Primary key.                                 |
| `user_id`     | UUID      | Foreign key (references `auth.users.id`).     |
| `title`       | Text      | Title of the todo.                           |
| `description` | Text      | Description of the todo.                     |
| `status`      | Text      | Status of the todo (`active` or `completed`). |
| `created_at`  | Timestamp | Timestamp of creation.                       |
| `updated_at`  | Timestamp | Timestamp of last update.                    |


## 6. API Endpoints
| Endpoint                     | Method | Description                                  |
|------------------------------|--------|----------------------------------------------|
| `/auth/v1/signup`            | POST   | Sign up a new user.                          |
| `/auth/v1/token`             | POST   | Log in a user.                               |
| `/auth/v1/logout`            | POST   | Log out a user.                              |
| `/rest/v1/todos`             | GET    | Fetch all todos for a user.                  |
| `/rest/v1/todos`             | POST   | Create a new todo.                           |
| `/rest/v1/todos?id=eq.{id}`  | PATCH  | Update a todo.                               |
| `/rest/v1/todos?id=eq.{id}`  | DELETE | Delete a todo.                               |


## 7. Real-Time Subscriptions
- Subscribe to changes in the `todos` table using Supabase's real-time API.
- Update the UI dynamically when todos are added, updated, or deleted.


## 8. Error Handling
- **Frontend**: Display user-friendly error messages for network issues, authentication failures, etc.
- **Backend**: Supabase handles database errors and returns appropriate HTTP status codes.


## 9. Deployment
- **Frontend**: Hosted on GitHub Pages or Vercel.
- **Backend**: Supabase project with PostgreSQL database.
- **Environment Variables**: Store Supabase URL and anon key in `.env`.
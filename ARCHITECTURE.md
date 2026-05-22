# Architecture Document for Todo Application with Supabase

## 1. Overview
This document describes the **architecture** of the Todo Application, including its **components, data flow, and integration points** with Supabase.

---

## 2. System Components
### 2.1 Frontend
- **Technologies**: HTML, CSS, JavaScript
- **Responsibilities**:
  - Render UI for todo tasks.
  - Handle user interactions (add, update, delete, filter).
  - Communicate with Supabase for authentication and database operations.

### 2.2 Supabase Backend
- **Technologies**: PostgreSQL, Supabase Auth, Realtime
- **Responsibilities**:
  - Store todo tasks in the `todos` table.
  - Handle user authentication.
  - Broadcast real-time updates to connected clients.

---

## 3. Data Flow
### 3.1 Authentication Flow
1. User signs in via Supabase Auth.
2. Supabase returns a JWT token.
3. Frontend uses the token for authenticated requests.

### 3.2 Todo Operations Flow
1. User performs a CRUD operation (e.g., add a task).
2. Frontend sends a request to Supabase.
3. Supabase updates the `todos` table.
4. Supabase broadcasts the change via Realtime.
5. Frontend updates the UI for all connected clients.

### 3.3 Real-Time Updates Flow
1. Frontend subscribes to `todos` table changes.
2. Supabase broadcasts changes to all subscribers.
3. Frontend updates the UI dynamically.

---

## 4. Database Schema
### 4.1 Table: `todos`
| Column       | Type      | Description                          |
|--------------|-----------|--------------------------------------|
| `id`         | UUID      | Primary key.                         |
| `task`       | Text      | Todo task description.               |
| `is_complete`| Boolean   | Task completion status.              |
| `user_id`    | UUID      | Foreign key (Supabase Auth users).   |
| `created_at` | Timestamp | Auto-generated creation time.        |

### 4.2 Policies
- **Row-Level Security (RLS)**: Enabled to restrict access to user-owned tasks.
- **Example Policy**:
  ```sql
  CREATE POLICY "Users can manage their todos"
  ON todos FOR ALL
  USING (auth.uid() = user_id);
  ```

---

## 5. Integration Points
### 5.1 Supabase Client
- **Library**: `@supabase/supabase-js`
- **Usage**:
  - Initialize Supabase client with project URL and anon key.
  - Use client for authentication, database queries, and real-time subscriptions.

### 5.2 Environment Variables
| Variable               | Description                          |
|------------------------|--------------------------------------|
| `SUPABASE_URL`         | Supabase project URL.                |
| `SUPABASE_ANON_KEY`    | Supabase anon key for client access. |

---

## 6. Deployment Architecture
### 6.1 Static Hosting
- **Options**: GitHub Pages, Vercel, Netlify
- **Requirements**:
  - Serve static files (HTML, CSS, JS).
  - Configure environment variables for Supabase access.

### 6.2 Supabase Configuration
- **Project Setup**:
  - Create a Supabase project.
  - Enable Auth and Realtime.
  - Configure `todos` table and RLS policies.

---

## 7. Diagrams
### 7.1 Component Diagram
```
┌─────────────┐    ┌─────────────┐    ┌─────────────────┐
│   Frontend  │    │  Supabase   │    │   User Browser  │
│ (HTML/CSS/JS)    │ (PostgreSQL)│    │                 │
└──────┬──────┘    └──────┬──────┘    └─────────┬───────┘
       │                   │                     │
       │ 1. Auth Request   │                     │
       │──────────────────>│                     │
       │                   │                     │
       │ 2. CRUD Request   │                     │
       │──────────────────>│                     │
       │                   │                     │
       │ 3. Realtime Update│                     │
       │<──────────────────│                     │
       │                   │                     │
       │ 4. Render UI      │                     │
       │────────────────────────────────────────>│
```

### 7.2 Sequence Diagram
```
User       Frontend       Supabase
  │            │             │
  │──Add Task─>│             │
  │            │──Insert──>  │
  │            │             │──Broadcast─>│
  │            │<───────────│             │
  │<─Update UI─│             │
```
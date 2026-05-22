# Software Requirements Specification (SRS) for Todo Application with Supabase

## 1. Introduction
### 1.1 Purpose
This document outlines the **Software Requirements Specification (SRS)** for a **Todo Application** that uses **Supabase** as its backend database. The application will allow users to:
- Create, read, update, and delete (CRUD) todo tasks.
- Mark tasks as complete or incomplete.
- Filter tasks by status (all, active, completed).

### 1.2 Scope
The Todo Application will be a **web-based** application with:
- A **frontend** built using **HTML, CSS, and JavaScript**. 
- A **backend** powered by **Supabase** (PostgreSQL database, authentication, and real-time subscriptions).
- **No self-hosted server**—all backend logic will be handled by Supabase.

### 1.3 Definitions & Acronyms
| Term          | Definition                                                                 |
|---------------|---------------------------------------------------------------------------|
| **Supabase**  | Open-source Firebase alternative providing PostgreSQL, Auth, and Realtime. |
| **CRUD**      | Create, Read, Update, Delete operations.                                  |
| **UI**        | User Interface.                                                           |
| **API**       | Application Programming Interface.                                        |

---

## 2. Overall Description
### 2.1 User Classes
| User Class       | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| **End User**     | Uses the Todo app to manage tasks.                                          |
| **Developer**    | Maintains and extends the application.                                      |

### 2.2 Assumptions
1. Users have access to a modern web browser.
2. Supabase project is already configured with the required tables and policies.
3. No offline functionality is required.
4. Authentication is handled by Supabase Auth.

### 2.3 Constraints
1. The application must use **Supabase** for all backend operations.
2. No external APIs or services beyond Supabase.
3. Must be deployable as a **static web app** (e.g., GitHub Pages, Vercel).

### 2.4 System Features
| Feature ID | Feature Description                          |
|------------|---------------------------------------------|
| F-01       | User can **add** a new todo task.           |
| F-02       | User can **view** all todo tasks.           |
| F-03       | User can **update** a todo task.            |
| F-04       | User can **delete** a todo task.            |
| F-05       | User can **mark** a task as complete.       |
| F-06       | User can **filter** tasks by status.        |
| F-07       | Real-time updates for todo changes.         |

---

## 3. Module Breakdown
### 3.1 Frontend Modules
| Module               | Responsibilities                                                                 |
|----------------------|---------------------------------------------------------------------------------|
| **UI Components**    | Render todo list, input forms, and filters.                                     |
| **State Management** | Manage todo items and filter states.                                            |
| **Supabase Client**  | Handle authentication, database queries, and real-time subscriptions.           |

### 3.2 Backend Modules (Supabase)
| Module               | Responsibilities                                                                 |
|----------------------|---------------------------------------------------------------------------------|
| **Database**         | Store todo items in a `todos` table.                                            |
| **Authentication**   | Handle user sign-in/sign-up via Supabase Auth.                                  |
| **Realtime**         | Enable live updates for todo changes.                                           |

### 3.3 Data Model
**Table: `todos`**
| Column       | Type      | Description                          |
|--------------|-----------|--------------------------------------|
| `id`         | UUID      | Primary key.                         |
| `task`       | Text      | Todo task description.               |
| `is_complete`| Boolean   | Task completion status.              |
| `user_id`    | UUID      | Foreign key (Supabase Auth users).   |
| `created_at` | Timestamp | Auto-generated creation time.        |

---

## 4. Architecture & Data Flow
### 4.1 System Architecture
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
┌──────┴──────┐    ┌──────┴──────┐
│   Static    │    │  Supabase   │
│   Hosting   │    │   Backend   │
└─────────────┘    └─────────────┘
```

### 4.2 Data Flow
1. **User Authentication**: Supabase Auth handles sign-in/sign-up.
2. **Todo Operations**: Frontend sends CRUD requests to Supabase.
3. **Realtime Updates**: Supabase broadcasts changes to all connected clients.
4. **UI Rendering**: Frontend updates the UI based on real-time data.

---

## 5. Implementation Procedure
### 5.1 Step-by-Step Build Plan
| Step | Task                                                                 |
|------|----------------------------------------------------------------------|
| 1    | Set up Supabase project and configure `todos` table.                |
| 2    | Initialize a static web project (HTML, CSS, JS).                    |
| 3    | Integrate Supabase JS client for authentication and database access. |
| 4    | Implement UI for adding, viewing, and filtering todos.              |
| 5    | Add real-time subscriptions for live updates.                       |
| 6    | Test CRUD operations and real-time sync.                            |
| 7    | Deploy to GitHub Pages/Vercel.                                      |

### 5.2 Acceptance Criteria
✅ Users can **add, update, delete, and mark tasks as complete**. 
✅ Tasks are **persisted in Supabase**. 
✅ Real-time updates work **without page refresh**.
✅ UI is **responsive and user-friendly**. 

### 5.3 Risks & Mitigations
| Risk                          | Mitigation Strategy                                  |
|-------------------------------|------------------------------------------------------|
| Supabase downtime             | Implement error handling and retry logic.            |
| Real-time sync failures       | Fallback to polling if WebSocket fails.              |
| Authentication issues         | Use Supabase Auth best practices.                    |

---

## 6. Next Steps
1. **Senior Developer** will review this SRS and plan the implementation.
2. **Junior Developers** will implement the frontend and Supabase integration.
3. **QA/Testers** will validate functionality and real-time updates.
4. **DevOps** will deploy the application.
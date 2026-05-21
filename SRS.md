# Software Requirements Specification (SRS) for Todo App with Supabase

## 1. Introduction

### 1.1 Purpose
This document defines the functional and non-functional requirements for a **Todo App** using **Supabase** as the backend database. It serves as a guide for developers, testers, and stakeholders.

### 1.2 Scope
- **Frontend**: Web-based UI built with **HTML, CSS, and JavaScript**. 
- **Backend**: **Supabase** (PostgreSQL database, authentication, and real-time subscriptions).
- **Features**:
  - User authentication (Sign Up, Login, Logout).
  - Create, Read, Update, Delete (CRUD) operations for todos.
  - Real-time updates for todos.
  - Filter todos by status (All, Active, Completed).

### 1.3 Definitions
| Term          | Definition                                                                 |
|---------------|---------------------------------------------------------------------------|
| Todo          | A task with a title, description, status (active/completed), and timestamp. |
| Supabase      | Open-source Firebase alternative providing database, auth, and real-time. |
| Real-time     | Instant updates to todos without manual refresh.                          |


## 2. Functional Requirements
| ID   | Requirement                                                                 |
|------|-----------------------------------------------------------------------------|
| FR1  | Users must sign up using email and password.                                |
| FR2  | Users must log in using email and password.                                 |
| FR3  | Users must log out.                                                         |
| FR4  | Users must create a new todo with a title and description.                  |
| FR5  | Users must view their todos in a list.                                      |
| FR6  | Users must mark a todo as completed.                                        |
| FR7  | Users must edit a todo's title and description.                             |
| FR8  | Users must delete a todo.                                                   |
| FR9  | Users must filter todos by status (All, Active, Completed).                 |
| FR10 | Todos must update in real-time for all connected clients.                   |


## 3. Non-Functional Requirements
| ID   | Requirement                                                                 |
|------|-----------------------------------------------------------------------------|
| NFR1 | The app must load todos in under **2 seconds**.                             |
| NFR2 | The app must support **100+ concurrent users**.                             |
| NFR3 | The app must be responsive on mobile and desktop devices.                   |
| NFR4 | User passwords must be stored securely using **bcrypt** (handled by Supabase). |
| NFR5 | The app must use **HTTPS** for all communications.                          |


## 4. Assumptions
1. Supabase project is already created and configured.
2. Users have a modern browser (Chrome, Firefox, Edge, Safari).
3. Internet connectivity is available for real-time updates.


## 5. Risks
| Risk                          | Mitigation Strategy                                      |
|-------------------------------|----------------------------------------------------------|
| Supabase downtime             | Implement offline mode with local storage fallback.      |
| Real-time updates fail        | Use polling as a fallback mechanism.                     |
| Authentication failures       | Provide clear error messages and retry options.          |


## 6. Acceptance Criteria
1. Users can sign up, log in, and log out.
2. Users can create, read, update, and delete todos.
3. Todos update in real-time for all connected clients.
4. The app is responsive and works on mobile and desktop.
5. The app handles errors gracefully (e.g., network issues).
# Todo App with Supabase

A simple Todo App built with HTML, CSS, and JavaScript, using Supabase as the backend database.

## Features
- Add new tasks
- Mark tasks as completed
- Delete tasks
- Real-time data persistence with Supabase

## Setup Instructions

### Prerequisites
- A Supabase account and project
- Node.js (for local development)

### Environment Variables
Create a `.env` file in the root directory and add the following variables:

```env
SUPABASE_URL=https://whqrkgbjnzpwhaklohfa.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndocXJrZ2Jqbnpwd2hha2xvaGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MDc2ODEsImV4cCI6MjA5MDE4MzY4MX0.LXavqGmChMQJbfNJR7hxkHvixZfzPDqI166-9tzF_KI
```

### Running the App Locally
1. Clone this repository:
   ```bash
   git clone https://github.com/anirudhkotla/final_agent.git
   cd final_agent
   ```

2. Open `index.html` in your browser.

### Deploying to GitHub Pages
1. Push your code to the `main` branch.
2. Enable GitHub Pages in the repository settings.

### Deploying to Vercel
1. Import the repository into Vercel.
2. Add the environment variables (`SUPABASE_URL` and `SUPABASE_ANON_KEY`) in the Vercel project settings.
3. Deploy.

## Database Schema
The Todo App uses a `todos` table in Supabase with the following schema:

```sql
CREATE TABLE todos (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    task TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## License
This project is open-source and available under the [MIT License](LICENSE).
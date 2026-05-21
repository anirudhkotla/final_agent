# Todo App with Supabase

A simple Todo application built with HTML, CSS, and JavaScript, integrated with Supabase for data storage.

## Features

- Add new tasks
- Mark tasks as completed
- Delete tasks
- Real-time updates

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Supabase (PostgreSQL database)
- **Styling**: Bootstrap 5

## Setup Instructions

### Prerequisites

- A Supabase account ([https://supabase.com](https://supabase.com))
- Node.js (optional, for local development)

### Step 1: Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com/).
2. Click on **New Project**.
3. Fill in the project details and click **Create New Project**.

### Step 2: Set Up the Database

1. Navigate to the **Table Editor** in your Supabase project.
2. Create a new table named `todos` with the following columns:
   - `id`: UUID (Primary Key, default: `gen_random_uuid()`)
   - `task`: text
   - `completed`: boolean (default: `false`)
   - `created_at`: timestamp with time zone (default: `now()`)

### Step 3: Get Supabase URL and Anon Key

1. Go to **Project Settings** > **API**.
2. Copy the **Project URL** and **anon key**.

### Step 4: Update the App

Replace the placeholder values in `script.js` with your Supabase credentials:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
```

### Step 5: Deploy the App

You can deploy the app using any static hosting service (e.g., GitHub Pages, Vercel, Netlify).

## Running Locally

1. Clone this repository.
2. Open `index.html` in your browser.

## Folder Structure

```
final_agent/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript for Supabase integration
└── README.md           # Project documentation
```

## License

This project is licensed under the MIT License.
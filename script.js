document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');

    // Initialize Supabase client
    const supabaseUrl = process.env.SUPABASE_URL || 'https://whqrkgbjnzpwhaklohfa.supabase.co';
    const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndocXJrZ2Jqbnpwd2hha2xvaGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MDc2ODEsImV4cCI6MjA5MDE4MzY4MX0.LXavqGmChMQJbfNJR7hxkHvixZfzPDqI166-9tzF_KI';
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    // Fetch and display todos
    async function fetchTodos() {
        const { data: todos, error } = await supabase
            .from('todos')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching todos:', error);
            return;
        }

        todoList.innerHTML = '';
        todos.forEach(todo => {
            addTodoToDOM(todo);
        });
    }

    // Add todo to DOM
    function addTodoToDOM(todo) {
        const li = document.createElement('li');
        li.dataset.id = todo.id;
        if (todo.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span>${todo.task}</span>
            <button class="delete-btn">Delete</button>
        `;

        li.addEventListener('click', async (e) => {
            if (e.target.tagName === 'SPAN') {
                const { error } = await supabase
                    .from('todos')
                    .update({ completed: !todo.completed })
                    .eq('id', todo.id);

                if (error) {
                    console.error('Error updating todo:', error);
                    return;
                }

                li.classList.toggle('completed');
            }
        });

        li.querySelector('.delete-btn').addEventListener('click', async (e) => {
            e.stopPropagation();
            const { error } = await supabase
                .from('todos')
                .delete()
                .eq('id', todo.id);

            if (error) {
                console.error('Error deleting todo:', error);
                return;
            }

            li.remove();
        });

        todoList.appendChild(li);
    }

    // Add new todo
    addTodoBtn.addEventListener('click', async () => {
        const task = todoInput.value.trim();
        if (task === '') return;

        const { data, error } = await supabase
            .from('todos')
            .insert([{ task, completed: false }])
            .select();

        if (error) {
            console.error('Error adding todo:', error);
            return;
        }

        addTodoToDOM(data[0]);
        todoInput.value = '';
    });

    // Fetch todos on page load
    fetchTodos();
});
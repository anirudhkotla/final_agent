// Initialize Supabase client
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = 'your-supabase-anon-key';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// DOM elements
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');

// Fetch and display todos
async function fetchTodos() {
    const { data: todos, error } = await supabase
        .from('todos')
        .select('*');

    if (error) {
        console.error('Error fetching todos:', error);
        return;
    }

    todoList.innerHTML = '';
    todos.forEach(todo => {
        addTodoToDOM(todo);
    });
}

// Add a todo to the DOM
function addTodoToDOM(todo) {
    const todoItem = document.createElement('div');
    todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    todoItem.innerHTML = `
        <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
        <span class="todo-text">${todo.task}</span>
        <span class="delete-btn" data-id="${todo.id}">❌</span>
    `;

    todoList.appendChild(todoItem);

    // Add event listeners
    const checkbox = todoItem.querySelector('input[type="checkbox"]');
    const deleteBtn = todoItem.querySelector('.delete-btn');

    checkbox.addEventListener('change', () => toggleTodoCompletion(todo.id, checkbox.checked));
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
}

// Add a new todo
async function addTodo() {
    const task = todoInput.value.trim();
    if (!task) return;

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
}

// Toggle todo completion status
async function toggleTodoCompletion(id, completed) {
    const { error } = await supabase
        .from('todos')
        .update({ completed })
        .eq('id', id);

    if (error) {
        console.error('Error updating todo:', error);
    }
}

// Delete a todo
async function deleteTodo(id) {
    const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting todo:', error);
    } else {
        fetchTodos(); // Refresh the list
    }
}

// Event listeners
addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

// Initialize the app
document.addEventListener('DOMContentLoaded', fetchTodos);
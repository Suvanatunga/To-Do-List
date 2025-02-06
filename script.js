const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const filterButtons = document.querySelectorAll('.filters button');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks(filter = 'all') {
  todoList.innerHTML = '';

  tasks
    .filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'incomplete') return !task.completed;
      return true;
    })
    .forEach(task => {
      const li = document.createElement('li');
      li.className = `todo-item ${task.completed ? 'completed' : ''}`;
      li.innerHTML = `
        <span>${task.text}</span>
        <div class="todo-buttons">
          <button class="btn complete">✔</button>
          <button class="btn delete">✖</button>
        </div>
      `;

      // Mark as completed
      li.querySelector('.complete').addEventListener('click', () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks(filter);
      });

      // Delete task
      li.querySelector('.delete').addEventListener('click', () => {
        tasks = tasks.filter(t => t !== task);
        saveTasks();
        renderTasks(filter);
      });

      todoList.appendChild(li);
    });
}

// Add task
todoInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && todoInput.value.trim()) {
    tasks.push({ text: todoInput.value.trim(), completed: false });
    todoInput.value = '';
    saveTasks();
    renderTasks();
  }
});

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filter tasks
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    renderTasks(filter);
  });
});

// Initial render
renderTasks();

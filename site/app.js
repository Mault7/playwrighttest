const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const prioritySelect = document.querySelector('#priority');
const list = document.querySelector('#todo-list');
const empty = document.querySelector('#empty');
const stats = document.querySelector('[data-testid="stats"]');
const filters = document.querySelectorAll('.filter');
const seedButton = document.querySelector('#seed');
const clearButton = document.querySelector('#clear');
const clock = document.querySelector('[data-testid="clock"]');
const template = document.querySelector('#todo-item-template');

let filter = 'all';
let items = [];

const demoItems = [
  { title: 'Leer docs de Playwright', priority: 'high' },
  { title: 'Practicar selectores', priority: 'medium' },
  { title: 'Hacer asserts con expect', priority: 'low' }
];

function updateClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  clock.textContent = `${hh}:${mm}`;
}

function updateStats() {
  const total = items.length;
  const done = items.filter((item) => item.done).length;
  stats.textContent = `${total} tareas, ${done} hechas`;
}

function visibleItems() {
  if (filter === 'active') return items.filter((item) => !item.done);
  if (filter === 'done') return items.filter((item) => item.done);
  return items;
}

function render() {
  list.innerHTML = '';
  const visible = visibleItems();
  empty.style.display = visible.length ? 'none' : 'block';

  visible.forEach((item) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const checkbox = node.querySelector('[data-testid="todo-toggle"]');
    const title = node.querySelector('[data-testid="todo-title"]');
    const pill = node.querySelector('[data-testid="todo-priority"]');
    const deleteButton = node.querySelector('[data-testid="delete-button"]');

    checkbox.checked = item.done;
    title.textContent = item.title;
    if (item.done) title.classList.add('done');

    pill.textContent = item.priority.toUpperCase();
    pill.classList.add(item.priority);

    checkbox.addEventListener('change', () => {
      item.done = checkbox.checked;
      render();
    });

    deleteButton.addEventListener('click', () => {
      items = items.filter((i) => i !== item);
      render();
    });

    list.appendChild(node);
  });

  updateStats();
}

function setFilter(nextFilter) {
  filter = nextFilter;
  filters.forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === filter);
  });
  render();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;

  items.unshift({
    title,
    priority: prioritySelect.value,
    done: false
  });

  input.value = '';
  input.focus();
  render();
});

filters.forEach((button) => {
  button.addEventListener('click', () => setFilter(button.dataset.filter));
});

seedButton.addEventListener('click', () => {
  items = demoItems.map((item) => ({ ...item, done: false }));
  setFilter('all');
});

clearButton.addEventListener('click', () => {
  items = items.filter((item) => !item.done);
  render();
});

updateClock();
setInterval(updateClock, 60_000);
setFilter('all');

import { test, expect } from './fixtures';

test('agrega varias tareas con estado by default', async ({ todo }) => {
  //start
  await todo.goto();
  //add tasks
  await todo.form.addTodo({ title: 'Tarea 1' });
  await todo.form.addTodo({ title: 'Tarea 2' });
  await todo.form.addTodo({ title: 'Tarea 3' });
  //expected result
  const itemsCount = await todo.list.count();
  await expect(itemsCount).toBe(3);

});

test('agrega una tarea con prioridad', async ({ todo }) => {
  //start
  await todo.goto();
  //add task
  await todo.form.addTodo({ title: 'Tarea con prioridad', priority: 'high' });
  //expected result
  const firstItem = todo.list.first();
  await expect(firstItem.title).toHaveText('Tarea con prioridad');
  await expect(firstItem.priority).toHaveText('HIGH');
});

test('verificacion de seed', async ({ todo }) => {
  //start
  await todo.goto();
  //add tasks
  await todo.actions.seed();
  //expected result
  const itemsCount = await todo.list.count();
  await expect(itemsCount).toBe(3);
});

test('verificacion de clear', async ({ todo }) => {
  //start
  await todo.goto();
  //add tasks
  await todo.actions.clearCompleted();
  //expected result
  const itemsCount = await todo.list.count();
  await expect(itemsCount).toBe(0);
});
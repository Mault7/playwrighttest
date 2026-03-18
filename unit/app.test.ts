import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const html = readFileSync(resolve(__dirname, '../site/index.html'), 'utf-8');

async function setupDom() {
  document.documentElement.innerHTML = html;
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2024-01-01T10:15:00'));
  vi.resetModules();
  await import('../site/app.js');

  return {
    form: document.querySelector('#todo-form') as HTMLFormElement,
    input: document.querySelector('#todo-input') as HTMLInputElement,
    priority: document.querySelector('#priority') as HTMLSelectElement,
    list: document.querySelector('#todo-list') as HTMLUListElement,
    stats: document.querySelector('[data-testid="stats"]') as HTMLElement,
    seed: document.querySelector('#seed') as HTMLButtonElement,
    clock: document.querySelector('[data-testid="clock"]') as HTMLElement
  };
}

beforeEach(() => {
  document.head.innerHTML = '';
  document.body.innerHTML = '';
});

describe('todo app (unit)', () => {
  it('agrega una tarea y actualiza stats', async () => {
    const { form, input, priority, list, stats } = await setupDom();

    input.value = 'Probar unit tests';
    priority.value = 'high';
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    const items = list.querySelectorAll('[data-testid="todo-item"]');
    expect(items.length).toBe(1);
    expect(items[0].querySelector('[data-testid="todo-title"]')?.textContent).toBe('Probar unit tests');
    expect(items[0].querySelector('[data-testid="todo-priority"]')?.textContent).toBe('HIGH');
    expect(stats.textContent).toBe('1 tareas, 0 hechas');
  });

  it('marca una tarea como hecha y actualiza stats', async () => {
    const { form, input, list, stats } = await setupDom();

    input.value = 'Completar tarea';
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    const toggle = list.querySelector('[data-testid="todo-toggle"]') as HTMLInputElement;
    toggle.checked = true;
    toggle.dispatchEvent(new Event('change', { bubbles: true }));

    expect(stats.textContent).toBe('1 tareas, 1 hechas');
    const title = list.querySelector('[data-testid="todo-title"]') as HTMLElement;
    expect(title.classList.contains('done')).toBe(true);
  });

  it('carga las tareas demo con el seed', async () => {
    const { seed, list, stats } = await setupDom();

    seed.click();

    const items = list.querySelectorAll('[data-testid="todo-item"]');
    expect(items.length).toBe(3);
    expect(stats.textContent).toBe('3 tareas, 0 hechas');
  });

  it('muestra el reloj con formato HH:MM', async () => {
    const { clock } = await setupDom();

    expect(clock.textContent).toBe('10:15');
  });
});

import type { Page } from '@playwright/test';
import { TodoActions } from './components/TodoActions';
import { TodoFilters } from './components/TodoFilters';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';

export class TodoPage {
  constructor(
    public readonly form: TodoForm,
    public readonly list: TodoList,
    public readonly filters: TodoFilters,
    public readonly actions: TodoActions
  ) {}

  static create(page: Page) {
    return new TodoPage(
      new TodoForm(page),
      new TodoList(page),
      new TodoFilters(page),
      new TodoActions(page)
    );
  }

  async goto() {
    await this.form.page.goto('/');
  }
}

import type { Locator, Page } from '@playwright/test';
import type { TodoInput } from '../../models';

export class TodoForm {
  readonly page: Page;
  private input: Locator;
  private priority: Locator;
  private add: Locator;

  constructor(page: Page) {
    this.page = page;
    this.input = page.getByTestId('todo-input');
    this.priority = page.getByTestId('priority-select');
    this.add = page.getByTestId('add-button');
  }

  async addTodo(input: TodoInput) {
    await this.input.fill(input.title);
    if (input.priority) {
      await this.priority.selectOption(input.priority);
    }
    await this.add.click();
  }
}

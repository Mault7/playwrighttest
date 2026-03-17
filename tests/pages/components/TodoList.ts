import type { Locator, Page } from '@playwright/test';

export class TodoList {
  private page: Page;
  private items: Locator;
  private empty: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.getByTestId('todo-item');
    this.empty = page.getByTestId('empty-state');
  }

  first() {
    const item = this.items.first();
    return {
      root: item,
      title: item.getByTestId('todo-title'),
      priority: item.getByTestId('todo-priority'),
      toggle: item.getByTestId('todo-toggle'),
      deleteButton: item.getByTestId('delete-button')
    };
  }

  async count() {
    return await this.items.count();
  }

  async isEmptyVisible() {
    return await this.empty.isVisible();
  }

  emptyState() {
    return this.empty;
  }
}

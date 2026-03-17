import type { Page } from '@playwright/test';

export class TodoActions {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async seed() {
    await this.page.getByTestId('seed-button').click();
  }

  async clearCompleted() {
    await this.page.getByTestId('clear-button').click();
  }
}

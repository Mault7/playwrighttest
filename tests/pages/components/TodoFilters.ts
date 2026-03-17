import type { Page } from '@playwright/test';

export class TodoFilters {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async select(filter: 'all' | 'active' | 'done') {
    await this.page.getByTestId(`filter-${filter}`).click();
  }
}

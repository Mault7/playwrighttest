import { test as base, expect } from '@playwright/test';
import { TodoPage } from './pages/TodoPage';

type Fixtures = {
  todo: TodoPage;
};

export const test = base.extend<Fixtures>({
  todo: async ({ page }, use) => {
    await use(TodoPage.create(page));
  }
});

export { expect };

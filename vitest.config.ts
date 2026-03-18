import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['unit/setup.ts'],
    include: ['unit/**/*.test.ts'],
    exclude: ['tests/**']
  }
});

import { afterEach, vi } from 'vitest';

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  document.head.innerHTML = '';
  document.body.innerHTML = '';
});

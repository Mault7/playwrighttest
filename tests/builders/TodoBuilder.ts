import type { Priority, TodoInput } from '../models';

export class TodoBuilder {
  private data: TodoInput = { title: 'Tarea', priority: 'medium' };

  withTitle(title: string) {
    this.data.title = title;
    return this;
  }

  withPriority(priority: Priority) {
    this.data.priority = priority;
    return this;
  }

  build(): TodoInput {
    return { ...this.data };
  }
}

export type Priority = 'low' | 'medium' | 'high';

export interface TodoInput {
  title: string;
  priority?: Priority;
}

export interface TodoView {
  title: string;
  priority: Priority;
  done: boolean;
}

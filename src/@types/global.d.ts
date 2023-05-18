export {};

declare global {
  interface Task {
    id: string;
    description: string;
    done: boolean;
  }
}

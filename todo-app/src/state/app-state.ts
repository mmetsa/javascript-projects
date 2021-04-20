import { ITodo } from "../domain/ITodo";

export class AppState {
    public todos: readonly ITodo[] = [];

    constructor() {
        this.todos = [...this.todos, {
            description: "World Domination",
            done: false,
          },
          {
            description: "Google around",
            done: false,
          }];
    }

    addTodo(todo: ITodo): void {
        this.todos = [...this.todos, todo];
    }

    removeTodo(elemNo: number): void {
        this.todos = this.todos.filter((elem, index) => index !== elemNo);
    }

    countTodos(): number {
        return this.todos.length;
    }
}
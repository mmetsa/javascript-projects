import { EventAggregator, IDisposable } from "aurelia";
import { IContactType } from "../domain/IContactType";
import { ContacttypeService } from "../services/contacttype-service";
import { AppState } from "../state/app-state";

export class TodoView {
  private placeholder = "What do you need to do today!?";
  private data: IContactType[] = [];

  private description = "";

  private subscriptions: IDisposable[] = [];

  constructor(private eventAggregator: EventAggregator, private appState: AppState, private contacttypeService: ContacttypeService) {

    this.subscriptions.push(this.eventAggregator.subscribe('new-todo', (descr: string) => this.addNewTodo(descr)));
  }

  async attached() {
    console.log("Attached")
    this.data = await this.contacttypeService.getAll();
  }

  detached() {
    this.subscriptions.forEach(e => e.dispose);
    this.subscriptions = [];
  }

  addNewTodo = (descr: string): void => {
    this.appState.addTodo({description: descr.trim(), done: false});
  }

  removeTodo = (index: number): void => {
    this.appState.removeTodo(index);
  }
}

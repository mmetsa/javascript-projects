import { bindable, EventAggregator, IDisposable } from "aurelia";
import { ITodo } from "../domain/ITodo";

export class TodoInput {
    @bindable public placeholder: string = "Default!";
    public description: string = "";

    private subscriptions: IDisposable[] = [];

    constructor(private eventAggregator: EventAggregator) {

    }

    detached() {
        this.subscriptions.forEach(e => e.dispose);
        this.subscriptions = [];
    }

    addNewTodo() {

        this.eventAggregator.publish('new-todo', this.description);

        setTimeout(() => {
            this.description = "";
          }, 100);
    }

    /*
    // This is not nice...
    @bindable public addnewCallback: (descr: string) => void = null;
    

    addNewTodo() {
        console.log("addnewtodo");
        this.addnewCallback(this.description);
        setTimeout(() => {
            this.description = "";
          }, 100);
    }

    */

}

import { bindable } from "aurelia";
import { ITodo } from "../domain/ITodo";

export class TodoElement {
    @bindable public item: ITodo;
    @bindable public removeCallback: (index: number) => void = null;

    @bindable public todoNo: number;

    removeTodo(index: number) {
        this.removeCallback(index);
    }
}

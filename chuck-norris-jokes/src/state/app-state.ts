import { inject } from "@aurelia/kernel";
import { IJoke } from "../domain/IJoke";

@inject()
export class AppState {

    private jokes = new Map<string , IJoke[]>();

    constructor() {
        this.jokes.set("celebrity", [{id: "1", value: "Joke 1"}])
        this.jokes.set("money", [{id: "1", value: "Joke 1"}])
        this.jokes.set("travel", [{id: "1", value: "Joke 1"}])
    }
    
    addJokes(jokes: IJoke[], category: string): void {
        console.log(this);
        this.jokes.set(category, [...jokes, ...this.jokes.get(category)]);
    }

    getJokes(category: string): IJoke[] {
        return this.jokes.get(category);
    }
}
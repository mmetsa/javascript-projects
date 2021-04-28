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
        var added: boolean = false;
        for(let joke of jokes) {
            for(let seenJoke of this.jokes.get(category)) {
                if (joke.id == seenJoke.id) {
                    added = true;
                    break;
                }
            }
            if(!added) {
                this.jokes.set(category, [joke, ...this.jokes.get(category)])
                added = false;
            }
        }
    }

    getJokes(category: string): IJoke[] {
        return this.jokes.get(category);
    }
}
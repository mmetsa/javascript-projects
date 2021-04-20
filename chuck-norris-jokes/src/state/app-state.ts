import { IJoke } from "../domain/IJoke";

export class AppState {
    
    private celebrityJokes: IJoke[];
    private moneyJokes: IJoke[];
    private travelJokes: IJoke[];

    constructor() {
    }
}
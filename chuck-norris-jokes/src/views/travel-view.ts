import { EventAggregator } from "@aurelia/kernel";
import { IDisposable } from "aurelia";
import { JokeService } from "../services/JokeService";
import { AppState } from "../state/app-state";

export class TravelView {

    private subscriptions: IDisposable[] = [];
    private loaded: boolean;

    constructor(private eventAggregator: EventAggregator, private appState: AppState, private jokeService: JokeService) {
    }


    async attached() {
        var jokes = await this.jokeService.loadJokes('travel');
        this.loaded = true;
    }

    detached() {
        this.subscriptions.forEach(e => e.dispose);
        this.subscriptions = [];
    }


}
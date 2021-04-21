import { bindable } from "@aurelia/runtime-html";

export class JokeCard {

    @bindable private jokeHeading: string;
    @bindable private jokeText: string;
    constructor() {

    }
}
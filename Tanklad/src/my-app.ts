import { IRouter } from "aurelia";
import { AppState } from "./state/app-state";

export class MyApp {

    constructor(@IRouter private router: IRouter, private state: AppState) {
        
    }

    attached() {
    }


    async logOut(event: Event) {
        console.log(this.state);
        this.state.token = null;
        this.state.firstname = null;
        this.state.lastname = null;
        await this.router.load('/home-index.html');
    }
}
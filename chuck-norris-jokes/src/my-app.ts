import { IRouter } from "@aurelia/router";
import { IJoke } from "./domain/IJoke";
import { AppState } from "./state/app-state";

export class MyApp {

  constructor(@IRouter private router: IRouter, private state: AppState) {

  }

  attatched() {

  }

  detached() {
    
  }
  
}

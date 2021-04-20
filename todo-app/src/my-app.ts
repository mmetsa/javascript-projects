import { EventAggregator, IDisposable } from "aurelia";
import { AppState } from "./state/app-state";

export class MyApp {

  private subscriptions: IDisposable[] = [];

  constructor(private eventAggregator: EventAggregator, private appState: AppState) {
  }

  detached() {
    this.subscriptions.forEach(e => e.dispose);
    this.subscriptions = [];
  }
}

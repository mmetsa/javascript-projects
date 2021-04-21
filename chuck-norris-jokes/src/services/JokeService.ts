import { HttpClient } from "@aurelia/fetch-client";
import { inject } from "@aurelia/kernel";
import { IJoke } from "../domain/IJoke";
import { AppState } from "../state/app-state";

@inject()
export class JokeService {
    
  constructor(private httpClient: HttpClient, private appState: AppState) {
    httpClient = new HttpClient();
  }

  async loadJoke(category: string): Promise<IJoke> {
    try {
      var response = await this.httpClient.get("https://api.chucknorris.io/jokes/random?category=" + category);
      const data = (await response.json()) as IJoke;
      return data;
    } catch(error) {
      console.log(error);
    }
  }

  async loadJokes(category: string): Promise<IJoke[]> {
    var jokes = [];
  
    for(let i = 0; i < 5; i++) {
      jokes.push(await this.loadJoke(category));
    }
    this.appState.addJokes(jokes, category);
    return jokes;
  }
}
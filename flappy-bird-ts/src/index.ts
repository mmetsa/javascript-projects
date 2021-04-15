import { GameController } from "./controllers/game-controller";
import { GameBrain } from "./model/gamebrain";
import { GameView } from "./views/gameview";

let gameview = new GameView();
let game = new GameBrain();
let gameController = new GameController(game, gameview);
gameController.startGame();
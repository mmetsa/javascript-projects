import {GameView} from './views/gameview.js';
import {GameBrain} from './model/gamebrain.js';
import {GameController} from './controllers/game-controller.js'
import _ from 'lodash';

let gameview = new GameView();
let game = new GameBrain();
let gameController = new GameController(game, gameview);
gameController.startGame();
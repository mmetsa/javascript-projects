import { GameBrain } from "../model/gamebrain";
import { GameView } from "../views/gameview";

export class GameController {
    gameBrain: GameBrain;
    gameView: GameView;
    gameInterval: number;

    constructor(gameBrain: GameBrain, gameView: GameView) {
        this.gameBrain = gameBrain;
        this.gameView = gameView;
        this.gameInterval = 0;

    }

    startGame() {
        this.gameBrain.createBoard();
        this.drawGameBoardHtml();
        document.body.addEventListener("keyup", (e) => this.handleKey(e))
        document.body.addEventListener("click", (e) => this.handleKey(e))
    }

    restartGame() {
        this.gameBrain.createBoard();
        this.drawGameBoardHtml();
        this.gameBrain.gameStarted = false;
        this.gameView.drawGame();
    }

    gameTick() {
        if(!this.gameBrain.gameOver) {
            this.gameBrain.movePipes();
            this.drawGameBoardHtml();
            this.gameView.birdFall();
            this.checkCollision();
            this.updateScore();
        }
    }

    gameOver() {
        this.gameBrain.gameOver = true;
        clearInterval(this.gameInterval);
        let name = prompt("Game over! Enter your name:")
        if (name === null || name === "") {
            name = "Player";
        }
        this.gameBrain.addNewScore(name);
        let message = "High scores";
        var scores = this.gameBrain.scoreBoard.slice(0, 10);
        scores.sort(function(a,b) {
            return b.score - a.score;
        });
        scores.forEach(element => {
            message += "\n" + element.name + ": " + element.score;
        });
        let hiscores = alert(message);
        this.restartGame();
    }

    checkCollision() {
        let bird = document.body.querySelector("#bird")!;
        let pipes = document.body.querySelectorAll(".pipe");
        let upperPipe = bird!.previousElementSibling!.firstElementChild;
        let lowerPipe = bird!.previousElementSibling!.firstElementChild!.nextElementSibling!.nextElementSibling;
        pipes.forEach(pipe => {
            if (this.overlaps(bird, pipe.firstElementChild!) || this.overlaps(bird, pipe.firstElementChild!.nextElementSibling!.nextElementSibling!) || bird!.getBoundingClientRect().y + bird!.getBoundingClientRect().height > parseFloat((document.body.querySelector("#game")! as HTMLDivElement).style.height)) {
                this.gameOver();
            }
        })
    }

    overlaps(a: Element, b: Element) {
        const rect1 = a.getBoundingClientRect();
        const rect2 = b.getBoundingClientRect();
        const isInHoriztonalBounds =
          rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
        const isInVerticalBounds =
          rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
        const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
        return isOverlapping;
      }

    updateScore() {
        let bird = document.body.querySelector("#bird");
        let pipe = bird!.previousElementSibling;
        if (bird !== null && pipe !== null) {
            const rect1 = bird.getBoundingClientRect();
            const rect2 = pipe.getBoundingClientRect();
            if(rect1.x > rect2.x + rect2.width) {
                this.gameBrain.gameScore.score += 1;
                document.body.querySelector("#scoreText")!.innerHTML = "Score: " + this.gameBrain.gameScore.score;
            }
        }
    }

    drawGameBoardHtml() {
        this.gameView.drawBoard(this.gameBrain.gameBoard);
    }

    handleKey(e: MouseEvent | KeyboardEvent) {
        if((e instanceof KeyboardEvent && e.code === "Space") || e instanceof MouseEvent && e.button === 0) {
            if (!this.gameBrain.gameStarted) {
                this.gameBrain.gameStarted = true;
                this.gameBrain.gameOver = false;
                document.body.querySelector("#startText")!.remove();
                this.gameInterval = window.setInterval(() => {this.gameTick()}, 1000/120);
            }
            this.gameView.birdHop();
        }
    }
}
export class GameController {

    constructor(gameBrain, gameView, hiscoresView) {
        this.gameBrain = gameBrain;
        this.gameView = gameView;
        this.hiscoresView = hiscoresView;
    }

    startGame() {
        this.gameBrain.createBoard();
        console.log(this.gameBrain.gameBoard);
        this.drawGameBoardHtml();
        setInterval(() => {this.gameTick()}, 1000/60);
    }

    gameTick() {
        this.gameBrain.movePipes();
        this.drawGameBoardHtml();
    }

    drawGameBoardHtml() {
        this.gameView.drawBoard(this.gameBrain.gameBoard);
    }
}
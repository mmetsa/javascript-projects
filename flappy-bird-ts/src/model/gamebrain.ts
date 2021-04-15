class GameScore {
    public name = "";
    public score = 0;
    constructor() {
    }
}

export class Pipe {
    upperHeight: number;
    lowerHeight: number;
    gapHeight: number;
    xCoord: number;
    id: string;
    constructor(upperHeight: number, lowerHeight: number, gapHeight: number, xCoord: number, id: string) {
        this.upperHeight = upperHeight;
        this.lowerHeight = lowerHeight;
        this.gapHeight = gapHeight;
        this.xCoord = xCoord;
        this.id = id;
    }
}

const PIPE_GAP = 50;

export class GameBrain {
    scoreBoard: GameScore[];
    gameBoard: Pipe[];
    counter: number;
    gameStarted: boolean;
    gameOver: boolean;
    gameScore: GameScore;
    constructor() {
        this.scoreBoard = [];  // list of GameScore
        this.gameBoard = []; // list of Pipe
        this.counter = 0;
        this.gameStarted = false;
        this.gameOver = false;
        this.gameScore = new GameScore();
    }

    addNewScore(name: string) {
        this.gameScore.name = name;
        this.scoreBoard.push(this.gameScore);
        this.gameScore = new GameScore();
        console.log(this.scoreBoard)
    }

    createBoard() {
        this.gameBoard = [];
        this.gameBoard.push(this.createPipe(this.counter))
    }

    addPipe(pipe: Pipe) {
        this.gameBoard.push(pipe);
        console.log(this.gameBoard)
    }

    createPipe(id: number) {
        let upperHeight = Math.random() * (100 - PIPE_GAP)
        let lowerHeight = 100 - PIPE_GAP - upperHeight;
        let strid = "pipe-" + id;
        let pipe = new Pipe(upperHeight, lowerHeight, PIPE_GAP, 0, strid);
        return pipe;
    }

    movePipes() {
        this.gameBoard.forEach(pipe => {
            pipe.xCoord += 1;
        });
        this.gameBoard.forEach(pipe => {
            if(pipe.xCoord > 10000) {
                this.gameBoard.shift();
            }
        })
        if (this.gameBoard[this.gameBoard.length - 1].xCoord > 300) {
            this.counter ++;
            this.addPipe(this.createPipe(this.counter));
        }
    }
}
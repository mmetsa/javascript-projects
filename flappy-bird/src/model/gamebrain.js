class GameScore {
    constructor() {
        this.name = "";
        this.score = 0;
    }
}

class Pipe {
    constructor(upperHeight, lowerHeight, gapHeight, xCoord, id) {
        this.upperHeight = upperHeight;
        this.lowerHeight = lowerHeight;
        this.gapHeight = gapHeight;
        this.xCoord = xCoord;
        this.id = id;
    }
}

const PIPE_GAP = 30;

export class GameBrain {
    constructor() {
        this.scoreBoard = [];  // list of GameScore
        this.gameBoard = []; // list of Pipe
        this.counter = 0;
    }

    createBoard() {
        this.gameBoard.push(this.createPipe(this.counter))
    }

    addPipe(pipe) {
        this.gameBoard.push(pipe);
        console.log(this.gameBoard)
    }

    createPipe(id) {
        console.log(id)
        let upperHeight = Math.random() * (100 - PIPE_GAP)
        let lowerHeight = 100 - PIPE_GAP - upperHeight;
        id = "pipe-" + id;
        let pipe = new Pipe(upperHeight, lowerHeight, PIPE_GAP, 0, id);
        return pipe;
    }

    movePipes() {
        this.gameBoard.forEach(pipe => {
            pipe.xCoord += 1;
        });
        this.gameBoard.forEach(pipe => {
            if(pipe.xCoord > 2000) {
                this.gameBoard.shift();
            }
        })
        if (this.gameBoard[this.gameBoard.length - 1].xCoord > 300) {
            this.counter ++;
            this.addPipe(this.createPipe(this.counter));
        }
    }
}
const PIPE_WIDTH = window.innerWidth / 15;

export class GameView {
    constructor() {
        this.drawGame();
    }

    drawGame() {
        if(document.body.querySelector("#game") !== null) {
            document.body.querySelector("#game").remove();
        }
        let content = document.createElement("div")
        content.id = "game"
        content.style.height = window.innerHeight + "px";
        content.style.maxWidth = window.innerWidth + "px";
        content.style.backgroundColor = "cyan";
        content.style.backgroundImage = "url('./src/background.gif')";
        content.style.backgroundRepeat = "no-repeat";
        content.style.backgroundSize = "auto 100%";
        content.style.position = "relative";
        content.append(createBird());

        let startText = document.createElement("span")
        startText.innerHTML = "Press Space to Start and Fly"
        startText.id = "startText";
        startText.style.color = "white"
        startText.style.fontSize = "2em";
        startText.style.display = "inline-block";
        startText.style.position = "absolute";
        startText.style.top = window.innerHeight / 2 + "px";
        startText.style.left = window.innerWidth / 3 + "px";

        let scoreText = document.createElement("span");
        scoreText.innerHTML = "Score: "
        scoreText.id = "scoreText";
        scoreText.style.color = "white"
        scoreText.style.fontSize = "2em";
        scoreText.style.display = "inline-block";
        scoreText.style.position = "absolute";
        scoreText.style.padding = "1em";
        content.append(startText);
        content.append(scoreText);
        document.body.append(content);
    }

    birdHop() {
        let bird = document.querySelector("#bird");
        let rect = bird.getBoundingClientRect();
        bird.style.transition = "top 0.3s";
        bird.dataset.top -= rect.height * 4;
        bird.style.top = bird.dataset.top + "px";
    }

    birdFall() {
        let bird = document.querySelector("#bird");
        bird.dataset.top = Number(bird.dataset.top) + 3;
        bird.style.top = bird.dataset.top + "px";
    }

    drawBoard(gameBoard) {
        gameBoard.forEach(element => {
            if (element.xCoord < window.innerWidth * 1.1) {
                if(document.querySelector("#" + element.id)) {
                    document.querySelector("#" + element.id).remove();
                }
                document.querySelector("#game").prepend(createPipe(element))
            } else if (element.xCoord >= window.innerWidth * 1.1) {
                if(document.querySelector("#" + element.id)) {
                    document.querySelector("#" + element.id).remove();
                }
            }
        });
    }
}

const BIRD_HEIGHT = 78;
const BIRD_WIDTH = 95;

function createBird() {
    let bird = document.createElement("div");
    bird.id = "bird"
    let birdimg = document.createElement("img");
    birdimg.src = "./src/bird-flying.gif";
    birdimg.style.maxWidth = "100px";
    birdimg.style.maxHeight = "100px";
    bird.append(birdimg);
    bird.style.left = window.innerWidth / 10 + "px";
    bird.style.top = window.innerHeight / 2 + "px";
    bird.dataset.top = window.innerHeight / 2;
    bird.style.display = "inline-block";
    bird.style.position = "absolute";

    return bird;
}

function createPipe(pipe) {
    let upperPipe = document.createElement("div")
    let gap = document.createElement("div")
    let lowerPipe = document.createElement("div")

    let elemPipe = document.createElement("div");
    elemPipe.append(upperPipe);
    elemPipe.append(gap)
    elemPipe.append(lowerPipe);

    upperPipe.classList.add("pipe-upper")
    gap.classList.add("gap")
    lowerPipe.classList.add("pipe-lower")
    elemPipe.className = "pipe";
    elemPipe.id = pipe.id;

    upperPipe.style.backgroundColor = "black";
    lowerPipe.style.backgroundColor = "blue";
    upperPipe.style.width = PIPE_WIDTH + "px";
    upperPipe.style.height = window.innerHeight / 100 * pipe.upperHeight + "px";
    lowerPipe.style.width = PIPE_WIDTH + "px";
    lowerPipe.style.height = window.innerHeight / 100 * pipe.lowerHeight + "px";
    gap.style.width = PIPE_WIDTH + "px";
    gap.style.height = window.innerHeight / 100 * pipe.gapHeight + "px";

    elemPipe.dataset.upperHeight = window.innerHeight / 100 * pipe.upperHeight;
    elemPipe.dataset.lowerHeight = window.innerHeight / 100 * pipe.lowerHeight;
    elemPipe.dataset.xCoord = pipe.xCoord;
    
    elemPipe.style.height = window.innerHeight + "px";
    elemPipe.style.maxWidth = PIPE_WIDTH + "px";
    elemPipe.style.display = "inline-block";
    elemPipe.style.position = "absolute";
    elemPipe.dataset.right = pipe.xCoord;
    elemPipe.style.right = pipe.xCoord + "px";

    return elemPipe;
}
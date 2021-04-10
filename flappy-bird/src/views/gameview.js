
const PIPE_WIDTH = window.innerWidth / 15;
const PIPE_GAP = window.innerHeight / 4;
const PIPE_SPACING = window.innerWidth / 10 * 4;

/*export function gameView() {
    let content = document.createElement("div");
    content.id = "content"
    content.style.maxHeight = window.innerHeight + "px";
    content.style.maxWidth = window.innerWidth + "px";
    content.style.position = "relative";
    content.append(createBird());
    return content;
}*/
export class GameView {
    constructor() {
        let content = document.createElement("div")
        content.id = "game"
        content.style.maxHeight = window.innerHeight + "px";
        content.style.maxWidth = window.innerWidth + "px";
        content.style.position = "relative";
        content.append(createBird());
        document.body.append(content);
    }

    drawBoard(gameBoard) {
        gameBoard.forEach(element => {
            if (element.xCoord < window.innerWidth * 1.1) {
                if(document.querySelector("#" + element.id)) {
                    document.querySelector("#" + element.id).remove();
                }
                document.querySelector("#game").append(createPipe(element))
            } else if (element.xCoord >= window.innerWidth * 1.1) {
                if(document.querySelector("#" + element.id)) {
                    document.querySelector("#" + element.id).remove();
                }
            }
        });
    }
}

function createBird() {
    let bird = document.createElement("div");
    bird.innerHTML = "BIRD";
    bird.id = "bird"
    bird.style.fontSize = "x-large"
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
    
    elemPipe.style.height = window.innerHeight + "px";
    elemPipe.style.maxWidth = PIPE_WIDTH + "px";
    elemPipe.style.display = "inline-block";
    elemPipe.style.position = "absolute";
    elemPipe.dataset.right = pipe.xCoord;
    elemPipe.style.right = pipe.xCoord + "px";

    return elemPipe;
}

/*function createPipe(pipeId, width) {

    let topHeight = Math.random() * (window.innerHeight - PIPE_GAP);
    let bottomHeight = window.innerHeight - topHeight - PIPE_GAP;

    let upperPipe = document.createElement("div")
    let gap = document.createElement("div")
    let lowerPipe = document.createElement("div")

    let pipe = document.createElement("div");
    pipe.append(upperPipe);
    pipe.append(gap)
    pipe.append(lowerPipe);

    upperPipe.classList.add("pipe-" + pipeId)
    gap.classList.add("gap-" + pipeId)
    lowerPipe.classList.add("pipe-" + pipeId)
    pipe.id = pipeId;

    upperPipe.style.backgroundColor = "black";
    lowerPipe.style.backgroundColor = "blue";
    upperPipe.style.width = width + "px";
    upperPipe.style.height = topHeight + "px";
    lowerPipe.style.width = width + "px";
    lowerPipe.style.height = bottomHeight + "px";
    gap.style.width = width + "px";
    gap.style.height = PIPE_GAP + "px";
    
    pipe.style.height = window.innerHeight + "px";
    pipe.style.maxWidth = width + "px";
    pipe.style.display = "inline-block";
    pipe.style.position = "absolute";

    return pipe;
}*/
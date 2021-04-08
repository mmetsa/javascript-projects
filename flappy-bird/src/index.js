
const PIPE_WIDTH = window.innerWidth / 15;
const PIPE_GAP = window.innerHeight / 4;
const PIPE_SPACING = window.innerWidth / 10 * 4;

function animate(pos) {
    if(content.lastElementChild !== null) {
        for (let child of content.childNodes) {
            child.style.right = Number(child.dataset.right) + 2 + "px";
            child.dataset.right = Number(child.dataset.right) + 2;
        }
        pos -= 1;
    }
    if (content.lastElementChild === null || content.lastElementChild.dataset.right > PIPE_SPACING) {
        let pipe = createPipe("0", PIPE_WIDTH);
        pipe.dataset.right = 0;
        pipe.style.right = 0 + "px";
        content.append(pipe)
    }
    setTimeout(function() {
        requestAnimationFrame(function() {
            animate(pos);
        });  
    }, 1000/300)
}

function createPipe(pipeId, width) {

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
}

let content = document.createElement("div");
content.id = "content";
content.style.maxHeight = window.innerHeight + "px";
content.style.position = "relative";

document.body.append(content)

requestAnimationFrame(function() {
    animate(0);
});
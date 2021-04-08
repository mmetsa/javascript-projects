'use strict'

console.log("(Not So) Flappy Bird")

function animate(colIndex) {
    setInterval(() => {
        let child = content.firstElementChild;
        if(child !== null) {
            child.remove();
            content.append(createColumn(colIndex))
            colIndex++;
        }
    }, 50);
}

function createColumn(columnId) {
    let colelem = document.createElement("div")
    colelem.classList.add("col-" + columnId)
    colelem.style.backgroundColor = "#" + Math.floor(Math.random() * 255).toString(16) + Math.floor(Math.random() * 255).toString(16) + Math.floor(Math.random() * 255).toString(16)
    colelem.style.width = columnWidth + "px";
    colelem.style.height = window.innerHeight  + "px";
    return colelem;
}

let COLUMN_COUNT = 60;

const PATH_HEIGHT = 0.3;

let viewPortWidth = window.innerWidth
let columnWidth = viewPortWidth / COLUMN_COUNT

let content = document.createElement("div")
content.style.columnCount = COLUMN_COUNT;

for (let index = 0; index < COLUMN_COUNT; index++) {
    content.appendChild(createColumn(index))
}
document.body.appendChild(content)

let colIndex = 100;
animate(colIndex)
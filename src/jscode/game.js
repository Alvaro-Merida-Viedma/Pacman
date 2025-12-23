//TODO GHOST_MOVES

const tileSize = 20;
let ctx;
let cherryCount = 0;
let lives = 3;
let map;
let pacman = {
    x: 0,
    y: 0,
    dir: 'left'
};

let ghosts = [];
let foodMap = [];

let GHOST_MOVES = 0;

//WALL
const WALL = new Image();
WALL.src = 'sprites/wall.png';

//CHERRY
const CHERRY = new Image();
CHERRY.src = 'sprites/cherry.png';

//PACMAN
const PACMAN_DOWN = new Image();
PACMAN_DOWN.src = 'sprites/pacmanDown.png';

const PACMAN_LEFT = new Image();
PACMAN_LEFT.src = 'sprites/pacmanLeft.png';

const PACMAN_RIGHT = new Image();
PACMAN_RIGHT.src = 'sprites/pacmanRight.png';

const PACMAN_UP = new Image();
PACMAN_UP.src = 'sprites/pacmanUp.png';

// GHOSTS
const BLUE_GHOST = new Image();
BLUE_GHOST.src = "sprites/blueGhost.png";

const ORANGE_GHOST = new Image();
ORANGE_GHOST.src = "sprites/orangeGhost.png";

const RED_GHOST = new Image();
RED_GHOST.src = "sprites/redGhost.png";

const PINK_GHOST = new Image();
PINK_GHOST.src = "sprites/pinkGhost.png";

const SCARED_GHOST = new Image();
SCARED_GHOST.src = "sprites/scaredGhost.png"


const loadMap = () => {
    const canvas = document.getElementById('screen');
    ctx = canvas.getContext('2d');

    
    let map1 = [
["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"],
["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
["W",".","W","W",".","W","W","W","W","W","W",".","W","W","W","W","W","W",".","W"],
["W",".","c","c",".",".",".",".",".",".",".",".",".",".",".",".",".","W",".","W"],
["W",".","W","W",".","W",".","W","W","W","W","W","W",".",".",".",".","W",".","W"],
["W",".",".",".",".","W","c","c","c","c","c","c","W",".",".",".",".","W",".","W"],
["W","W",".",".",".","W","W","W","W",".","W","W","W",".",".","W","W","W",".","W"],
["W",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".",".","W"],
["W",".","W","W","W","W",".","W","W","W","W","W","W",".","W","W",".",".",".","W"],
["W",".",".",".",".",".",".",".","r","b","p","o",".",".",".",".",".",".",".","W"],
["W",".","W","W","W","W",".","W","W","W","W","W",".",".",".",".","W","W","W","W"],
["W",".",".",".","c","W",".","c","c","c","c","c",".",".",".",".",".",".",".","W"],
["W",".","W","W","W","W",".","W","W","W","W","W",".",".",".",".","W",".",".","W"],
["W",".",".",".",".",".",".",".","W",".",".",".",".",".",".",".","W",".",".","W"],
["W",".","W","W",".","W","W","W","W","W","W",".","W","W","W","W","W",".",".","W"],
["W",".",".","W",".",".",".",".",".",".",".","P",".",".",".",".",".",".",".","W"],
["W","W",".","W",".","W",".","W","W","W","W","W","W","W",".",".","W",".",".","W"],
["W",".",".",".",".","W",".",".",".",".",".",".",".",".",".",".","W",".",".","W"],
["W",".","W","W","W","W","W","W","W",".","W","W",".","W","W","W","W","W",".","W"],
["W",".","c","c","c","c","c","c",".",".",".",".","c","c","c","c","c",".",".","W"],
["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"]
    ];

    map = map1;


    for (let i = 0; i < map1.length; i++) {
        foodMap[i] = [];
        for (let j = 0; j < map1[i].length; j++) {
            const cell = map1[i][j];
            if (cell === "P") {
                pacman.x = j;
                pacman.y = i;
            }
            else if ("rbpos".includes(cell)) {
                ghosts.push({
                    x: j,
                    y: i,
                    type: cell
                });
            }
            foodMap[i][j] = (map[i][j] == 'c');
        }
    }
    

    drawMap(map1);
    GHOST_MOVES = setInterval(moveGhosts, 400);
    
}



function drawMap(map1){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let i = 0; i < map1.length; i++) {
        for (let j = 0; j < map1[i].length; j++) {
            const cell = map1[i][j];
            drawTile(cell, j * tileSize, i * tileSize);
            if (foodMap[i][j]) 
                ctx.drawImage(CHERRY, j * tileSize, i * tileSize, tileSize, tileSize);
        }   
    }

    let pacImg;

    switch (pacman.dir) {
        case "up": pacImg = PACMAN_UP; break;
        case "down": pacImg = PACMAN_DOWN; break;
        case "left": pacImg = PACMAN_LEFT; break;
        case "right": pacImg = PACMAN_RIGHT; break;
    }
    ctx.drawImage(pacImg, pacman.x * tileSize, pacman.y * tileSize, tileSize, tileSize);

}

function drawTile(cell, x, y){
    switch (cell) {
        case "W":
            ctx.drawImage(WALL, x, y, tileSize, tileSize);
            break;
        case "b":
            ctx.drawImage(BLUE_GHOST, x, y, tileSize, tileSize);
            break;
        case "o":
            ctx.drawImage(ORANGE_GHOST, x, y, tileSize, tileSize);
            break;
        case "r":
            ctx.drawImage(RED_GHOST, x, y, tileSize, tileSize);
            break;
        case "p":
            ctx.drawImage(PINK_GHOST, x, y, tileSize, tileSize);
            break;
        case "s":
            ctx.drawImage(SCARED_GHOST, x, y, tileSize, tileSize);
            break;
        default:
            ctx.fillStyle = "black";
            ctx.fillRect(x, y, tileSize, tileSize);
            break;
    }
}


function move(e){
    let newX = pacman.x;
    let newY = pacman.y;

    if (e.code == 'ArrowUp' || e.code == 'KeyW'){
        newY--;
        pacman.dir = "up";
    }
    else if (e.code == 'ArrowDown' || e.code == 'KeyS'){
        newY++;
        pacman.dir = 'down';
    }
    else if (e.code == 'ArrowLeft' || e.code == 'KeyA'){
        newX--;
        pacman.dir = 'left';
    }
    else if (e.code == 'ArrowRight' || e.code == 'KeyD'){
        newX++;
        pacman.dir = 'right';
    }

    if (!"rbpoW".includes(map[newY][newX])){
        if (map[newY][newX] === 'c'){
            cherryCount++;
            cherryView();
            foodMap[newY][newX] = false;
            if (cherryCount >= 20){
                scareGhosts();
            }
        }
        else if (map[newY][newX] === 's'){
            ghosts = ghosts.filter(g => g.x != newX && g.y != newY);
            if (ghosts.length == 0){
                alert('You WIN');
                window.location.reload();
            }
        }
        map[pacman.y][pacman.x] = '.';
        pacman.x = newX;
        pacman.y = newY;
        map[pacman.y][pacman.x] = "P";
    }
    else if (map[newY][newX] != "W"){
        lives--;
        livesView()
        checkLives();
    }
    
    drawMap(map);
}

function moveGhosts() {
    for (const g of ghosts) {
        let nX = g.x;
        let nY = g.y;

        switch(Math.floor(Math.random() * 4)) {
            case 0: nX = g.x + 1; break;
            case 1: nY = g.y + 1; break;
            case 2: nX = g.x - 1; break;
            case 3: nY = g.y - 1; break;
        }
        if (map[nY][nX] === 'P') {
            if (g.type != 's'){
                lives--;
                livesView();
                checkLives();
            }
        }
        if (!"rbposW".includes(map[nY][nX])) {
            map[g.y][g.x] = foodMap[g.y][g.x] ? 'c' : '.';

            g.x = nX;
            g.y = nY;

            map[g.y][g.x] = g.type;
        }
    }
    drawMap(map);
}


function checkLives(){
    if (lives <= 0) gameOver();
}

function gameOver(){
    clearInterval(GHOST_MOVES);
    alert('Has perdido');
    window.location.reload();
}

function scareGhosts(){
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            if ("rbpo".includes(map[i][j])) map[i][j] = 's';
        }
    }
    for (const g of ghosts) {
        g.type = "s";
    }
}

function livesView(){
    let div = document.getElementById('lives');
    div.textContent = "Numero de vidas: "+lives;
}

function cherryView(){
    let div = document.getElementById('cherry');
    div.textContent = "Numero de cherrys: "+cherryCount;
}

function setDivs(){
    let livesDiv = document.createElement('div');
    livesDiv.id = 'lives';
    livesDiv.textContent = "Numero de vidas: "+lives;

    let cherrysDiv = document.createElement('div');
    cherrysDiv.id = 'cherry';
    cherrysDiv.textContent = "Numero de cherrys: "+cherryCount;


    let container = document.querySelector('.scores')
    container.appendChild(livesDiv);
    container.appendChild(cherrysDiv)
}

window.onload = () => {
    setDivs();
    loadMap();
    
    document.addEventListener('keydown', move);
};

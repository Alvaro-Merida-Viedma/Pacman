const tileSize = 20;
let ctx;

const WALL = new Image();
WALL.src = 'sprites/wall.png';
const PACMAN_UP = new Image();
PACMAN_UP.src = 'sprites/pacmanUp.png';
const BLUE_GHOST = new Image();
BLUE_GHOST.src = "sprites/blueGhost.png";
const ORANGE_GHOST = new Image();
ORANGE_GHOST.src = "sprites/orangeGhost.png";
//TO-DO rest of img

const loadMap = () => {
    const canvas = document.getElementById('screen');
    ctx = canvas.getContext('2d');

    let map1 = [
  ["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"],
  ["W"," "," "," "," "," ","W","W","W","W","W","W","W"," "," "," "," ","W","W","W","W","W","W","W"," "," "," ","W"],
  ["W"," ","W","W","W"," ","W"," "," "," "," "," ","W"," ","W","W","W"," "," "," "," "," ","W"," ","W","W"," ","W"],
  ["W"," ","W","W","W"," ","W"," ","W","W","W"," ","W"," ","W","W","W"," ","W","W","W"," ","W"," ","W","W"," ","W"],
  ["W"," "," "," "," "," "," "," ","W","W","W"," "," "," "," "," "," "," ","W","W","W"," "," "," "," "," "," ","W"],
  ["W"," ","W","W","W"," ","W"," ","W","W","W"," ","W","W","W","W","W"," ","W","W","W"," ","W"," ","W","W"," ","W"],
  ["W"," "," "," ","W"," ","W"," "," "," "," "," ","W","W","W","W","W"," "," "," "," "," ","W"," "," "," ","W","W"],
  ["W","W","W"," ","W"," ","W","W","W","W","W","W","W"," "," "," ","W","W","W","W","W"," ","W"," ","W","W","W","W"],
  [" "," ","W"," "," "," "," "," "," "," "," "," "," ","W","W","W"," "," "," "," "," "," "," "," ","W"," "," "," "],
  ["W","W","W"," ","W","W","W","W","W","W","W","W","W"," ","gB","gO"," ","W","W","W","W","W","W","W"," ","W","W","W"],
  ["W","W","W"," ","W"," "," "," "," "," "," "," ","W"," "," "," "," ","W"," "," "," "," "," ","W"," ","W","W","W"],
  ["W","W","W"," ","W"," ","W","W","W","W","W"," ","W","W","W","W","W","W"," ","W","W","W"," ","W"," ","W","W","W"],
  ["W","W","W"," ","W"," ","W"," "," "," ","W"," ","W"," "," "," "," ","W"," ","W"," ","W"," ","W"," ","W","W","W"],
  [" "," "," "," "," "," ","W"," ","W"," ","W"," ","W"," ","W","W"," ","W"," ","W"," ","W"," "," "," "," "," "," "],
  ["W","W","W"," ","W","W","W"," ","W"," ","W"," ","W"," ","W","W"," ","W"," ","W"," ","W","W","W"," ","W","W","W"],
  ["W","W","W"," "," "," "," "," ","W"," "," "," ","W"," "," "," "," ","W"," "," "," "," "," "," "," ","W","W","W"],
  ["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"],
  ["W","W","W"," "," "," "," "," "," "," "," "," "," ","W","W","W"," "," "," "," "," "," "," "," "," ","W","W","W"],
  ["W","W","W"," ","W","W","W","W","W","W","W","W","W"," "," "," ","W","W","W","W","W","W","W","W","W","W","W","W"],
  ["W","W","W"," ","W"," "," "," ","W"," "," "," ","W"," ","W","W"," ","W"," "," "," ","W"," "," "," ","W","W","W"],
  ["W","W","W"," ","W"," ","W"," ","W"," ","W"," ","W"," ","W","W"," ","W"," ","W"," ","W"," ","W"," ","W","W","W"],
  ["W"," "," "," "," "," ","W"," "," "," ","W"," "," "," ","W","W"," "," "," ","W"," "," "," "," "," "," "," ","W"],
  ["W"," ","W","W","W"," ","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"," ","W","W","W","W"," ","W"],
  ["W"," "," "," ","W"," "," "," "," "," "," "," ","W","W","W","W","W"," "," "," "," "," "," "," ","W"," "," ","W"],
  ["W","W","W"," ","W","W","W","W","W","W","W"," ","W"," "," "," ","W"," ","W","W","W","W","W","W","W"," ","W","W"],
  ["W"," "," "," "," "," "," "," "," "," ","W"," ","W"," ","W","W","W"," ","W"," "," "," "," "," "," "," "," ","W"],
  ["W"," ","W","W","W","W","W","W","W"," ","W"," ","W"," ","W","W","W"," ","W"," ","W","W","W","W","W","W"," ","W"],
  ["W"," "," "," "," "," "," "," ","W"," "," "," "," "," "," "," "," "," ","W"," "," "," "," "," "," "," "," ","W"],
  ["W","W","W","W","W","W","W","W","W","W","W","W","W","P"," "," ","W","W","W","W","W","W","W","W","W","W","W","W"]
    ];

    drawMap(map1);
    console.log("test");
    
}



function drawMap(map1){
    for (let i = 0; i < map1.length; i++) {
        for (let j = 0; j < map1[i].length; j++) {
            const cell = map1[i][j];
            drawTile(cell, j * tileSize, i * tileSize);
            console.log(map1[i][j]);
            
        }
    }
}

function drawTile(cell, x, y){
    switch (cell) {
        //TO_DO Rest of img
        case "W":
            ctx.drawImage(WALL, x, y, tileSize, tileSize);
            break;
        case "P":
            ctx.drawImage(PACMAN_UP, x, y, tileSize, tileSize);
            break;
        case "gB":
            ctx.drawImage(BLUE_GHOST, x, y, tileSize, tileSize);
            break;
        case "gO":
            ctx.drawImage(ORANGE_GHOST, x, y, tileSize, tileSize);
            break;
        default:
            ctx.fillStyle = "black"; 
            ctx.fillRect(x, y, tileSize, tileSize);
            break;
    }
}


window.onload = () => {
    loadMap();
};

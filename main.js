var canvas = document.getElementById("conwayCanvas");
var ctx = canvas.getContext("2d");
var genText = document.getElementById("gen");
var playButton = document.getElementById("play");

var generation = 1;
var gridSize = 10;
var numRows = 500 / gridSize;
var numCols = 1000 / gridSize;
var isRunning = false;
var gameInterval = 0;
var neighbours = 0;

// 2d array for current placement of cells in a world
var world = new Array(numCols);

for (var x=0; x<numCols; x++) {
	world[x] = new Array(numRows);
	for (var y=0; y<numRows; y++) {
		world[x][y] = 0;	
	}
}

// 2d array for cell changes in the next generation
var tempWorld = new Array(numCols);

for (var x=0; x<numCols; x++) {
	tempWorld[x] = new Array(numRows);
	for (var y=0; y<numRows; y++) {
		tempWorld[x][y] = 0;	
	}
}


canvas.addEventListener("mousedown", onMouseClick, false);

drawWorld();

//----------FUNCTIONS----------//


// Game logic loop
function gameUpdate() {

	// Go through every cell (dead or alive) in a world
	for (var x=0; x<numCols; x++) {
		for (var y=0; y<numRows; y++) {
			
			// Count neighbours
			neighbours = 0;
			for (var i=-1; i<=1; i++) {
				for (var j=-1; j<=1; j++) {
					var col = x + i;
					var row = y + j;
					if (col < numCols && col >= 0 && row < numRows && row >= 0 && !(i == 0 && j == 0) && world[col][row] == 1) {
						neighbours++;
					}
				}
			}

			// Apply the Conway's Game of Life rules
			// if the cell is alive
			if (world[x][y] == 1) {
				if (neighbours == 2 || neighbours == 3) {
					tempWorld[x][y] = 1;
				} else {
					tempWorld[x][y] = 0;
				}
			}

			// if the cell is dead
			if (world[x][y] == 0) {
				if (neighbours == 3) {
					tempWorld[x][y] = 1;
				} else {
					tempWorld[x][y] = 0;
				}
			}
		}
	}

	// Apply changes to current world
	for (var x=0; x<numCols; x++) {
		for (var y=0; y<numRows; y++) {
			world[x][y] = tempWorld[x][y];
		}
	}

	generation++;
	drawWorld();
	updateStatistics();
}


function drawGrid() {
	ctx.beginPath();
	for (var i=0; i<1000; i+=gridSize) {
		ctx.moveTo(i,0);
		ctx.lineTo(i,500);
	}
	for (i=0; i<500; i+=gridSize) {
		ctx.moveTo(0,i);
		ctx.lineTo(1000,i);
	}

	ctx.strokeStyle = "#333";
	ctx.stroke();
	ctx.closePath();
}


function drawWorld() {
	ctx.clearRect(0,0,1000,500);

	ctx.beginPath();
	for (var x=0; x<numCols; x++) {
		for (var y=0; y<numRows; y++) {
			if (world[x][y] == 1) {
				ctx.fillStyle = "#f4aa42";
				ctx.fillRect(x * gridSize+2, y * gridSize+2, gridSize-4, gridSize-4);
			}
		}
	}
	ctx.closePath();
	drawGrid();
}


function resetWorld() {
	for (var x=0; x<numCols; x++) {
		for (var y=0; y<numRows; y++) {
			world[x][y] = 0;
		}
	}
	drawWorld();
	updateStatistics();
}


function updateStatistics() {
	genText.innerHTML = "Generation: " + generation;
}


// Add new cell with a click
function onMouseClick(e) {
	var coordX = parseInt((e.clientX-10) / gridSize);
	var coordY = parseInt((e.clientY-10) / gridSize);

	if (world[coordX][coordY] == 0) {
		world[coordX][coordY] = 1;
	} else {
		world[coordX][coordY] = 0;
	}

	drawWorld();
	drawGrid();
	updateStatistics();
}


function startGame() {
	if (!isRunning) {
		isRunning = true;
		gameInterval = setInterval(gameUpdate, 50);
		play.innerHTML = "Pause";
	} else {
		clearInterval(gameInterval);
		gameInterval = 0;
		play.innerHTML = "Start";
		isRunning = false;
	}
}


function stepForward() {
	gameUpdate();
}


function clearGame() {
	generation = 1;
	resetWorld();
}


function randomizeGame() {
	clearGame();

	for (var x=0; x<numCols; x++) {
		for(var y=0; y<numRows; y++) {
			if (Math.random() < 0.2) {
				world[x][y] = 1;
			} else {
				world[x][y] = 0;	
			}
		}
	}
	drawWorld();
}
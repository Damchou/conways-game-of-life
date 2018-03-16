// Alustetaan tarvittavat muuttujat piirtämiseen
var canvas = document.getElementById("conwayCanvas");
var ctx = canvas.getContext("2d");

var generation = 0;
var liveCells = 0;
var gridSize = 10;
var coordY = 0;
var coordX = 0;

// Asetetaan muutamia tarvittavia EventListeneriä
document.addEventListener("mousedown", onMouseClick, false);

drawGrid();

//----------FUNKTIOT----------//

// Piirtää peliruudukon
function drawGrid() {
	for(var i=0; i<1000; i+=gridSize) {
		ctx.moveTo(i,0);
		ctx.lineTo(i,500);
}
	for(i=0; i<500; i+=gridSize) {
		ctx.moveTo(0,i);
		ctx.lineTo(1000,i);
}

	ctx.strokeStyle = "#555";
	ctx.stroke();
}

function onMouseClick(e) {
	coordX = parseInt((e.clientX-10) / gridSize);
	coordY = parseInt((e.clientY-10) / gridSize);

	ctx.fillStyle = "#888";
	ctx.fillRect(coordX * gridSize, coordY * gridSize, gridSize, gridSize);
	document.getElementById("coords").innerHTML = 'Coords: ' + coordX + ',' + coordY;
}

// Funktio, joka resetoi pelin ja statistiikan
function clearGame(){
	alert("Cleared?");
}

// Funktio, joka käynnistää pelin
function startGame() {
	alert("Started?");
}
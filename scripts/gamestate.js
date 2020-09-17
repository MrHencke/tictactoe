import gamelogic from "./gamelogic";
//import { initializeGame, setTile, winCheck, restart } from "./gamelogic";

let gameState;
var player1;
var player2;
let currentPlayer;
let count = 0;

gamelogic.initializeGame(); //method call works, checked with consolelog

document.querySelectorAll(".buttonbox").forEach((cell) => {
	cell.addEventListener("click", function () {
		gamelogic.setTile(cell.id);
		gamelogic.winCheck(gameState);
		console.log(gameState);
		gamelogic.restart(gameState);
	});
});

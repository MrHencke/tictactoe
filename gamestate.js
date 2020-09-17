let gameState;
var player1;
var player2;
let currentPlayer;
let count = 0;

initializeGame(); //method call works, checked with consolelog

document.querySelectorAll(".buttonbox").forEach((cell) => {
	cell.addEventListener("click", function () {
		setTile(cell.id);
		winCheck(gameState);
		console.log(gameState);
		fullBoard(gameState);
	});
});

function initializeGame() {
	player1 = {
		icon: "X",
		name: "Player 1",
		score: 0,
	};
	player2 = {
		icon: "O",
		name: "Player 2",
		score: 0,
	};

	refreshBoard();
}

function refreshBoard() {
	gameState = ["", "", "", "", "", "", "", "", ""];
	currentPlayer = player1;
	count++;
	var title = getTitle(count);
	document.getElementById("title").innerHTML = `${title} game`;
	document.getElementById(
		"turn"
	).innerHTML = `Its player ${currentPlayer.name}'s turn`;
	document.getElementById("score1").innerHTML = `Player 1: ${player1.score}`;
	document.getElementById("score2").innerHTML = `Player 2: ${player2.score}`;
	document.querySelectorAll(".buttonbox").forEach((cell) => {
		cell.classList.remove("oBox");
		cell.classList.remove("xBox");
		cell.value = "";
	});
}

function setTile(tile) {
	var tileEl = document.getElementById(tile);
	if (tileEl.classList == "buttonbox") {
		var arg = currentPlayer == player1 ? "xBox" : "oBox";
		var value = currentPlayer.icon;
		tileEl.classList.add(arg);
		tileEl.value = value;
		gameState[tile] = value;
		currentPlayer = currentPlayer == player1 ? player2 : player1; //changes player
		document.getElementById(
			"turn"
		).innerHTML = `Its ${currentPlayer.name}'s turn`;
	} else {
		document.getElementById(
			"turn"
		).innerHTML = `You cant select that tile ${currentPlayer.name}`;
	}
}

function winCheck() {
	let roundWon = false;
	var icon;
	for (let i = 0; i <= 7; i++) {
		const winCondition = winningConditions[i];
		let a = gameState[winCondition[0]];
		let b = gameState[winCondition[1]];
		let c = gameState[winCondition[2]];
		if (a === "" || b === "" || c === "") {
			continue;
		}
		if (a === b && b === c) {
			roundWon = true;
			icon = a;
			break;
		}
	}
	if (roundWon) {
		var winner;
		var loser;
		player1.icon == icon
			? ((winner = player1), (player1.score += 1), (loser = player2))
			: ((winner = player2), (player2.score += 1), (loser = player1));
		document.getElementById("title").innerHTML = `${winner} won the round!`;
		document.getElementById("turn").innerHTML = `Sucks to be you ${loser}!`;
		refreshBoard();
		return;
	}
}

function fullBoard() {
	if (!gameState.includes("")) {
		refreshBoard();
	}
}

function getTitle(count) {
	if (count == 1) return "First";
	if (count == 2) return "Second";
	if (count == 3) return "Third";
	if (count > 3) return `${count}th`;
}

function sleep(duration) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, duration * 1000);
	});
}

const winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

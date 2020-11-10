var origBoard;
const huPlayer ='O';
const aiPlayer = 'X';
const winCombos = [ //Alla möjliga sätt att vinna på
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2],
]
const cells = document.querySelectorAll('.cell');
startGame();

function startGame() { //funktion för att starta spelet
    document.querySelector(".endgame").style.display="none"
    origBoard = Array.from(Array(9).keys())
    for (var i = 0; i < cells.length; i++) {
      cells[i].innerText = '';
      cells[i].style.removeProperty('background-color');
      cells[i].addEventListener('click', turnClick, false)
    }
}

function turnClick(square) {
  if (typeof origBoard[square.target.id] =='number'){
    turn(square.target.id, huPlayer)
  if(!checkTie()) turn(bestspot(), aiPlayer); //AI placerar på spelplanen ifall det inte är lika först
  }
}

function turn(squeareId, player) {
  origBoard[squeareId] = player;
  document.getElementById(squeareId).innerText = player;
  let gameWon = checkWin(origBoard, player) //Kollar ifall någon vunnit
  if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.backgroundColor =
			gameWon.player == huPlayer ? "#808000" : "#800000"; //Olika färger beroende på vem som vinner
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
  }
  declaraWinner(gameWon.player == huPlayer ? "You win!" : "You lose") //Meddelar vem som har vunnit 
}

function declaraWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}

function emtySquares () {
  return origBoard.filter(s => typeof s == 'number');
}

function bestspot() {
  return emtySquares()[0]; // Skickar tillbaka första bästa plats
}

function checkTie() {
  if(emtySquares().length == 0){
    for (var i = 0; i < cells.length; i++){
      cells[i].style.backgroundColor="limeyellow" //Ifall det blir lika färgar den spelplanen limegul
      cells[i].removeEventListener('click', turnClick, false)
    }
    declaraWinner("Tie Game") //Visar dock ifall någon vinner på sista rundan att de är lika
    return true
  }
  return false
}

var popupDiv = document.getElementById("popup_bg")

function openPopUpMenu() {
  popupDiv.style.display = "block";
}
function closePopUpMenu() {
  popupDiv.style.display = "none";
}
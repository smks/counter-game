document.addEventListener("DOMContentLoaded", onContentLoaded);

const EMPTYCELL = 0;
const RED_COUNTER = 1;
const BLUE_COUNTER = 2;
const PLAYER_ONE = "Player 1";
const PLAYER_TWO = "Player 2";
const PLAYER_1_RED_CLASSNAME = "grid-cell-counter-red";
const PLAYER_2_BLUE_CLASSNAME = "grid-cell-counter-blue";
const PLAYER_ACTIVE_CLASSNAME = "grid-cell-counter-active";
const PLAYER_CHOSEN_CLASSNAME = "grid-cell-counter-chosen";
const EMPTY_CELL_CLASSNAME = "grid-cell-dot-empty";

var playerChosen = false;

var currentPlayersColor = null;
var currentPlayerColumnIndexFrom = null;
var currentPlayerRowIndexFrom = null;
var currentPlayerColumnIndexTo = null;
var currentPlayerRowIndexTo = null;

var gridCells = [
  [RED_COUNTER , RED_COUNTER, RED_COUNTER, RED_COUNTER],
  [RED_COUNTER, EMPTYCELL, EMPTYCELL, RED_COUNTER],
  [BLUE_COUNTER, EMPTYCELL, EMPTYCELL, BLUE_COUNTER],
  [BLUE_COUNTER, BLUE_COUNTER, BLUE_COUNTER, BLUE_COUNTER]
];

var gridCellsDom = [
  [null , null, null, null],
  [null, null, null, null],
  [null, null, null, null],
  [null, null, null, null]
];

function onContentLoaded(event) {
  
  var columnCount = 4;
  var rowCount = 4;

  var grid = document.getElementById("grid");

  for (i = 0; i < gridCells.length; i++){
    var line = gridCells[i];
    for ( j = 0; j < line.length; j++) {
      var cell = line[j];
      createCell(grid, cell, j, i);
    } 
  }

  var playerCounts = document.getElementsByClassName('playerCount');
  var player1Count = playerCounts[0];
  var player2Count = playerCounts[1];
  
  var player1Score = player1Count.firstElementChild.innerText;
  var player2Score = player2Count.firstElementChild.innerText;

  var currentPlayerTurn = getPlayerTurn();

  var playerTurns = document.getElementsByClassName('playerTurn');
  var playerTurn = playerTurns[0];
  var playerTurnSpan = playerTurn.firstElementChild;
  playerTurnSpan.innerText = currentPlayerTurn;

  setActivePlayer(currentPlayerTurn);
  setToDestination();
}


function updateCells() {
  var grid = document.getElementById("grid");
  for (i = 0; i < gridCells.length; i++){
    var line = gridCells[i];
    for ( j = 0; j < line.length; j++) {
      var cell = line[j];
      updateCell(grid, cell, j, i);
    } 
  }
}

function updateCell(grid, cell, columnIndex, rowIndex) {

  var cellElement = gridCellsDom[columnIndex][rowIndex];
  var dotElement = cellElement.querySelector('.grid-cell-dot');
  var counterElement = cellElement.querySelector('.grid-cell-counter');

  counterElement.classList.remove(PLAYER_ACTIVE_CLASSNAME);
  counterElement.classList.remove(PLAYER_1_RED_CLASSNAME);
  counterElement.classList.remove(PLAYER_2_BLUE_CLASSNAME);
  counterElement.classList.remove(PLAYER_CHOSEN_CLASSNAME);

  if (cell === RED_COUNTER) {
    dotElement.classList.remove(EMPTY_CELL_CLASSNAME);
    counterElement.classList.add(PLAYER_1_RED_CLASSNAME);
  } else if (cell === BLUE_COUNTER) {
    dotElement.classList.remove(EMPTY_CELL_CLASSNAME);
    counterElement.classList.add(PLAYER_2_BLUE_CLASSNAME);
  } else {
    dotElement.classList.add(EMPTY_CELL_CLASSNAME);
  }

}


// GLOBAL SCOPE 

function setToDestination() {
  var emptyCells = document.getElementsByClassName(EMPTY_CELL_CLASSNAME);
  for (var i = 0; i < emptyCells.length; i++) {
    var emptyCell = emptyCells[i];
    emptyCell.addEventListener('click', onEmptyCellClick);
  }
}

function onClickCell(event) {
  playerChosen = true;
  removeOtherChosenCounters ();
  var counter = event.currentTarget;
  currentPlayersColor = counter.classList.contains(PLAYER_1_RED_CLASSNAME) ? RED_COUNTER : BLUE_COUNTER;
  currentPlayerColumnIndexFrom = counter.parentElement.dataset.column;
  currentPlayerRowIndexFrom = counter.parentElement.dataset.row;
  counter.classList.add(PLAYER_CHOSEN_CLASSNAME);
}

function onEmptyCellClick(event) {
  if (playerChosen === false) {
    return;
  }
  var emptyDot = event.currentTarget;
  currentPlayerColumnIndexTo = emptyDot.parentElement.dataset.column;
  currentPlayerRowIndexTo = emptyDot.parentElement.dataset.row;

  gridCells[currentPlayerRowIndexFrom][currentPlayerColumnIndexFrom] = EMPTYCELL;
  gridCells[currentPlayerRowIndexTo][currentPlayerColumnIndexTo] = currentPlayersColor;

  updateCells();
}

function removeOtherChosenCounters (){
  var chosenCounters = document.getElementsByClassName(PLAYER_CHOSEN_CLASSNAME);
  if (chosenCounters.length === 0) {
    return; 
  }
  for (i = 0; i < chosenCounters.length; i++) {
    var counter = chosenCounters[i];
    counter.classList.remove(PLAYER_CHOSEN_CLASSNAME);
    console.log(chosenCounters[i]);
  }

}

function setActivePlayer(currentPlayerTurn) {

  var counters =   document.getElementsByClassName("grid-cell-counter");

  for (var i = 0; i < counters.length; i++) {
    var counter = counters[i];

    // var isPlayerOne = counter.classList.contains(PLAYER_1_RED_CLASSNAME);
    // var isPlayerTwo = counter.classList.contains(PLAYER_2_BLUE_CLASSNAME);
    var classToFind = (currentPlayerTurn === PLAYER_ONE) ? PLAYER_1_RED_CLASSNAME : PLAYER_2_BLUE_CLASSNAME;

    if (counter.classList.contains(classToFind)) {
      counter.addEventListener ("click", onClickCell);
      counter.classList.add (PLAYER_ACTIVE_CLASSNAME);
      console.log('added click to', classToFind);
    } else {
      counter.removeEventListener ("click", onClickCell);
      counter.classList.remove(PLAYER_ACTIVE_CLASSNAME);
      console.log('did NOT add click');
    }
  }
}


function createCell (grid, cell, columnIndex, rowIndex) {

  var gridCell = document.createElement("div");
  gridCell.className = "grid-cell";
  gridCell.dataset.column = columnIndex;
  gridCell.dataset.row = rowIndex;
  grid.appendChild(gridCell);

  var gridCellDot = document.createElement("div");
  gridCellDot.className = "grid-cell-dot";
  gridCell.appendChild(gridCellDot);

  var gridCellCounter = document.createElement("div");
  gridCellCounter.classList.add('grid-cell-counter');
  if (cell === RED_COUNTER) {
    gridCellCounter.classList.add(PLAYER_1_RED_CLASSNAME);
  } else if (cell === BLUE_COUNTER) {
    gridCellCounter.classList.add(PLAYER_2_BLUE_CLASSNAME);
  } else {
    gridCellDot.classList.add(EMPTY_CELL_CLASSNAME);
  }
  gridCell.appendChild(gridCellCounter);

  gridCellsDom[columnIndex][rowIndex] = gridCell;

}

function getPlayerTurn() {
  var turn = Math.random();
  if (turn < 0.5) {
    return PLAYER_ONE;
  }
  
  return PLAYER_TWO;
}




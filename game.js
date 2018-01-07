document.addEventListener("DOMContentLoaded", onContentLoaded);

const EMPTYCELL = 0;
const RED_COUNTER = 1;
const BLUE_COUNTER = 2;
const PLAYER_ONE = "Player 1";
const PLAYER_TWO = "Player 2";
const PLAYER_1_RED_CLASSNAME = "grid-cell-counter-red";
const PLAYER_2_BLUE_CLASSNAME = "grid-cell-counter-blue";

function onContentLoaded(event) {
  
  var columnCount = 4;
  var rowCount = 4;

  var gridCells = [
    [RED_COUNTER , RED_COUNTER, RED_COUNTER, RED_COUNTER],
    [RED_COUNTER, EMPTYCELL, EMPTYCELL, RED_COUNTER],
    [BLUE_COUNTER, EMPTYCELL, EMPTYCELL, BLUE_COUNTER],
    [BLUE_COUNTER, BLUE_COUNTER, BLUE_COUNTER, BLUE_COUNTER]
  ];

  var grid = document.getElementById("grid");

  for (i = 0; i < gridCells.length; i++){
    var line = gridCells[i];
    for ( j = 0; j < line.length; j++) {
      var cell = line[j];
      console.log(cell);
      createCell(grid, cell);
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


  var counters =   document.getElementsByClassName("grid-cell-counter");

  function onClickCell() {
    console.log ("Clicked", Math.random());
  }

  for (var i = 0; i < counters.length; i++) {
    var counter = counters[i];

    // var isPlayerOne = counter.classList.contains(PLAYER_1_RED_CLASSNAME);
    // var isPlayerTwo = counter.classList.contains(PLAYER_2_BLUE_CLASSNAME);
    var classToFind = (currentPlayerTurn === PLAYER_ONE) ? PLAYER_1_RED_CLASSNAME : PLAYER_2_BLUE_CLASSNAME;

    if (counter.classList.contains(classToFind)) {
      counter.addEventListener ("click", onClickCell, false);
      counter.classList.add ("grid-cell-counter-active");
      console.log('added click to', classToFind);
    } else {
      console.log('did NOT add click');
    }
  }
}


function createCell (grid, cell){

  var gridCell = document.createElement("div");
  gridCell.className = "grid-cell";
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
  }
  gridCell.appendChild(gridCellCounter);
}

function getPlayerTurn() {
  var turn = Math.random();
  if (turn < 0.5) {
    return PLAYER_ONE;
  }
  
  return PLAYER_TWO;
}




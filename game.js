document.addEventListener("DOMContentLoaded", onContentLoaded);

const EMPTYCELL = 0;
const RED_COUNTER = 1;
const BLUE_COUNTER = 2;

function onContentLoaded(event) {
  
  var columnCount = 4;
  var rowCount = 4;

  var gridCells = [
    [RED_COUNTER, RED_COUNTER, RED_COUNTER, RED_COUNTER],
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
    gridCellCounter.classList.add('grid-cell-counter-red');
  } else if (cell === BLUE_COUNTER) {
    gridCellCounter.classList.add('grid-cell-counter-blue');
  }
  gridCell.appendChild(gridCellCounter);
}




"use strict";
// CR: Way too many global vars.
// ME: where could i put all the vars instead of the global scope 
// cell varieable
var MINE = "💣";
var FLAG = "🎌";
var EMPTY = " ";

var gBoard;
var gLevel = {
  SIZE: 9,
  MINES: 2
};
var gTimeCounter;

var gBestScors = {
  currentLevel: "",
  begginer: 0,
  medium: 0,
  expert: 0
};

var begTime = Infinity;
var medTime = Infinity;
var expTime = Infinity;

var gId = 0;

var gMinesLocations;
var gFlagsCounter;
var gHintsCounter;
var gRevealdFloor;
var gIsFirstClick;
var gFirsClickedtCell;

var gIsHint;

var timeInterval;
var elSmiely;

function init(size, mines, level) {
  gBestScors.currentLevel = level;
  gLevel = {
    SIZE: size,
    MINES: mines
  };
  resetGame();
}

function resetGame() {


  //reset time
  var gElTime = document.querySelector(".time");
  gElTime.innerHTML = 0 + " Sec";
  clearInterval(timeInterval);
  //rest smiley
  elSmiely = document.querySelector(".smiley");
  elSmiely.innerHTML = "😉";
  //enable clicking on table
  var elTbody = document.querySelector("tbody");
  elTbody.style.pointerEvents = "auto";
  // display the hint buttons
  var elHintsButtns = document.querySelectorAll(".hint");
  elHintsButtns[0].classList.remove("remove");
  elHintsButtns[1].classList.remove("remove");
  elHintsButtns[2].classList.remove("remove");

  // id counter for cell obj
  gId = 0;
  gRevealdFloor = 0;
  gHintsCounter = 0;
  var elFlag = document.querySelector(".flags");
  gFlagsCounter = gLevel.MINES;
  elFlag.innerHTML = gLevel.MINES + " 🎌";
  gIsHint = false;
  gMinesLocations = [];
  gIsFirstClick = true;
  gBoard = creatBoard();
  renderBoard(gBoard);
}

function creatBoard() {
  var board = [];
  for (let i = 0; i < gLevel.SIZE; i++) {
    board.push([]);
    for (let j = 0; j < gLevel.SIZE; j++) {
      var cell = {
        id: ++gId,
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
        status: EMPTY,
        //for the expandshhwon
        expanded: false
      };
      board[i].push(cell);
    }
  }
  return board;
}

function renderBoard(board) {
  var strHtml = "";
  for (let i = 0; i < gLevel.SIZE; i++) {
    strHtml += `<tr>`;
    for (let j = 0; j < gLevel.SIZE; j++) {
      var item = board[i][j].status;
      var id = board[i][j].id;
      // allow us to show the cell on the first click
      if (
        !gIsFirstClick &&
        gFirsClickedtCell[0] === i &&
        gFirsClickedtCell[1] === j
      )
        strHtml += `<td  class="first"  onclick="cellClicked(this , ${i},${j})">${item}</td>`;
      else
        strHtml += `<td id="${id}" class="hide" onmousedown="cellMarked(this , event, ${i},${j})" onclick="cellClicked(this , ${i},${j})">${item}</td>`;
    }
    strHtml += `</tr>`;
  }
  var elBoard = document.querySelector(".board");
  elBoard.innerHTML = strHtml;
}

function cellClicked(elCell, i, j) {
  elSmiely.innerHTML = "😮";
  //on the first click
  if (gIsFirstClick && !gIsHint) {
    //place mine
    palceMine(i, j);
    //place on the floor how many negs every cell has
    placeNums(gBoard);
    //show the empty floor
    revealFloor(gBoard, elCell, i, j);
    gIsFirstClick = false;
    // render the bord only once , after setting the mines and nums (after the first click)
    renderBoard(gBoard);

    expandShown(gBoard, i, j);
    //start counting
    startCounting();
  } else {
    revealFloor(gBoard, elCell, i, j);
    //expand only on empty cell
    if (gBoard[i][j].status === EMPTY && !gIsHint) {
      expandShown(gBoard, i, j);
    }
  }
}

function startCounting() {
  gTimeCounter = 1;
  var gElTime = document.querySelector(".time");
  timeInterval = setInterval(() => {
    gElTime.innerHTML = gTimeCounter + " Sec";
    gTimeCounter++;
  }, 1000);
}

function displayAllMines() {
  for (let i = 0; i < gMinesLocations.length; i++) {
    var idxI = gMinesLocations[i].locI;
    var idxJ = gMinesLocations[i].locJ;
    var CellId = gBoard[idxI][idxJ].id;
    var elMinedCell = document.getElementById(`${CellId}`);

    elMinedCell.innerHTML = MINE;
    elMinedCell.classList.remove("hide");
    elMinedCell.style.textIndent = "0%";
    gBoard[idxI][idxJ].isShown = true;
    // set background to red
    var elCell = document.getElementById(`${gBoard[idxI][idxJ].id}`);
    elCell.classList.add("bomb");
  }
  elSmiely.innerHTML = "😈";
  gameOver();
}

function palceMine(idxI, idxJ) {
  // CR: Could have used a while loop instead.
  // CR: Also, could've used an array of empty spaces instead of going random and checking for empty ones
  for (let i = 0; i < gLevel.MINES; i++) {
    var locI = Math.floor(Math.random() * gLevel.SIZE);
    var locJ = Math.floor(Math.random() * gLevel.SIZE);
    // make sure to not set a mine on the first clicked cell
    if (
      gBoard[locI][locJ].status === EMPTY &&
      !(locI === idxI && locJ === idxJ)
    ) {
      //

      gBoard[locI][locJ].status = MINE;
      gBoard[locI][locJ].isMine = true;
      gMinesLocations.push({
        // TODO: instead of sending loc , send the id to the displaymine
        locI,
        locJ
      });
    } else {
      i--;
    }
  }
}

function placeNums(board) {
  for (let i = 0; i < gLevel.SIZE; i++) {
    for (let j = 0; j < gLevel.SIZE; j++) {
      if (board[i][j].isMine) continue;
      else {
        board[i][j].minesAroundCount = setMinesNegsCount(i, j, board);
        board[i][j].status = board[i][j].minesAroundCount;
      }
      if (board[i][j].minesAroundCount === 0) board[i][j].status = EMPTY;
    }
  }
}

// counts the numbers of mines for each cell
function setMinesNegsCount(cellI, cellJ, board) {
  var neighborsCount = 0;
  for (let i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gLevel.SIZE) continue;
    for (let j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= gLevel.SIZE) continue;
      if (board[i][j].status === MINE) {
        neighborsCount++;
      }
    }
  }
  return neighborsCount;
}

function cellMarked(elCell, event, i, j) {
  // if right mouse click
  if (
    event.button === 2 &&
    !gBoard[i][j].isShown &&
    !gBoard[i][j].isMarked &&
    !gIsFirstClick
  ) {
    //CR: Flags counter can go below 0
    if (!gBoard[i][j].isShown) gFlagsCounter--;
    gBoard[i][j].isMarked = true;
    elCell.innerHTML = FLAG;
    elCell.style.textIndent = "0%";
    //to remove an existing flag
  } else if (event.button === 2 && gBoard[i][j].isMarked) {
    gFlagsCounter++;
    gBoard[i][j].isMarked = false;
    elCell.style.textIndent = "-100%";
    setTimeout(() => {
      elCell.innerHTML = gBoard[i][j].status;
    }, 100);
  }

  var elFlag = document.querySelector(".flags");
  elFlag.innerHTML = gFlagsCounter + " 🎌";
  if (
    gRevealdFloor === gLevel.SIZE ** 2 - gLevel.MINES &&
    gFlagsCounter === 0
  ) {
    bestScore();
    gameOver("win");
  }
}

function revealFloor(board, elCell, i, j) {
  var cell = board[i][j];
  if (gIsHint) {
    // remove a hint button
    var elHintsButtns = document.querySelectorAll(".hint");
    if (!gIsFirstClick) elHintsButtns[gHintsCounter].classList.add("remove");
    gHintsCounter++;
    showHint(i, j);
    setTimeout(() => {
      gIsHint = false;
    }, 200);
  } else {
    //reveal only if unflaged
    if (!cell.isMarked) {
      if (gIsFirstClick) {
        //CR: remove leftover code
        // debugger

        console.log(elCell);

        // elCell.innerHTML = cell.status;
        // elCell.style.textIndent = "0%";
        gFirsClickedtCell = [i, j];
      }
      //if not mine
      if (!cell.isMine) {
        elSmiely.innerHTML = "😄";
        //if marked cell clicked => display the original content
        if (cell.isMarked) {
          gFlagsCounter++;
          cell.status = cell.minesAroundCount;
          elCell.innerHTML =
            cell.minesAroundCount !== 0 ? cell.minesAroundCount : "";
        }
        if (!gIsHint && !cell.isShown) gRevealdFloor++;
        cell.isShown = true;

        elCell.classList.remove("hide");
        elCell.style.textIndent = "0%";
        //if mine
      } else {
        displayAllMines();
      }
    }
  }
  if (
    gRevealdFloor === gLevel.SIZE ** 2 - gLevel.MINES &&
    gFlagsCounter === 0
  ) {
    bestScore();
    gameOver("win");
  }
}
//display for one second
function displayFloorHints(elCell, i, j) {
  elCell.classList.remove("hide");
  elCell.style.textIndent = "0%";
  setTimeout(() => {
    if (!gBoard[i][j].isShown) elCell.classList.add("hide");
    elCell.style.textIndent = "-100%";
    //display the flag on the marked cell as before the hint
    if (gBoard[i][j].isMarked) {
      elCell.innerHTML = "🎌";
      elCell.style.textIndent = "0%";
    }
  }, 1000);

  setTimeout(() => {
    gIsHint = false;
  }, 1100);
}

function showHint(idxI, idxJ) {
  // indicate to reveal floor that its a hint
  gIsHint = true;
  if (gIsFirstClick) return;
  for (let i = idxI - 1; i <= idxI + 1; i++) {
    if (i < 0 || i >= gLevel.SIZE) continue;
    for (let j = idxJ - 1; j <= idxJ + 1; j++) {
      if (j < 0 || j >= gLevel.SIZE) continue;
      if (gBoard[i][j].isShown === false) {
        // gBoard[i][j].isShown = true;
        var id = gBoard[i][j].id;
        var elCell = document.getElementById(`${id}`);
        // make sure to display cell content if it was marked
        if (gBoard[i][j].isMarked) {
          elCell.innerHTML = gBoard[i][j].status;
          displayFloorHints(elCell, i, j);
        } else displayFloorHints(elCell, i, j);
      }
    }
  }
}

//TODO: check if expanded realy needs to be
function expandShown(board, cellI, cellJ) {
  //CR: since you are not checking if the status is empty at the beginning, you are expanding on first click even if the cell is not empty
  if (gIsHint) return;

  for (let i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gLevel.SIZE) continue;
    for (let j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue;
      if (j < 0 || j >= gLevel.SIZE) continue;
      if (board[i][j].isShown || board[i][j].expanded) continue;
      if (board[i][j].status === MINE || board[i][j].isMarked) continue;

      board[i][j].isShown = true;
      var elCell = document.getElementById(`${board[i][j].id}`);
      elCell.classList.remove("hide");
      elCell.style.textIndent = "0%";
      board[cellI][cellJ].expanded = true;

      if (board[i][j].status === EMPTY) expandShown(board, i, j);

      if (!gIsHint) gRevealdFloor++;
    }
  }
}

function gameOver(state) {
  if (state === "win") {
    elSmiely.innerHTML = "😎";
    console.log("won!!!!!!!!");
  } else console.log("you lost");
  clearInterval(timeInterval);
  var elTbody = document.querySelector("tbody");
  elTbody.style.pointerEvents = "none";
}

function bestScore() {
  //CR: You are saving it to the localStorage, but don't use it to display best scores.
  console.log(gBestScors.currentLevel);
  var time = gTimeCounter - 1;
  var elBegTime = document.querySelector(".begTime");
  var elMedTime = document.querySelector(".medTime");
  var elExpTime = document.querySelector(".expTime");
  switch (gBestScors.currentLevel) {
    case "begginer":
      begTime = begTime < time ? begTime : time;
      localStorage.setItem("begginer", begTime);
      elBegTime.innerHTML = begTime + " sec";
      break;
    case "medium":
      medTime = medTime < time ? medTime : time;
      localStorage.setItem("medium", medTime);
      elMedTime.innerHTML = medTime + " sec";
      break;
    case "expert":
      expTime = expTime < time ? expTime : time;
      localStorage.setItem("expert", expTime);
      elExpTime.innerHTML = expTime + " sec";
      break;
  }
}
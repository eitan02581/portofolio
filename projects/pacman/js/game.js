"use strict";
var WALL = "🌵";
var FOOD = "🍊";
var SUPERFOOD = "🍺";
var CHERRY = "🍒";
var EMPTY = " ";

var cherryInterval;

var elModal;
var elWin;
var elLost
var gFoodCounter = 0;
var gCountClearFloor = 0;

var gBoard;
var gGame = {
  score: 0,
  isOn: false
};

function init() {
  elModal = document.querySelector(".modal");
  elModal.classList.add("hide");

  elWin = document.querySelector(".modal h1");
  elWin.classList.add("hide");

  elLost = document.querySelector(".modal h2");
  elLost.classList.add("hide");

  gCountClearFloor = 0;
  gFoodCounter = 0;
  gGame.score = 0;
  gEmptys = [];
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, ".board-container");
  gGame.isOn = true;
  addCherry();
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      //location to build a wall
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) board[i][j] = WALL;

      //location to superfood
      if ((i === 1 && j === 1) || (i === 8 && j === 8) ||
        (i === 1 && j === 8) || (i === 8 && j === 1)) {
        board[i][j] = SUPERFOOD;
        gFoodCounter++
      }

      if (board[i][j] === FOOD) gFoodCounter++;
    }
  }
  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  console.log(gCountClearFloor);
  //when all 60 floors are empty , the user win 
  if (gCountClearFloor === 60) {
    elWin.classList.remove("hide");
    gameOver();
  }
  document.querySelector("header h3 span").innerText = gGame.score;
}

function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = "cell cell" + i + "-" + j;
      strHTML += '<td class="' + className + '"> ' + cell + " </td>";
    }
    strHTML += "</tr>";
  }
  strHTML += "</tbody></table>";
  var elContainer = document.querySelector(selector);

  elContainer.innerHTML = strHTML;
}

function addCherry() {
  cherryInterval = setInterval(() => {
    var randomLocation = Math.floor(Math.random() * (gEmptys.length - 2) + 1);
    if (gEmptys.length !== 0) {
      gBoard[gEmptys[randomLocation].i][gEmptys[randomLocation].j] = CHERRY;
      renderCell(gEmptys[randomLocation], CHERRY);
    }
  }, 15000);
}

function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function gameOver() {
  // show that you lost ,if you didnt clear the floor from food 
  if (gCountClearFloor < 60) {
    elLost.classList.remove("hide");
  }
  document.querySelector("header h3 span").innerText = 0;
  elModal.classList.remove("hide");
  console.log("Game Over");
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  clearInterval(cherryInterval);
  gIntervalGhosts = 0;
  gCountClearFloor = 0;

}
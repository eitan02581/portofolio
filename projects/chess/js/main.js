"use strict";

// Pieces Types
var KING_WHITE = "♔";
var QUEEN_WHITE = "♕";
var ROOK_WHITE = "♖";
var BISHOP_WHITE = "♗";
var KNIGHT_WHITE = "♘";
var PAWN_WHITE = "♙";
var KING_BLACK = "♚";
var QUEEN_BLACK = "♛";
var ROOK_BLACK = "♜";
var BISHOP_BLACK = "♝";
var KNIGHT_BLACK = "♞";
var PAWN_BLACK = "♟";

// The Chess Board
var gBoard;
var gSelectedElCell = null;

function restartGame() {
  gBoard = buildBoard();
  renderBoard(gBoard);
}

function buildBoard() {
  var board = [];
  for (var i = 0; i < 8; i++) {
    board[i] = [];
    for (var j = 0; j < 8; j++) {
      var piece = "";
      if (i === 1) piece = PAWN_BLACK;
      if (i === 6) piece = PAWN_WHITE;
      board[i][j] = piece;
    }
  }

  board[0][0] = board[0][7] = ROOK_BLACK;
  board[0][1] = board[0][6] = KNIGHT_BLACK;
  board[0][2] = board[0][5] = BISHOP_BLACK;
  board[0][3] = QUEEN_BLACK;
  board[0][4] = KING_BLACK;

  board[7][0] = board[7][7] = ROOK_WHITE;
  board[7][1] = board[7][6] = KNIGHT_WHITE;
  board[7][2] = board[7][5] = BISHOP_WHITE;
  board[7][3] = QUEEN_WHITE;
  board[7][4] = KING_WHITE;

  board[4][3] = KNIGHT_BLACK;

  // TODO: build the board 8 * 8
  console.table(board);
  return board;
}

function renderBoard(board) {
  var strHtml = "";
  for (var i = 0; i < board.length; i++) {
    var row = board[i];
    strHtml += "<tr>";
    for (var j = 0; j < row.length; j++) {
      var cell = row[j];
      // TODO: figure class name
      var className = (i + j) % 2 === 0 ? "white" : "black";
      var tdId = `cell-${i}-${j}`;

      strHtml += `<td id="${tdId}" class="${className}" onclick="cellClicked(this)">
                            ${cell}
                        </td>`;
    }
    strHtml += "</tr>";
  }
  var elMat = document.querySelector(".game-board");
  elMat.innerHTML = strHtml;
}

function cellClicked(elCell) {
  // TODO: if the target is marked - move the piece!
  if (elCell.classList.contains("mark")) {
    console.log("AHA");
    movePiece(gSelectedElCell, elCell);
    cleanBoard();
    return;
  }

  cleanBoard();

  elCell.classList.add("selected");
  gSelectedElCell = elCell;

  // console.log('elCell.id: ', elCell.id);
  var cellCoord = getCellCoord(elCell.id);
  var piece = gBoard[cellCoord.i][cellCoord.j];

  var possibleCoords = [];
  switch (piece) {
    case ROOK_BLACK:
    case ROOK_WHITE:
      possibleCoords = getAllPossibleCoordsRook(cellCoord);
      break;
    case BISHOP_BLACK:
    case BISHOP_WHITE:
      possibleCoords = getAllPossibleCoordsBishop(cellCoord);
      break;
    case KNIGHT_BLACK:
    case KNIGHT_WHITE:
      possibleCoords = getAllPossibleCoordsKnight(cellCoord);
      break;
    case PAWN_BLACK:
    case PAWN_WHITE:
      possibleCoords = getAllPossibleCoordsPawn(
        cellCoord,
        piece === PAWN_WHITE
      );
      break;
    case KING_BLACK:
    case KING_WHITE:
      possibleCoords = getAllPossibleCoordsKing(cellCoord);
      break;
    case QUEEN_BLACK:
    case QUEEN_WHITE:
      possibleCoords = getAllPossibleCoordsQueen(cellCoord);
      break;
  }
  markCells(possibleCoords);
}

function movePiece(elFromCell, elToCell) {
  var fromCoord = getCellCoord(elFromCell.id);
  var toCoord = getCellCoord(elToCell.id);

  // update the MODEl
  var piece = gBoard[fromCoord.i][fromCoord.j];
  gBoard[fromCoord.i][fromCoord.j] = "";
  gBoard[toCoord.i][toCoord.j] = piece;
  // update the DOM
  elFromCell.innerText = "";
  elToCell.innerText = piece;
}

function markCells(coords) {
  for (var i = 0; i < coords.length; i++) {
    var coord = coords[i];
    var elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`);
    elCell.classList.add("mark");
  }

  // TODO: query select them one by one and add mark
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
  var coord = {};
  coord.i = +strCellId.substring(5, strCellId.lastIndexOf("-"));
  coord.j = +strCellId.substring(strCellId.lastIndexOf("-") + 1);
  // console.log('coord', coord);
  return coord;
}

function cleanBoard() {
  var elTds = document.querySelectorAll(".mark, .selected");
  for (var i = 0; i < elTds.length; i++) {
    elTds[i].classList.remove("mark", "selected");
  }
}

function getSelector(coord) {
  return "#cell-" + coord.i + "-" + coord.j;
}

function isEmptyCell(coord) {
  console.log(coord);

  return gBoard[coord.i][coord.j] === "";
}

function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
  var res = [];

  var diff = isWhite ? -1 : 1;
  var nextCoord = {
    i: pieceCoord.i + diff,
    j: pieceCoord.j
  };
  if (isEmptyCell(nextCoord)) res.push(nextCoord);
  else return res;

  if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
    diff *= 2;
    nextCoord = {
      i: pieceCoord.i + diff,
      j: pieceCoord.j
    };
    if (isEmptyCell(nextCoord)) res.push(nextCoord);
  }
  return res;
}

function getAllPossibleCoordsRook(pieceCoord) {
  var res = [];
  //up
  var i = pieceCoord.i - 1;
  for (var idx = pieceCoord.j; i >= 0 && idx < 8; i--) {
    var coord = { i: i, j: idx };
    if (!isEmptyCell(coord)) break;
    res.push(coord);
  }
  // down
  i = pieceCoord.i + 1;
  for (var idx = pieceCoord.j; i <= 7 && idx >= 0; i++) {
    var coord = { i: i, j: idx };
    if (!isEmptyCell(coord)) break;
    res.push(coord);
  }
  // left
  i = pieceCoord.i;
  for (var idx = pieceCoord.j - 1; i >= 0 && idx >= 0; idx--) {
    var coord = { i: i, j: idx };
    if (!isEmptyCell(coord)) break;
    res.push(coord);
  }
  // right
  i = pieceCoord.i;
  for (var idx = pieceCoord.j + 1; i >= 0 && idx <= 7; idx++) {
    var coord = { i: i, j: idx };
    if (!isEmptyCell(coord)) break;
    res.push(coord);
  }
  return res;
}

function getAllPossibleCoordsBishop(pieceCoord) {
  var res = [];
  //up right
  var i = pieceCoord.i - 1;
  for (var idx = pieceCoord.j + 1; i >= 0 && idx < 8; idx++) {
    var coord = { i: i--, j: idx };
    if (!isEmptyCell(coord)) break;
    res.push(coord);
  }
  //up left
  i = pieceCoord.i - 1;
  for (var idx = pieceCoord.j - 1; i >= 0 && idx >= 0; idx--) {
    var coord = { i: i--, j: idx };
    if (!isEmptyCell(coord)) break;
    res.push(coord);
  }
  //down left
  i = pieceCoord.i + 1;
  for (var idx = pieceCoord.j - 1; i <= 7 && idx >= 0; idx--) {
    var coord = { i: i++, j: idx };
    if (!isEmptyCell(coord)) break;
    res.push(coord);
  }
  //down right
  i = pieceCoord.i + 1;
  for (var idx = pieceCoord.j + 1; i <= 7 && idx < 8; idx++) {
    var coord = { i: i++, j: idx };
    if (!isEmptyCell(coord)) break;
    res.push(coord);
  }
  return res;
}

function getAllPossibleCoordsKnight(pieceCoord) {
  var res = [];
  var i = pieceCoord.i;
  var idx = pieceCoord.j;
  //up left
  var coord = { i: i - 2, j: idx + 1 };
  if (i > 1 && idx > 0) if (isEmptyCell(coord)) res.push(coord);
  //up right
  coord = { i: i - 2, j: idx - 1 };
  if (i > 1 && idx < 7) if (isEmptyCell(coord)) res.push(coord);

  //down rigth
  coord = { i: i + 2, j: idx + 1 };
  if (i < 6 && idx < 7) if (isEmptyCell(coord)) res.push(coord);

  //down left
  coord = { i: i + 2, j: idx - 1 };
  if (i < 6 && idx > 0) if (isEmptyCell(coord)) res.push(coord);

  //right up
  coord = { i: i - 1, j: idx + 2 };
  if (i > 0 && idx < 6) if (isEmptyCell(coord)) res.push(coord);

  //right down
  coord = { i: i + 1, j: idx + 2 };
  if (i < 7 && idx < 6) if (isEmptyCell(coord)) res.push(coord);
  //left up
  coord = { i: i - 1, j: idx - 2 };
  if (i > 0 && idx > 1) if (isEmptyCell(coord)) res.push(coord);
  //left down
  coord = { i: i + 1, j: idx - 2 };
  if (i < 7 && idx > 1) if (isEmptyCell(coord)) res.push(coord);
  return res;
}

function getAllPossibleCoordsKing(pieceCoord) {
  var res = [];
  var iRadius = 1;
  var jRadius = 1;
  if (pieceCoord.i === 0) iRadius = 0;
  if (pieceCoord.j === 0) jRadius = 0;
  for (
    let i = pieceCoord.i - iRadius;
    i < pieceCoord.i + 2 && i <= 7 && i >= 0;
    i++
  ) {
    for (
      let j = pieceCoord.j - jRadius;
      j < pieceCoord.j + 2 && j <= 7 && j >= 0;
      j++
    ) {
      var coord = {
        i: i,
        j: j
      };
      if (isEmptyCell(coord)) res.push(coord);
    }
  }
  return res;
}

function getAllPossibleCoordsQueen(pieceCoord) {
  var res = [];
  res.push(...getAllPossibleCoordsRook(pieceCoord));
  res.push(...getAllPossibleCoordsBishop(pieceCoord));
  return res;
}

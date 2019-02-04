"use strict";

var gDigits = [];
var gClickedButtns = [];
var size;
var elTime;
var elWinHeading;
var elChoosSizeHeading;
var elNextNum;
var gTime;

function init() {
  elTime = document.querySelector(".time");
  size = 25;
}

function fillArr(arr, size) {
  for (let i = 1; i < size + 1; i++) {
    arr.push(i);
  }
}

function shuffle(arr) {
  var j, x, i;
  for (i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
}

function setSize(numsAmount) {
  elChoosSizeHeading = document.querySelector("h2");
  elChoosSizeHeading.classList.add("hidden");
  elWinHeading = document.querySelector("h1");
  elWinHeading.classList.add("hidden");
  elWinHeading.innerText = "YOU WON!!! at " + elTime.innerHTML + "sec";
  size = numsAmount;
  reset();
}

function renderNums() {
  //set the image to the question
  var strHTML = "";
  var Limit = Math.sqrt(size);
  for (var i = 0; i < Limit; i++) {
    strHTML += "<tr>";
    for (let j = 0; j < Limit; j++) {
      var number = gDigits.pop();
      strHTML += `<td onclick="cellClicked(${number},this)">
                              ${number}
                        </td>`;
    }
    strHTML += "</tr>";
  }
  var elBoard = document.querySelector(".board");
  elBoard.innerHTML = strHTML;
}

function cellClicked(num, elBtn) {
  var counter = 0;
  elNextNum = document.querySelector("h3");
  elWinHeading = document.querySelector("h1");
  if (num === 1) {
    gTime = setInterval(() => {
      counter++;
      elTime.innerHTML = "time: " + (counter / 100).toFixed(3);
    }, 10);
  }
  // push the next num and mark him
  if (gClickedButtns.length + 1 === num) {
    elNextNum.innerText = `next num: ${num + 1}`;
    elBtn.classList.toggle("clicked");
    gClickedButtns.push(num);
  }
  // if win
  if (gClickedButtns.length === size) {
    elWinHeading.classList.remove("hidden");
    elWinHeading.innerText = "YOU WON!!! at " + elTime.innerHTML + "sec";
    reset();
  }
}

function reset() {
  elNextNum = document.querySelector("h3");
  elNextNum.innerText = "";
  elTime.innerHTML = "time:";
  clearInterval(gTime);
  gTime = 0;
  gClickedButtns = [];
  fillArr(gDigits, size);
  shuffle(gDigits);
  renderNums();
}

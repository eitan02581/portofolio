var gPacman;
var PACMAN = '&#9786;';
var gAteSuperFood = false
var gEmptys = []

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  var nextLocation = getNextLocation(eventKeyboard);

  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  //if pacman ate superfood and is trying to eat another superfood => return 
  if (gAteSuperFood && nextCell === SUPERFOOD) return

  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    //when floor get empty
    gCountClearFloor++
    updateScore(1);
  }
  if (nextCell === CHERRY) updateScore(10);

  if (nextCell === SUPERFOOD) {
    gCountClearFloor++
    // change ghosts color
    updateScore(1)
    gAteSuperFood = true
    setTimeout(() => {
      gAteSuperFood = false;
    }, 5000)
  }

  // remove ghost from ghosts array when pacman ate superfood
  if (nextCell === GHOST && gAteSuperFood) {
    for (let i = 0; i < gGhosts.length; i++) {
      if (nextLocation.i === gGhosts[i].location.i && nextLocation.j === gGhosts[i].location.j) {
        //if ghost is on food , 
        if (gGhosts[i].onFood === true) gCountClearFloor++
        
        gGhosts.splice(i, 1)

      }
    }
    //pacman is normal and try to eat a ghost => pacman is dead
  } else if (nextCell === GHOST && !gAteSuperFood) {
    gameOver()
    renderCell(gPacman.location, EMPTY);
    return;
  }
  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update   the DOM
  renderCell(gPacman.location, EMPTY);
  gEmptys.push(gPacman.location)


  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      PACMAN = '👆';
      nextLocation.i--;
      break;
    case 'ArrowDown':
      PACMAN = '👇 ';
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      PACMAN = '👈';
      nextLocation.j--;
      break;
    case 'ArrowRight':
      PACMAN = '👉';

      nextLocation.j++;
      break;
    default:
      return null;
  }
  return nextLocation;
}
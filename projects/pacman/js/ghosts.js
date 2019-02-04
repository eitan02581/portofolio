var GHOST = `&#9781`;
var gIntervalGhosts;
var gGhosts;
var idCounter = 0

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: getRandomColor(),
        // true when ghost stand on food 
        onFood: false
    };
    gGhosts.push(ghost);
    // debugger
    board[ghost.location.i][ghost.location.j] = GHOST;
}

function createGhosts(board) {
    // Empty the gGhosts array, create some ghosts
    gGhosts = [];

    createGhost(board)
    createGhost(board)

    // Run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];

        // Create the moveDiff
        var moveDiff = getMoveDiff();
        // console.log('moveDiff', moveDiff);
        var nextLocation = {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j,
        }

        var nextCell = gBoard[nextLocation.i][nextLocation.j]
        if (gAteSuperFood) {
            ghost.color = 'blue';
            setTimeout(() => {
                for (let i = 0; i < gGhosts.length; i++) {
                    gGhosts[i].color = getRandomColor();
                }
            }, 5000)
        };
        // If GHOST return
        if (nextCell === GHOST) {
            return;
        }
        // If WALL return
        if (nextCell === WALL) {
            return;
        }
        // DETECT gameOver
        if (nextCell === PACMAN && !gAteSuperFood) {
            gameOver();
        }

        if (nextCell === FOOD) ghost.onFood = true;
        else ghost.onFood = false
        // console.log(ghost.onFood);





        // Set back what we stepped on
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
        renderCell(ghost.location, ghost.currCellContent);

        // Move the ghost MODEL
        ghost.currCellContent = nextCell;
        ghost.location = nextLocation
        gBoard[ghost.location.i][ghost.location.j] = GHOST;

        // Updade the DOM 
        renderCell(ghost.location, getGhostHTML(ghost))
    }
}

// There are 4 options where to go
function getMoveDiff() {
    // return { i: getRandomIntInclusive(-1, 1), j: getRandomIntInclusive(-1, 1) }
    var opts = [{
        i: 0,
        j: 1
    }, {
        i: 1,
        j: 0
    }, {
        i: -1,
        j: 0
    }, {
        i: 0,
        j: -1
    }];
    return opts[getRandomIntInclusive(0, opts.length - 1)];
}

function getGhostHTML(ghost) {
    return `<span style="color:${ghost.color}">${GHOST}</span>`
}
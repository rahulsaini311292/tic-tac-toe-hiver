/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
*
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {


    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");

    // condition to ensure that the box being clicked on is empty
    if(grid[colIdx][rowIdx] == 0){
        let newValue = 1;

        grid[colIdx][rowIdx] = newValue;
        checkcheckGameStatus();
        if(checkGameStatus){
            botTurn(2);
        }

        renderMainGrid();
        addClickHandlers();
    }


}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}



// Mycode starts

var checkGameStatus = true;

$(document).ready(function(){
    $('.playerChoice').show()
    $('.parentTop').hide()
    $('.winnerMsg').hide()
    $('.tieMsg').hide()
    $('.loserMsg').hide()

})

function showGameBoard(choice){
    $('.playerChoice').hide()
    $('.parentTop').show()


     if(choice==1){
       console.log('players turn')
    }
//    if inputis 0 = bot will start first
    else{
        botTurn(2)
        renderMainGrid();
        addClickHandlers();
    }
}


function botTurn(value){
    var box = getEmptyBox()

    if(box != null){
        grid[box.colIdx][box.rowIdx] = value;
//        console.log(grid)
    }else{
        showWinner('tie')
    }
    if(checkGameStatus){
        checkcheckGameStatus();
    }

}

// get best  possible box
function getEmptyBox(){

    var box = {}

    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
            for (var rowIdx = 0; rowIdx < GRID_LENGTH;rowIdx++) {
               if(grid[colIdx][rowIdx] == 0){
                    box.colIdx = colIdx;
                    box.rowIdx = rowIdx;
                    return box;
               }
            }

        }

    return null;

}

function checkcheckGameStatus(){

    var winner = checkWinner();

    if(winner){
        checkGameStatus = false;
        showWinner(winner)
    }

}


// winning patten
function checkWinner(){

/* winning combo */
//(0, 1, 2)
//(3, 4, 5)
//(6, 7, 8)
//(0, 3, 6)
//(1, 4, 7)
//(2, 5, 8)
//(0, 4, 8) D
//(2, 4, 6) D

// X == 1 sum of three X = 3
// O == 2 sum of three O = 6


//Row
   if(
        (grid[0].indexOf(2) == -1 && grid[0][0]+grid[0][1]+grid[0][2] == 3) ||
        (grid[1].indexOf(2) == -1 && grid[1][0]+grid[1][1]+grid[1][2] == 3) ||
        (grid[2].indexOf(2) == -1 && grid[2][0]+grid[2][1]+grid[2][2] == 3)
    ){
        return 'player'
   }else if(
        (grid[0].indexOf(1) == -1 && grid[0][0]+grid[0][1]+grid[0][2] == 6) ||
        (grid[1].indexOf(1) == -1 && grid[1][0]+grid[1][1]+grid[1][2] == 6) ||
        (grid[2].indexOf(1) == -1 && grid[2][0]+grid[2][1]+grid[2][2] == 6)

    ){
        return 'bot'
   }

// column
   if(

        (grid[0][0] != 2 && grid[1][0] != 2 && grid[2][0] != 2) && (grid[0][0]+grid[1][0]+grid[2][0] == 3) ||
        (grid[0][1] != 2 && grid[1][1] != 2 && grid[2][1] != 2) && (grid[0][1]+grid[1][1]+grid[2][1] == 3) ||
        (grid[0][2] != 2 && grid[1][2] != 2 && grid[2][2] != 2) && (grid[0][2]+grid[1][2]+grid[2][2] == 3)

    ){
        return 'player'
   }else if(

        (grid[0][0] != 1 && grid[1][0] != 1 && grid[2][0] != 1) && (grid[0][0]+grid[1][0]+grid[2][0] == 6) ||
        (grid[0][1] != 1 && grid[1][1] != 1 && grid[2][1] != 1) && (grid[0][1]+grid[1][1]+grid[2][1] == 6) ||
        (grid[0][2] != 1 && grid[1][2] != 1 && grid[2][2] != 1) && (grid[0][2]+grid[1][2]+grid[2][2] == 6)

    ){
         return 'bot'
   }

//   diagonal

   if(
        (grid[0][0] != 2 && grid[1][1] != 2 && grid[2][2] != 2) && (grid[0][0]+grid[1][1]+grid[2][2] == 3) ||
        (grid[0][2] != 2 && grid[1][1] != 2 && grid[2][0] != 2) && (grid[0][2]+grid[1][1]+grid[2][0] == 3)

    ){
         return 'player'
   }else if(
        (grid[0][0] != 1 && grid[1][1] != 1 && grid[2][2] != 1) && (grid[0][0]+grid[1][1]+grid[2][2] == 6) ||
        (grid[0][2] != 1 && grid[1][1] != 1 && grid[2][0] != 1) && (grid[0][2]+grid[1][1]+grid[2][0] == 6)
    ){
         return 'bot'
   }

   return null;

}

function showWinner(winner){

    if (winner == 'player'){
        $('.winnerMsg').show()
    }
    else if(winner=='bot'){
        $('.loserMsg').show()
    }
    else{
        $('.tieMsg').show()
    }
}


initializeGrid();
renderMainGrid();
addClickHandlers();


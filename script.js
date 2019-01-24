var origBoard;
let player = "";
const comp = "O";
const win = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
const box = document.querySelectorAll('.cell');
let move = 0;

alert("Please choose your icon before start.");

function setFig(id) {
    if (id === 'x'){
        player = "X";
    }
    else if(id === 'o'){
        player = "O"
    }
    startNewGame();
}

function startNewGame(){
    move = 0;
    origBoard = Array.from(Array(9).keys());
    for(let i = 0; i < box.length; i++){

        let item = box[i];
        // when restart game the board go empty
        item.innerText = '';
        item.style.removeProperty('background-color');
        item.addEventListener('click', clicked, false);
    }
    
}

function clicked(boxes){
    next(boxes.target.id, player);
}

function next(boxesId, play){
    origBoard[boxesId] = play;
    let emptyBox = document.getElementById(boxesId);

    if(emptyBox.innerText != ""){
        alert("This box has been taken.");
        return;
    }
    emptyBox.innerText = play;
    console.log(play);
    player = player === "X" ? "O" : "X";
    emptyBox.style.color = player === "X" ?  "blue" : "red";
    let gameWin = condWin(origBoard, play);
    if (gameWin) gameOver(gameWin);
}

// Condition Win
function condWin(board, play){
    move += 1;
    console.log(move);
    
    let plays = board.reduce((a,e,i) => 
    (e === play) ? a.concat(i) : a, []);
    let gameWin = null;
    for(let [index, winSituation] of win.entries()){
        if(winSituation.every(elem => plays.indexOf(elem) > -1)){
            gameWin = {index: index, play: play};
            alert("Player " + play + " You Win!");
            break;
        }
        else if(move == 9 && !(winSituation.every(elem => plays.indexOf(elem) > -1)) || (winSituation.every(elem => plays.indexOf(elem) > -1)) )
        {
          drawCheck();
          for(let i = 0; i < box.length; i++){
            let item = box[i];
            item.removeEventListener('click', clicked, false);
            }
          break;
        }
    }
    return gameWin;
}

// gameOver
function gameOver(gameWin){
    for(let index of win[gameWin.index]){
        document.getElementById(index).style.backgroundColor =
        gameWin.play == player ? "red" : "grey";
    }
    for(let i = 0; i < box.length; i++){

        let item = box[i];
        item.removeEventListener('click', clicked, false);
    }
}

// Draw game
function drawCheck(){
    alert("Draw") 
}

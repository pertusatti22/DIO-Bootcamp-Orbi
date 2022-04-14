
let player, winner = null;
let selectPlayer = document.getElementById("player");
let selectWinner = document.getElementById("winner");
let pointX = document.getElementById('pointX');
let pointO = document.getElementById('pointO');
let pointOld = document.getElementById('pointOld');
let squares = document.getElementsByClassName('square');
let scoreboardX = 0;
let scoreboardO = 0;
let scoreboardOld = 0;

changePlayer('X');

function selectSquare(id) {

    if (winner !== null) {
        return;
    }

    let square = document.getElementById(id);

    if(square.innerHTML !== '-') {
        return;
    }

    square.innerHTML = player;
    square.style.color = '#000';

    if (player === 'X') {
        player = 'O';
    } else {
        player = 'X';
    }    
    changePlayer(player);
    winnerList();
}

function changePlayer(val) {
    player = val;
    selectPlayer.innerHTML = player;
}

function winnerList() {
    const sq0 = document.getElementById(0);
    const sq1 = document.getElementById(1);
    const sq2 = document.getElementById(2);
    const sq3 = document.getElementById(3);
    const sq4 = document.getElementById(4);
    const sq5 = document.getElementById(5);
    const sq6 = document.getElementById(6);
    const sq7 = document.getElementById(7);
    const sq8 = document.getElementById(8);
    
    theWinner(sq0, sq1, sq2)
    theWinner(sq3, sq4, sq5)
    theWinner(sq6, sq7, sq8)
    theWinner(sq0, sq3, sq6)
    theWinner(sq1, sq4, sq7)
    theWinner(sq2, sq5, sq8)
    theWinner(sq0, sq4, sq8)
    theWinner(sq2, sq4, sq6)

    checkOld(squares)
} 

function winnerChange(sq) {
    winner = sq.innerHTML;
    selectWinner.innerHTML = winner;
    if(winner === 'X') {
        scoreboardX ++;
        pointX.innerHTML = scoreboardX;
    } else if(winner === 'O') {
        scoreboardO ++;
        pointO.innerHTML = scoreboardO;
    }
}

function theWinner(sqa, sqb, sqc) {
    if(winnerCheck(sqa, sqb, sqc)) {
        changeColor(sqa, sqb, sqc)
        winnerChange(sqa);
        return;
    }
}

function winnerCheck(sqa, sqb, sqc) {
    let equal = false;
    if(sqa.innerHTML !== "-" && sqa.innerHTML === sqb.innerHTML && sqb.innerHTML === sqc.innerHTML) {
        equal = true;
    }
    return equal;
}

function changeColor(sq0, sq1, sq2) {
    sq0.style.background = '#0f0';
    sq1.style.background = '#0f0';
    sq2.style.background = '#0f0';
}

function newGame() {
    winner = null;
    selectWinner.innerHTML = '';

    for(var i = 0; i <= 8; i++) {
        squares[i].innerHTML = '-';
        squares[i].style.background = '#eee';
        squares[i].style.color = '#eee';
    }
}

function checkOld(squares) {
    let old = 0;
    for(var i = 0; i <= 8; i++) {
        if(squares[i].innerHTML !== '-') {
            old ++;
        }
    }
    if(squares.innerHTML !== '-' && old === 9){
        winnerChange('');
        alert("Deu Velha!!!");
        scoreboardOld ++;
        pointOld.innerHTML = scoreboardOld;
        newGame();
    }
    
}

function emptyScoreboard() {
    pointX.innerHTML = 0;
    scoreboardX = 0;
    pointO.innerHTML = 0;
    scoreboardO = 0;
    pointOld.innerHTML = 0;
    scoreboardOld = 0;
}
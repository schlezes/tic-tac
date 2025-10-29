//  every thing works up to here
//  remove function inside if statement
//  this is event listener
//  try for loop - > works

/*global
    window
*/

//  gets the front side card id
//  store the x or o on the backside
//  flip the card to show backside
//  updates the rowCell position with no to block additonal clicks
//  sets the idx

var f = ""; // has to be integer 1 - > 9

var xo = "";

// make array of 9 yes no vallues
// have to be alternate values otherwise
// 3 emptys will generate bogus winner
var row1Cells = [];

var fillCells = function () {
    "use strict";
    var i = 0;
    for (i = 0; i <= 8; i = i + 1) {
        row1Cells.push("ok" + i); // < - each cell has to be unique
    }
};
fillCells();
var j;
//flip to the backside on click event
function showXO() {
    "use strict";
    console.log(f);
    j = f;
    console.log(j);
    var xSide = document.getElementsByClassName("tvert")[j - 1];
    xSide.textContent = xo;
    var frontSide = document.getElementsByClassName("front")[j - 1];
    frontSide.style.transform = "perspective(600px) rotateY(180deg)";
    var backSide = document.getElementsByClassName("back")[j - 1];
    backSide.style.transform = "perspective(600px) rotateY(0deg)";
}
var count = 0;
var tt;

function theEnd() {
    "use script";
    var chg = document.getElementById("table");
    chg.innerHTML = "";
    tt = setInterval(function () {
        count = count + 1;
        if (chg.innerHTML === "") {
            chg.style.backgroundColor = "#ffffff";
            chg.innerHTML = "<h1>game over</h1>";
        } else {
            chg.innerHTML = "";
        }
        if (count > 4) {
            clearInterval(tt);
            location.reload();
        }
    }, 350);
}
// check y rows 3 down
// var row;
var t;
var cycles = 0;
var win = [];

function blink() {
    "use strict";
    var color = document.getElementsByClassName("size");
    cycles = cycles + 1;
    var i = 0;
    console.log(win);
    for (i = 0; i < 3; i = i + 1) {
        if (color[win[i]].style.backgroundColor === "rgb(0, 255, 0)") {
            color[win[i]].style.backgroundColor = "rgb(0, 0, 0)";
        } else {
            color[win[i]].style.backgroundColor = "rgb(0, 255, 0)";
        }
    }
    if (cycles === 6) {
        console.log(cycles);
        clearInterval(t);
        theEnd();
    }
}

function startInterval() {
    "use strict";
    t = setInterval(blink, 400);
}

function checkScoreAcross() {
    "use strict";
    if (row1Cells[0] === row1Cells[1] && row1Cells[0] === row1Cells[2]) {
        console.log("winner");
        win = [0, 1, 2];
        startInterval();
    } else if (row1Cells[3] === row1Cells[4] && row1Cells[3] === row1Cells[5]) {
        console.log("winner");
        win = [3, 4, 5];
        startInterval();
    } else if (row1Cells[3] === row1Cells[4] && row1Cells[3] === row1Cells[5]) {
        console.log("winner");
        win = [6, 7, 8];
        startInterval();
    }
    return;
}

function checkScoreDown() {
    "use strict";
    if (row1Cells[0] === row1Cells[3] && row1Cells[0] === row1Cells[6]) {
        console.log("winner");
        win = [0, 3, 6];
        startInterval();
    } else if (row1Cells[1] === row1Cells[4] && row1Cells[1] === row1Cells[7]) {
        console.log("winner");
        win = [1, 4, 7];
        startInterval();
    } else if (row1Cells[2] === row1Cells[5] && row1Cells[2] === row1Cells[8]) {
        console.log("winner");
        win = [2, 5, 8];
        startInterval();
    }
}

function checkScoreDiag() {
    "use strict";
    if (row1Cells[0] === row1Cells[4] && row1Cells[0] === row1Cells[8]) {
        console.log("winner");
        win = [0, 4, 8];
        startInterval();
    } else if (row1Cells[2] === row1Cells[4] && row1Cells[2] === row1Cells[6]) {
        console.log("winner");
        win = [2, 4, 6];
        startInterval();
    }
}
//  if all 9 spots are x or o and no winner
//  has to be 1 - > 10
//  otherwise error in 1 - > 9
//  start over
var tableFull = 0;
function checkScoreNone() {
    "use strict";
    console.log(tableFull);
    if (tableFull === 9) {
        console.log("no winner");
        theEnd();
    }
}
function update() {
    "use strict";
    row1Cells[f - 1] = xo;
    if (xo === "X") {
        xo = "O";
    } else {
        xo = "X";
    }
    tableFull = tableFull + 1;
    checkScoreAcross();
    checkScoreDown();
    checkScoreDiag();
    checkScoreNone();
}

function set(event) {
    "use strict";
    if (xo === "X" || xo === "O") {
        return;
    }
    if (event.target.id === "x") {
        xo = "X";
        console.log(xo);
        var c = document.getElementById("x");
        c.style.backgroundColor = "#00ff00";
    } else {
        xo = "O";
        console.log(xo);
        var d = document.getElementById("o");
        d.style.backgroundColor = "#00ff00";
    }
    console.log(xo);
}

// now table
// click button once only

var getId = (id) => document.getElementById(id);

function add(event) {
    "use strict";
    var y = event.target.id;
    console.log(y);
    f = y;
    if (y === "x") {
        set(event);
        getId(y).removeEventListener("click", add, false);
        getId("blink").style.visibility = "visible";
        return;
    } else if (y === "o") {
        set(event);
        getId(y).removeEventListener("click", add, false);
        getId("blink").style.visibility = "visible";
        return;
    }
    showXO();
    getId(y).removeEventListener("click", add, false);
    console.log(f);
    update();
    if (win[0] !== undefined) {
        console.log("got a win - remove event listeners");
        var i = 1;
        for (i = 1; i <= 9; i = i + 1) {
            getId(i).removeEventListener("click", add, false);
        }
    }
}
var listener = (a) => getId(a).addEventListener('click', add, false);

listener("x");
listener("o");

// add rest of events on table after the x or y button event is removed
// keep checking with timer until x or o is set
// then add listeners for the x and o
// clear the timer

var timer;

function checkButton() {
    "use strict";
    console.log(xo);
    if (xo !== "") {
        [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(listener);
        clearInterval(timer);
    }
}

function myFunction() {
    "use strict";
    timer = setInterval(checkButton, 500);
}
myFunction();

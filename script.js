var squares = document.querySelectorAll(".square");
var message = document.getElementById("message");

var tiles = [];
var gameInProgress = true;
var squareSelected = null;

for (var i = 0; i < squares.length; i++) {
    tiles.push("tile" + i);
}

for (var i = 0; i < 100; i++) {
    var randomIndex1 = Math.floor(Math.random() * tiles.length);
    var randomIndex2 = Math.floor(Math.random() * tiles.length);

    var temp = tiles[randomIndex1];
    tiles[randomIndex1] = tiles[randomIndex2];
    tiles[randomIndex2] = temp;
}

for (var i = 0; i < squares.length; i++) {
    squares[i].classList.add(tiles[i]);
    squares[i].addEventListener("click", selectSquare);
}

function selectSquare() {
    if (gameInProgress) {
        if (!squareSelected) {
            this.classList.add("selected");
            squareSelected = this;
        }
        else {
            squareSelected.classList.remove("selected");

            var temp = squareSelected.className;
            squareSelected.className = this.className;
            this.className = temp;

            squareSelected = null;

            if (isSolved()) {
                message.innerHTML = "Good job!";
                gameInProgress = false;
            }
        }
    }
}

function isSolved() {
    for (var i = 0; i < squares.length; i++) {
        if (!squares[i].classList.contains("tile" + i)) {
            return false;
        }
    }

    return true;
}

let selectedPiece;
let startSquare;
let endSquare;
let black;
let moves;

// Function to handle the selection of a piece
function dragStart(event) {
    selectedPiece = event.target;
    if (selectedPiece.lastElementChild.lastElementChild.className != 'white') {black = true;}
    event.dataTransfer.setDragImage(event.target, event.target.offsetWidth / 2, event.target.offsetHeight / 2);
    let x = event.clientX, y = event.clientY;
    startSquare = getSquare(x, y)
    piece = selectedPiece.lastElementChild.className
}

// Function to handle the placement of a piece
function dragEnd(event) {
    let targetSquare = event.target;
    event.dataTransfer.setDragImage(event.target, event.target.offsetWidth / 2, event.target.offsetHeight / 2);
    // Check if the target is a square
    if (!targetSquare.classList.contains('square')) {
        targetSquare = targetSquare.closest('.square');
    }
    if (targetSquare && selectedPiece) {
        // Append the selected piece to the target square

        targetSquare.appendChild(selectedPiece);
        selectedPiece = null;
    }
}

const squares = document.querySelectorAll('.square');
const pieces = document.querySelectorAll('.piece');
let color;
let piece;
let lastfrom;
let lastto;
let blacksturn;

// Add event listeners to each piece
pieces.forEach(piece => {
    piece.setAttribute("draggable", true);
    piece.addEventListener('dragstart', dragStart);
    piece.addEventListener('dragend', dragEnd);
});

// Add event listeners to each square
squares.forEach(square => {
    square.addEventListener('dragover', function(event) {
        event.preventDefault();
    });
    square.addEventListener('drop', function(event) {
        event.preventDefault();

        if (square.lastElementChild) {
            color = square.lastElementChild.lastElementChild.lastElementChild.className;
        }
        else {color = 'no'}

        if (color != 'white' && !black && !blacksturn){
            let x = event.clientX, y = event.clientY;
            endSquare = getSquare(x, y)

            validate(startSquare, endSquare, piece, lastfrom, lastto)

            if (valid) {
                if (square.hasChildNodes()) {
                    square.removeChild(square.firstChild);
                }
                square.appendChild(selectedPiece);
                black = false;
                blacksturn = true;
                moves ++;
                firetheengineup();
            }
        }
    });
});

const retry = document.querySelector('.retry_button');

retry.addEventListener('click', function() {
    if (confirm("are you sure you want to restart the game?")) {
        window.location.reload()
        return
        }
});

function getSquare(x, y) {
    for (let i = 0; i < squares.length; i++) {
        let rect = squares[i].getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        return i + 1;
        }
    }
}

function hasPiece(square) {
    return squares[square - 1].lastElementChild
}

function getPiece(square) {
    if (squares[square - 1].lastElementChild) {
        return squares[square - 1].lastElementChild.lastElementChild.className + 
        squares[square - 1].lastElementChild.lastElementChild.lastElementChild.className
    }
    else {
        return "0";
    }
}

function getPieceColor(square) {
    if (squares[square - 1].lastElementChild) {
        return squares[square - 1].lastElementChild.lastElementChild.lastElementChild.className
    }
    else {
        return "0";
    }
}

/*---------------------------------MOVE VALIDATION---------------------------------*/

let valid;

function validate(f, t, piece, lastfrom, lastto) {
    console.log(piece + " from " + f + " to " + t)

    valid = false;

    if (piece == 'pawn') {

        if (lastfrom && lastto) {if (((lastfrom == 9 && lastto == 25) ||
                                     (lastfrom == 10 && lastto == 26) ||
                                     (lastfrom == 11 && lastto == 27) ||
                                     (lastfrom == 12 && lastto == 28) ||
                                     (lastfrom == 13 && lastto == 29) ||
                                     (lastfrom == 14 && lastto == 30) ||
                                     (lastfrom == 15 && lastto == 31) ||
                                     (lastfrom == 16 && lastto == 32)) && t + 8 == lastto) {
                                        valid = true;
                                     }}
        if ((f - t == 8 && !hasPiece(t)) || // 1 step
            (f - t == 16 && !hasPiece(t) && !hasPiece(t - 8) && f >= 49) || // 2 step first move
            (f - t == 7 && hasPiece(t)) || // take right
            (f - t == 9 && hasPiece(t)) // take left
            ) {valid = true;}
    }

    else if (piece == 'rook') {
        if (f < t) {let a = f; f = t; t = a; a = 1} else {a = -1}

        if ((f - t) % 8 == 0) { // vertical
            valid = true;
            for (let i = 1; i <= (f - t) / 8; i++) {
                if (hasPiece(f - 8 * i)) {
                    valid = false; 
                    if (i == (f - t) / 8) {valid = true;}
                    break;
                }
            }
        }
        else if (f - (f % 8) == (t - (t % 8)) || f % 8 == 0) { // horizontal
            valid = true;
            for (let i = 1; i <= f - t; i++) {
                if (hasPiece(a * i + f)) {
                    valid = false;
                    if (i == f - t) {valid = true;}
                    break;
                }
            }
        }
    }

    else if (piece == 'knight') {
        if (f < t) {let a = f; f = t; t = a;}
        if ((f - t == 17) ||
            (f - t == 15) ||
            (f - t == 13) ||
            (f - t == 10) ||
            (f - t == 6) ||
            (f - t == 4)) {
                valid = true;
            }
    }

    else if (piece == 'bishop') {
        if (f < t) {let a = f; f = t; t = a; a = 1} else {a = -1} // going to the right
        if ((f % 9 == t % 9)) {
            valid = true;
            for (let i = 1; i <= (f - t) / 9; i++) {
                if (hasPiece(a * 9 * i + f)) {
                    valid = false;
                    if (i == (f - t) / 9) {valid = true;}
                    break;
                }
            }
        }
        else if ((f % 7 == t % 7)) { // going to the left
            valid = true;
            for (let i = 1; i <= (f - t) / 7; i++) {
                if (hasPiece(a * 7 * i + f)) {
                    valid = false;
                    if (i == (f - t) / 7) {valid = true;}
                    break;
                }
            }
        }
    }

    else if (piece == 'queen') { // queen is rook and bishop combined
        if (f < t) {let a = f; f = t; t = a; a = 1} else {a = -1}

        if ((f - t) % 8 == 0) { // vertical
            valid = true;
            for (let i = 1; i <= (f - t) / 8; i++) {
                if (hasPiece(f - 8 * i)) {
                    valid = false; 
                    if (i == (f - t) / 8) {valid = true;}
                    break;
                }
            }
        }
        else if (f - (f % 8) == (t - (t % 8)) || f % 8 == 0) { // horizontal
            valid = true;
            for (let i = 1; i <= f - t; i++) {
                if (hasPiece(a * i + f)) {
                    valid = false;
                    if (i == f - t) {valid = true;}
                    break;
                }
            }
        }

        let validrook = valid;

        if (f < t) {let a = f; f = t; t = a; a = 1} else {a = -1} // going to the right
        if ((f % 9 == t % 9)) {
            valid = true;
            for (let i = 1; i <= (f - t) / 9; i++) {
                if (hasPiece(a * 9 * i + f)) {
                    valid = false;
                    if (i == (f - t) / 9) {valid = true;}
                    break;
                }
            }
        }
        else if ((f % 7 == t % 7)) { // going to the left
            valid = true;
            for (let i = 1; i <= (f - t) / 7; i++) {
                if (hasPiece(a * 7 * i + f)) {
                    valid = false;
                    if (i == (f - t) / 7) {valid = true;}
                    break;
                }
            }
        }

        let validbishop = valid;
        
        valid = validrook || validbishop
    }

    else if (piece == 'king') {
        if (f < t) {let a = f; f = t; t = a;}
        if (f - t == 8 || f - t == 1 || f - t == 7 || f - t == 9) {
            valid = true;
        }
    }

}

/*---------------------------------MY ENGINE STUFF---------------------------------*/

const row1 = ["0","0","0","0","0","0","0","0"]
const row2 = ["0","0","0","0","0","0","0","0"]
const row3 = ["0","0","0","0","0","0","0","0"]
const row4 = ["0","0","0","0","0","0","0","0"]
const row5 = ["0","0","0","0","0","0","0","0"]
const row6 = ["0","0","0","0","0","0","0","0"]
const row7 = ["0","0","0","0","0","0","0","0"]
const row8 = ["0","0","0","0","0","0","0","0"]

const board = [row1, row2, row3, row4, row5, row6, row7, row8]

const pieceValues = {
    pawn: 1,
    knight: 3,
    bishop: 3,
    rook: 5,
    queen: 9,
}

function whiteMaterial(board) {
    let material = 0;
    for (let i = 0; i < 8; i++) {
        for (let x = 0; x < 8; x++) {
            if (board[i][x] == "pawnwhite") {material += 1}
            else if (board[i][x] == "knightwhite") {material += 3}
            else if (board[i][x] == "bishopwhite") {material += 3}
            else if (board[i][x] == "rookwhite") {material += 5}
            else if (board[i][x] == "queenwhite") {material += 9}
            else if (board[i][x] == "kingwhite") {material += 42}
        }
    }
    return material
}

function blackMaterial(board) {
    blackPieceAmount = 0;
    let material = 0;
    for (let i = 0; i < 8; i++) {
        for (let x = 0; x < 8; x++) {
            if (board[i][x] == "pawnblack") {material += 1}
            else if (board[i][x] == "knightblack") {material += 3}
            else if (board[i][x] == "bishopblack") {material += 3}
            else if (board[i][x] == "rookblack") {material += 5}
            else if (board[i][x] == "queenblack") {material += 9}
            else if (board[i][x] == "kingblack") {material += 42}
        }
    }
    return material
}

function getBoard() {
    let a = 1;
    for (let i = 0; i < 8; i++) {
        for (let x = 0; x < 8; x++) {
            board[i][x] = getPiece(a)
            a++;
        }
    }
    //console.log("board: " , board)
    return board
}

function possiblemoves(board) {

    let possible = []


    for (let y = 0; y < 8; y++) { // for every black piece check its possible moves
        for (let x = 0; x < 8; x++) {

            if (board[y][x] == "pawnblack") { // pawn moves
                if (y != 7) {if (board[y + 1][x] == "0") {
                    possible.push({fromY: y, fromX: x, toY: y + 1, toX: x})
                }}
                if (y == 1) {if (board[y + 1][x] == "0" && board[y + 2][x] == "0") {
                    possible.push({fromY: y, fromX: x, toY: y + 2, toX: x})
                }}
                if (x != 7 && y != 7) {if (board[y + 1][x + 1] != "0" && !board[y + 1][x + 1].endsWith("black")) {
                    possible.push({fromY: y, fromX: x, toY: y + 1, toX: x + 1})
                }}
                if (x != 0 && y != 7) {if (board[y + 1][x - 1] != "0" && !board[y + 1][x - 1].endsWith("black")) {
                    possible.push({fromY: y, fromX: x, toY: y + 1, toX: x - 1})
                }}
            }

            else if (board[y][x] == "knightblack") {
                if (x != 0 && x != 1 && y != 0) {if (!board[y - 1][x - 2].endsWith("black")) {
                    possible.push({fromY: y, fromX: x, toY: y - 1, toX: x - 2})
                }}
                if (x != 0 && y != 0 && y != 1) {if (!board[y - 2][x - 1].endsWith("black")) {
                    possible.push({fromY: y, fromX: x, toY: y - 2, toX: x - 1})
                }}
                if (x != 7 && y != 0 && y != 1) {if (!board[y - 2][x + 1].endsWith("black")) {
                    possible.push({fromY: y, fromX: x, toY: y - 2, toX: x + 1})
                }}
                if (x != 6 && x != 7 && y != 0) {if (!board[y - 1][x + 2].endsWith("black")) {
                    possible.push({fromY: y, fromX: x, toY: y - 1, toX: x + 2})
                }}
                if (x != 0 && x != 1 && y != 7) {if (!board[y + 1][x - 2].endsWith("black")) {
                    possible.push({fromY: y, fromX: x, toY: y + 1, toX: x - 2})
                }}
                if (x != 0 && y != 6 && y != 7) {if (!board[y + 2][x - 1].endsWith("black")) {
                    possible.push({fromY: y, fromX: x, toY: y + 2, toX: x - 1})
                }}
                if (x != 7 && y != 6 && y != 7) {if (!board[y + 2][x + 1].endsWith("black")) {
                    possible.push({fromY: y, fromX: x, toY: y + 2, toX: x + 1})
                }}
                if (x != 6 && x != 7 && y != 7) {if (!board[y + 1][x + 2].endsWith("black")) {
                    possible.push({fromY: y, fromX: x, toY: y + 1, toX: x + 2})
                }}
            }

            else if (board[y][x] == "bishopblack") {
                let v = 1;
                let t = - 1;
                let p = - 1;
                for (let i = 0; i < 4; i++) {
                    while (true) {
                        if (((t == -1 && p == -1) && ( x == 0 || y == 0)) ||
                            ((t == -1 && p == 1) && ( x == 7 || y == 0)) ||
                            ((t == 1 && p == 1) && ( x == 7 || y == 7)) ||
                            ((t == 1 && p == -1) && ( x == 0 || y == 7)) ||
                            (y + t*v == 0 || y + t*v == 7 || x + p*v == 0 || x + p*v == 7)) {break;}

                        if (board[y + t*v][x + p*v] == "0") {
                            possible.push({fromY: y, fromX: x, toY: y + t*v, toX: x + p*v});
                        }
                        else if (board[y + t*v][x + p*v].endsWith("white")) {
                            possible.push({fromY: y, fromX: x, toY: y + t*v, toX: x + p*v});
                            break;
                        }
                        else {
                            break;
                        }
                        v++;
                    }
                    if (i == 0) {v = 1; t = - 1; p = 1;}
                    else if (i == 1) {v = 1; t = 1; p = 1;}
                    else {v = 1; t = 1; p = - 1;}
                }
            }
        }
    }

    //console.log(possible)
    return possible
    
}

function bestMove(possible) {
    let best = possible[Math.floor(Math.random() * possible.length)]
    //console.log(best)
    return best
}

function firetheengineup() {

    currentBoard = getBoard();

    //console.log("white material: " + whiteMaterial(currentBoard))
    //console.log("black material: " + blackMaterial(currentBoard))

    let possible = possiblemoves(currentBoard);

    let best = bestMove(possible)

    let fromSquare = squares[best.fromY * 8 + best.fromX]
    let toSquare = squares[best.toY * 8 + best.toX]


    if (toSquare.hasChildNodes()) {
        toSquare.removeChild(toSquare.firstChild);
    }
    toSquare.appendChild(fromSquare.firstChild)



    blacksturn = false;
}
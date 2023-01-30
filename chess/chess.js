// functions > OOP

let selectedPiece;
let startSquare;
let endSquare;
let black;
let moves = 0;

/* vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv DRAG N DROP vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv */

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

            let move = validate(startSquare, endSquare, piece, lastfrom, lastto)

            if (valid) {
                if (square.hasChildNodes()) {
                    square.removeChild(square.firstChild);
                }
                square.appendChild(selectedPiece);
                if (checkCheckmateBlack()){
                    setTimeout(() => {
                        if (confirm("yay, you won! press ok to restart the game")) {
                            window.location.reload()
                        }
                    }, 0)
                }
                blacksturn = true;
                moves ++;

                if (lastfrom) {
                    squares[lastfrom - 1].classList.remove('enginefrom')
                    squares[lastto - 1].classList.remove('engineto')
                }
                
                setTimeout(() => {
                    firetheengineup(move);
                }, 0)
            }
        }
        else {black = false;}
    });
});

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ DRAG N DROP ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */

/* vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv CLICK / MOBILE vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv */

let high;
let highlighted;

pieces.forEach(piece => {
    piece.addEventListener('click', click)
});

function click (event) {

    let x = event.clientX, y = event.clientY;

    startSquare = getSquare(x, y)

    if (getPieceColor(startSquare) != 'black') {
        if (high) {
            squares[highlighted].classList.remove('highlight')
            if (highlighted != startSquare - 1) {
                squares[startSquare - 1].classList.add('highlight')
                highlighted = startSquare - 1
            } else {
                high = false
            }
        } else {
            squares[startSquare - 1].classList.add('highlight')
            high = true
            highlighted = startSquare - 1
        }
    } else if (getPieceColor(startSquare) == 'black' && highlighted) {
        endSquare = startSquare
        startSquare = highlighted + 1
        piece = getPiece(startSquare).replace('white', '')
    
        let move = validate(startSquare, endSquare, piece, lastfrom, lastto)

        if (valid) {
            if (squares[endSquare - 1].hasChildNodes()) {
                squares[endSquare - 1].removeChild(squares[endSquare - 1].firstChild);
            }
            squares[endSquare - 1].appendChild(squares[startSquare - 1].firstChild);
            squares[startSquare - 1].classList.remove('highlight')
            if (checkCheckmateBlack()){
                setTimeout(() => {
                    if (confirm("yay, you won! press ok to restart the game")) {
                        window.location.reload()
                    }
                }, 0)
            }
            blacksturn = true;
            moves ++;
            if (lastfrom) {
                squares[lastfrom - 1].classList.remove('enginefrom')
                squares[lastto - 1].classList.remove('engineto')
            }
            
            setTimeout(() => {
                firetheengineup(move);
            }, 0)
        }
    }
}

squares.forEach(square => {
    square.addEventListener('click', function (event) {
        if (high) {

            let x = event.clientX, y = event.clientY;
            endSquare = getSquare(x, y)

            if (startSquare != endSquare) {

                if (square.lastElementChild) {
                    color = square.lastElementChild.lastElementChild.lastElementChild.className;
                }
                else {color = 'no'}
        
                if (color != 'white' && !black && !blacksturn){

                    piece = getPiece(startSquare).replace('white', '')
        
                    let move = validate(startSquare, endSquare, piece, lastfrom, lastto)
        
                    if (valid) {
                        square.appendChild(squares[startSquare - 1].firstChild);
                        squares[startSquare - 1].classList.remove('highlight')
                        if (checkCheckmateBlack()){
                            setTimeout(() => {
                                if (confirm("yay, you won! press ok to restart the game")) {
                                    window.location.reload()
                                }
                            }, 0)
                        }
                        blacksturn = true;
                        moves ++;

                        if (lastfrom) {
                            squares[lastfrom - 1].classList.remove('enginefrom')
                            squares[lastto - 1].classList.remove('engineto')
                        }
                        
                        setTimeout(() => {
                            firetheengineup(move);
                        }, 0)
                    }
                }
                else {black = false;}
            } 
        }
    })
})

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ CLICK / MOBILE ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */

/* vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv USEFUL FUNCTIONS vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv */

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

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ USEFUL FUNCTIONS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */

/*---------------------------------MOVE VALIDATION FOR WHITE---------------------------------*/

let valid;
let castle1;
let castle2;
let whitekinghasmoved = false;
let whiterook1hasmoved = false;
let whiterook2hasmoved = false;
let promo = false;
let enpassant = false;

function validate(f, t, piece, lastfrom, lastto) {

    valid = false;
    castle1 = false;
    castle2 = false;
    promo = false;
    enpassant = false;

    if (piece == 'pawn') {

        if (lastfrom !== undefined) {if (((lastfrom == 9 && lastto == 25) ||
                                          (lastfrom == 10 && lastto == 26) ||
                                          (lastfrom == 11 && lastto == 27) ||
                                          (lastfrom == 12 && lastto == 28) ||
                                          (lastfrom == 13 && lastto == 29) ||
                                          (lastfrom == 14 && lastto == 30) ||
                                          (lastfrom == 15 && lastto == 31) ||
                                          (lastfrom == 16 && lastto == 32)) && t + 8 == lastto && getPiece(lastto) == 'pawnblack') {
                                            valid = true;
                                            enpassant = true;
                                        }}
        if ((f - t == 8 && !hasPiece(t)) || // 1 step
            (f - t == 16 && !hasPiece(t) && !hasPiece(f - 8) && f >= 49) || // 2 step first move
            (f - t == 7 && hasPiece(t)) || // take right
            (f - t == 9 && hasPiece(t)) // take left
            ) {
                valid = true;
                if (t == 0 || t == 1 || t == 2 || t == 3 || t == 4 || t == 5 || t == 6 || t == 7 || t == 8) {
                    promo = true;
                    valid = false;
                }
            }
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
        if(valid){if(f == 64 || t == 64){whiterook2hasmoved = true} else if(f == 57 || t == 57){whiterook1hasmoved = true}}
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
        if (f == 61 && t == 63 && !hasPiece(62) && !hasPiece(63) && !whitekinghasmoved && !whiterook2hasmoved) {
            castle2 = true
        }
        if (f == 61 && t == 59 && !hasPiece(60) && !hasPiece(59) && !hasPiece(58) && !whitekinghasmoved && !whiterook1hasmoved) {
            castle1 = true
        }
        if (f < t) {let a = f; f = t; t = a;}
        if (f - t == 8 || f - t == 1 || f - t == 7 || f - t == 9) {
            valid = true;
            whitekinghasmoved = true
        }
    }

    if (valid) {
        console.log("you: " + piece + " from " + f + " to " + t)
        if (enpassant) {
            squares[t + 7].removeChild(squares[t + 7].firstChild);
        }
    }
    else if (castle2) { // todo cant castle when through or under check
        console.log("you: O-O");
        valid = true;
        squares[61].appendChild(squares[63].lastElementChild)  
    }
    else if (castle1) {
        console.log("you: O-O-O")
        valid = true;
        squares[59].appendChild(squares[56].lastElementChild) 
    }
    else if (promo) {
        let queenie = make('queen', 'white')
        queenie.setAttribute("draggable", true);
        queenie.addEventListener('dragstart', dragStart);
        queenie.addEventListener('dragend', dragEnd);
        queenie.addEventListener('click', click)
        squares[f - 1].removeChild(squares[f - 1].firstChild)
        squares[f - 1].appendChild(queenie)
        valid = true;
    }

    let ty;
    let fy;

    if (f == 8 || f == 16 || f == 24 || f == 32 || f == 40 || f == 48 || f == 56 || f == 64) {
        fy = f / 8 - 1
    } else {
        fy = (f - (f % 8)) / 8
    }
    if (t == 8 || t == 16 || t == 24 || t == 32 || t == 40 || t == 48 || t == 56 || t == 64) {
        ty = t / 8 - 1
    } else {
        ty = (t - (t % 8)) / 8
    }

    if (valid) {return {fromY: fy, fromX: (f - 1) % 8 , toY: ty, toX: (f - 1) % 8}}
}

function checkCheckmateBlack() {
    let blackIsMate = true;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].lastElementChild) {
            if (squares[i].lastElementChild.lastElementChild.className == "king" &&
                squares[i].lastElementChild.lastElementChild.lastElementChild.className == "black") {
                    blackIsMate = false
            }
        }
    }
    return blackIsMate
}

function checkCheckmateWhite() {
    let whiteIsMate = true;
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].lastElementChild) {
            if (squares[i].lastElementChild.lastElementChild.className == "king" &&
                squares[i].lastElementChild.lastElementChild.lastElementChild.className == "white") {
                whiteIsMate = false
            }
        }
    }
    return whiteIsMate
}

/*---------------------------------ENGINE STUFF---------------------------------*/

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

let kinghasmoved = false;
let rook1hasmoved = false;
let rook2hasmoved = false;
let promote;

function possiblemoves(board, end, lastMove) {

    let possible = [];
    let otherend;
    promote = false;

    if (end == "white") {
        otherend = "black"
    }
    else {
        otherend = "white"
    }

    for (let y = 0; y < 8; y++) { // for every black piece check its possible moves
        for (let x = 0; x < 8; x++) {

            if (board[y][x] == "pawn" + end && end == "black") { // pawn moves if black
                if (y != 7) {if (board[y + 1][x] == "0") {
                    possible.push({fromY: y, fromX: x, toY: y + 1, toX: x})
                }}
                if (y == 1) {if (board[y + 1][x] == "0" && board[y + 2][x] == "0") {
                    possible.push({fromY: y, fromX: x, toY: y + 2, toX: x})
                }}
                if (x != 7 && y != 7) {if (board[y + 1][x + 1].endsWith(otherend)) {
                    possible.push({fromY: y, fromX: x, toY: y + 1, toX: x + 1})
                }}
                if (x != 0 && y != 7) {if (board[y + 1][x - 1].endsWith(otherend)) {
                    possible.push({fromY: y, fromX: x, toY: y + 1, toX: x - 1})
                }}

                if (y == 4 && x != 7) {if (board[y][x + 1] == "pawn" + otherend && lastMove.toY == y && lastMove.toX == x + 1 && lastMove.fromY == y + 2){
                    possible.push({fromY: y, fromX: x, toY: y + 1, toX: x + 1, enPassant: true})
                }}

                if (y == 4 && x != 0) {if (board[y][x - 1] == "pawn" + otherend && lastMove.toY == y && lastMove.toX == x - 1 && lastMove.fromY == y + 2){
                    possible.push({fromY: y, fromX: x, toY: y + 1, toX: x - 1, enPassant: true})
                }}
            }

            else if (board[y][x] == "pawn" + end && end == "white") { // pawn moves if white
                if (y != 0) {if (board[y - 1][x] == "0") {
                    possible.push({fromY: y, fromX: x, toY: y - 1, toX: x})
                }}
                if (y == 6) {if (board[y - 1][x] == "0" && board[y - 2][x] == "0") {
                    possible.push({fromY: y, fromX: x, toY: y - 2, toX: x})
                }}
                if (x != 7 && y != 0) {if (board[y - 1][x + 1].endsWith(otherend)) {
                    possible.push({fromY: y, fromX: x, toY: y - 1, toX: x + 1})
                }}
                if (x != 0 && y != 0) {if (board[y - 1][x - 1].endsWith(otherend)) {
                    possible.push({fromY: y, fromX: x, toY: y - 1, toX: x - 1})
                }}

                if (y == 3 && x != 7) {if (board[y][x + 1] == "pawn" + otherend && lastMove.toY == y && lastMove.toX == x + 1 && lastMove.fromY == y - 2){
                    possible.push({fromY: y, fromX: x, toY: y + 1, toX: x + 1, enPassant: true})
                }}

                if (y == 3 && x != 0) {if (board[y][x - 1] == "pawn" + otherend && lastMove.toY == y && lastMove.toX == x - 1 && lastMove.fromY == y - 2){
                    possible.push({fromY: y, fromX: x, toY: y + 1, toX: x - 1, enPassant: true})
                }}
            }

            else if (board[y][x] == "knight" + end) {
                if (x != 0 && x != 1 && y != 0) {if (!board[y - 1][x - 2].endsWith(end)) {
                    possible.push({fromY: y, fromX: x, toY: y - 1, toX: x - 2})
                }}
                if (x != 0 && y != 0 && y != 1) {if (!board[y - 2][x - 1].endsWith(end)) {
                    possible.push({fromY: y, fromX: x, toY: y - 2, toX: x - 1})
                }}
                if (x != 7 && y != 0 && y != 1) {if (!board[y - 2][x + 1].endsWith(end)) {
                    possible.push({fromY: y, fromX: x, toY: y - 2, toX: x + 1})
                }}
                if (x != 6 && x != 7 && y != 0) {if (!board[y - 1][x + 2].endsWith(end)) {
                    possible.push({fromY: y, fromX: x, toY: y - 1, toX: x + 2})
                }}
                if (x != 0 && x != 1 && y != 7) {if (!board[y + 1][x - 2].endsWith(end)) {
                    possible.push({fromY: y, fromX: x, toY: y + 1, toX: x - 2})
                }}
                if (x != 0 && y != 6 && y != 7) {if (!board[y + 2][x - 1].endsWith(end)) {
                    possible.push({fromY: y, fromX: x, toY: y + 2, toX: x - 1})
                }}
                if (x != 7 && y != 6 && y != 7) {if (!board[y + 2][x + 1].endsWith(end)) {
                    possible.push({fromY: y, fromX: x, toY: y + 2, toX: x + 1})
                }}
                if (x != 6 && x != 7 && y != 7) {if (!board[y + 1][x + 2].endsWith(end)) {
                    possible.push({fromY: y, fromX: x, toY: y + 1, toX: x + 2})
                }}
            }

            else if (board[y][x] == "bishop" + end) {
                let v = 1;
                let t = - 1;
                let p = - 1;
                for (let i = 0; i < 4; i++) {
                    while (true) {
                        if (((t == -1 && p == -1) && ( x == 0 || y == 0)) ||
                            ((t == -1 && p == 1) && ( x == 7 || y == 0)) ||
                            ((t == 1 && p == 1) && ( x == 7 || y == 7)) ||
                            ((t == 1 && p == -1) && ( x == 0 || y == 7)) ||
                            (y + t*v == -1 || y + t*v == 8 || x + p*v == -1 || x + p*v == 8)) {break;}

                        if (board[y + t*v][x + p*v] == "0") {
                            possible.push({fromY: y, fromX: x, toY: y + t*v, toX: x + p*v});
                        }
                        else if (board[y + t*v][x + p*v].endsWith(otherend)) {
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

            else if (board[y][x] == "rook" + end) {
                let v = 1;
                let t = 0;
                let p = - 1;
                for (let i = 0; i < 4; i++) {
                    while (true) {
                        if (((t == 0 && p == -1) && x == 0) ||
                            ((t == -1 && p == 0) && y == 0) ||
                            ((t == 0 && p == 1) && x == 7) ||
                            ((t == 1 && p == 0) && y == 7) ||
                            (y + t*v == -1 || y + t*v == 8 || x + p*v == -1 || x + p*v == 8)) {break;}

                        if (board[y + t*v][x + p*v] == "0") {
                            possible.push({fromY: y, fromX: x, toY: y + t*v, toX: x + p*v});
                        }
                        else if (board[y + t*v][x + p*v].endsWith(otherend)) {
                            possible.push({fromY: y, fromX: x, toY: y + t*v, toX: x + p*v});
                            break;
                        }
                        else {
                            break;
                        }
                        v++;
                    }
                    if (i == 0) {v = 1; t = - 1; p = 0;}
                    else if (i == 1) {v = 1; t = 0; p = 1;}
                    else {v = 1; t = 1; p = 0;}
                }
            }

            else if (board[y][x] == "queen" + end) {
                let v = 1;
                let t = 0;
                let p = - 1;
                for (let i = 0; i < 4; i++) {
                    while (true) {
                        if (((t == 0 && p == -1) && x == 0) ||
                            ((t == -1 && p == 0) && y == 0) ||
                            ((t == 0 && p == 1) && x == 7) ||
                            ((t == 1 && p == 0) && y == 7) ||
                            (y + t*v == -1 || y + t*v == 8 || x + p*v == -1 || x + p*v == 8)) {break;}

                        if (board[y + t*v][x + p*v] == "0") {
                            possible.push({fromY: y, fromX: x, toY: y + t*v, toX: x + p*v});
                        }
                        else if (board[y + t*v][x + p*v].endsWith(otherend)) {
                            possible.push({fromY: y, fromX: x, toY: y + t*v, toX: x + p*v});
                            break;
                        }
                        else {
                            break;
                        }
                        v++;
                    }
                    if (i == 0) {v = 1; t = - 1; p = 0;}
                    else if (i == 1) {v = 1; t = 0; p = 1;}
                    else {v = 1; t = 1; p = 0;}
                }

                v = 1;
                t = - 1;
                p = - 1;
                for (let i = 0; i < 4; i++) {
                    while (true) {
                        if (((t == -1 && p == -1) && ( x == 0 || y == 0)) ||
                            ((t == -1 && p == 1) && ( x == 7 || y == 0)) ||
                            ((t == 1 && p == 1) && ( x == 7 || y == 7)) ||
                            ((t == 1 && p == -1) && ( x == 0 || y == 7)) ||
                            (y + t*v == -1 || y + t*v == 8 || x + p*v == -1 || x + p*v == 8)) {break;}

                        if (board[y + t*v][x + p*v] == "0") {
                            possible.push({fromY: y, fromX: x, toY: y + t*v, toX: x + p*v});
                        }
                        else if (board[y + t*v][x + p*v].endsWith(otherend)) {
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

            else if (board[y][x] == "king" + end) {
                if (x != 0 && y != 0) {if (!board[y - 1][x - 1].endsWith(end)) {
                    possible.push({fromY: y, fromX: x, toY: y - 1, toX: x - 1})
                }}
                if (y != 0) {if (!board[y - 1][x].endsWith(end)) {
                    possible.push({fromY: y, fromX: x, toY: y - 1, toX: x})
                }}
                if (x != 7 && y != 0) {if (!board[y - 1][x + 1].endsWith(end)) {
                    possible.push({fromY: y, fromX: x, toY: y - 1, toX: x + 1})
                }}
                if ( x != 7) {if (!board[y][x + 1].endsWith(end)) {
                    possible.push({fromY: y, fromX: x, toY: y, toX: x + 1})
                }}
                if (x != 7 && y != 7) {if (!board[y + 1][x + 1].endsWith(end)) {
                    possible.push({fromY: y, fromX: x, toY: y + 1, toX: x + 1})
                }}
                if (y != 7) {if (!board[y + 1][x].endsWith(end)) {
                    possible.push({fromY: y, fromX: x, toY: y + 1, toX: x})
                }}
                if (x != 0 && y != 7) {if (!board[y + 1][x - 1].endsWith(end)) {
                    possible.push({fromY: y, fromX: x, toY: y + 1, toX: x - 1})
                }}
                if (x != 0) {if (!board[y][x - 1].endsWith(end)) {
                    possible.push({fromY: y, fromX: x, toY: y, toX: x - 1})
                }}

                if (!kinghasmoved && !rook2hasmoved) {if (board[y][x + 1] == "0" && board[y][x + 2] == "0" && board[y][x + 3] == "rook" + end){
                    possible.push({fromY: y, fromX: x, toY: y, toX: x + 2, fromY2: y, fromX2: x + 3, toY2: y, toX2: x + 1})
                }}

                if (!kinghasmoved && !rook1hasmoved) {if (board[y][x - 1] == "0" && board[y][x - 2] == "0" && board[y][x - 3] == "0" && board[y][x - 4] == "rook" + end){
                    possible.push({fromY: y, fromX: x, toY: y, toX: x - 2, fromY2: y, fromX2: x - 4, toY2: y, toX2: x - 1})
                }}
            }
        }
    }

    return possible
    
}

function maxi(arr) {
    let t = arr[0]
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > t) {
            t = arr[i]
        }
    }
    return t
}

let save;

function tree(possible, p, depth, lastMove) { // todo async?
    let white = whiteMaterial(board)
    let black = blackMaterial(board)
    save = [];
    let las = lastMove

    for (let i = 0; i < possible.length; i++) {

        /*----------------------update position after blacks move----------------------*/
        //1 move black
        lastMove = las
        let tttemp
        let ttemp
        let temp = board[possible[i].toY][possible[i].toX]

        board[possible[i].toY][possible[i].toX] = board[possible[i].fromY][possible[i].fromX]
        board[possible[i].fromY][possible[i].fromX] = "0"

        if (possible[i].toY2) { // is defined (castle)
            ttemp = board[possible[i].toY2][possible[i].toX2]
            board[possible[i].toY2][possible[i].toX2] = board[possible[i].fromY2][possible[i].fromX2]
            board[possible[i].fromY2][possible[i].fromX2] = "0"
        }

        if (possible[i].enPassant) {
            tttemp = board[possible[i].toY - 1][possible[i].toX]
            board[possible[i].toY - 1][possible[i].toX] = "0"
        }

        lastMove = possible[i]
        let difference = (blackMaterial(board) - black) + (white - whiteMaterial(board))

        /*-----------------------check for whites best response-----------------------*/
        //1 move white
        if (difference != 42 && depth > 1) {
            let possible2 = possiblemoves(board, "white", lastMove)
            let r = [];

            let black2 = blackMaterial(board)
            let white2 = whiteMaterial(board)
            let difference2;
            let ttemp2;
            let tttemp2

            for (let i = 0; i < possible2.length; i++) {

                let temp2 = board[possible2[i].toY][possible2[i].toX]

                board[possible2[i].toY][possible2[i].toX] = board[possible2[i].fromY][possible2[i].fromX]
                board[possible2[i].fromY][possible2[i].fromX] = "0"

                if (possible2[i].toY2) { // is defined
                    ttemp2 = board[possible2[i].toY2][possible2[i].toX2]
                    board[possible2[i].toY2][possible2[i].toX2] = board[possible2[i].fromY2][possible2[i].fromX2]
                    board[possible2[i].fromY2][possible2[i].fromX2] = "0"
                }

                if (possible2[i].enPassant) {
                    tttemp2 = board[possible2[i].toY + 1][possible2[i].toX]
                    board[possible2[i].toY + 1][possible2[i].toX] = "0"
                }

                lastMove = possible2[i]
                difference2 = (whiteMaterial(board) - white2) + (black2 - blackMaterial(board))

                //#########################################################################
                //2 moves lookahead black
                if (difference2 != 42 && depth > 2) {

                    let possible3 = possiblemoves(board, "black", lastMove)
                    let m = [];

                    let black3 = blackMaterial(board)
                    let white3 = whiteMaterial(board)
                    let difference3;
                    let ttemp3;
                    let tttemp3;

                    for (let i = 0; i < possible3.length; i++) {

                        let temp3 = board[possible3[i].toY][possible3[i].toX]
            
                        board[possible3[i].toY][possible3[i].toX] = board[possible3[i].fromY][possible3[i].fromX]
                        board[possible3[i].fromY][possible3[i].fromX] = "0"

                        if (possible3[i].toY2) { // is defined
                            ttemp3 = board[possible3[i].toY2][possible3[i].toX2]
                            board[possible3[i].toY2][possible3[i].toX2] = board[possible3[i].fromY2][possible3[i].fromX2]
                            board[possible3[i].fromY2][possible3[i].fromX2] = "0"
                        }

                        if (possible3[i].enPassant) {
                            tttemp3 = board[possible3[i].toY - 1][possible3[i].toX]
                            board[possible3[i].toY - 1][possible3[i].toX] = "0"
                        }
                        
                        lastMove = possible3[i]
                        difference3 = (blackMaterial(board) - black3) + (white3 - whiteMaterial(board))

                        //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                        if (difference3 != 42 && depth > 3) {

                            let possible4 = possiblemoves(board, "white", lastMove)
                            let z = [];
        
                            let black4 = blackMaterial(board)
                            let white4 = whiteMaterial(board)
                            let difference4;
                            let ttemp4;
                            let tttemp4;
        
                            for (let i = 0; i < possible4.length; i++) {
        
                                let temp4 = board[possible4[i].toY][possible4[i].toX]
                    
                                board[possible4[i].toY][possible4[i].toX] = board[possible4[i].fromY][possible4[i].fromX]
                                board[possible4[i].fromY][possible4[i].fromX] = "0"
        
                                if (possible4[i].toY2) { // is defined
                                    ttemp4 = board[possible4[i].toY2][possible4[i].toX2]
                                    board[possible4[i].toY2][possible4[i].toX2] = board[possible4[i].fromY2][possible4[i].fromX2]
                                    board[possible4[i].fromY2][possible4[i].fromX2] = "0"
                                }

                                if (possible4[i].enPassant) {
                                    tttemp4 = board[possible4[i].toY + 1][possible4[i].toX]
                                    board[possible4[i].toY + 1][possible4[i].toX] = "0"
                                }
                                
                                lastMove = possible4[i]
                                difference4 = (blackMaterial(board) - black4) + (white4 - whiteMaterial(board))
        
                                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                                if (difference4 != 42 && depth > 4) {

                                    let possible5 = possiblemoves(board, "black", lastMove)
                                    let z = [];
                
                                    let black5 = blackMaterial(board)
                                    let white5 = whiteMaterial(board)
                                    let difference5;
                                    let ttemp5;
                                    let tttemp5;
                
                                    for (let i = 0; i < possible5.length; i++) {
                
                                        let temp5 = board[possible5[i].toY][possible5[i].toX]
                            
                                        board[possible5[i].toY][possible5[i].toX] = board[possible5[i].fromY][possible5[i].fromX]
                                        board[possible5[i].fromY][possible5[i].fromX] = "0"
                
                                        if (possible5[i].toY2) { // is defined
                                            ttemp5 = board[possible5[i].toY2][possible5[i].toX2]
                                            board[possible5[i].toY2][possible5[i].toX2] = board[possible5[i].fromY2][possible5[i].fromX2]
                                            board[possible5[i].fromY2][possible5[i].fromX2] = "0"
                                        }

                                        if (possible5[i].enPassant) {
                                            tttemp5 = board[possible5[i].toY - 1][possible5[i].toX]
                                            board[possible5[i].toY - 1][possible5[i].toX] = "0"
                                        }
                                        
                                        difference5 = (blackMaterial(board) - black5) + (white5 - whiteMaterial(board))
                
                                        z.push(difference5)

                                        if (possible5[i].enPassant) {
                                            board[possible5[i].toY - 1][possible5[i].toX] = tttemp5
                                        }
                
                                        if (possible5[i].toY2) {
                                            board[possible5[i].fromY2][possible5[i].fromX2] = board[possible5[i].toY2][possible5[i].toX2]
                                            board[possible5[i].toY2][possible5[i].toX2] = ttemp5
                                        }
                
                                        board[possible5[i].fromY][possible5[i].fromX] = board[possible5[i].toY][possible5[i].toX]
                                        board[possible5[i].toY][possible5[i].toX] = temp5
                                    }
                                difference4 -= maxi(z)
                                }
                                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        
                                z.push(difference4)

                                if (possible4[i].enPassant) {board[
                                    possible4[i].toY + 1][possible4[i].toX] = tttemp4
                                }
        
                                if (possible4[i].toY2) {
                                    board[possible4[i].fromY2][possible4[i].fromX2] = board[possible4[i].toY2][possible4[i].toX2]
                                    board[possible4[i].toY2][possible4[i].toX2] = ttemp4
                                }
        
                                board[possible4[i].fromY][possible4[i].fromX] = board[possible4[i].toY][possible4[i].toX]
                                board[possible4[i].toY][possible4[i].toX] = temp4
                            }
                        difference3 -= maxi(z)
                        }
                        //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

                        m.push(difference3)

                        if (possible3[i].enPassant) {
                            board[possible3[i].toY - 1][possible3[i].toX] = tttemp3
                        }

                        if (possible3[i].toY2) {
                            board[possible3[i].fromY2][possible3[i].fromX2] = board[possible3[i].toY2][possible3[i].toX2]
                            board[possible3[i].toY2][possible3[i].toX2] = ttemp3
                        }

                        board[possible3[i].fromY][possible3[i].fromX] = board[possible3[i].toY][possible3[i].toX]
                        board[possible3[i].toY][possible3[i].toX] = temp3
                    }
                difference2 -= maxi(m)
                }
                //#########################################################################

                r.push(difference2)

                if (possible2[i].enPassant) {
                    board[possible2[i].toY + 1][possible2[i].toX] = tttemp2
                }

                if (possible2[i].toY2) {
                    board[possible2[i].fromY2][possible2[i].fromX2] = board[possible2[i].toY2][possible2[i].toX2]
                    board[possible2[i].toY2][possible2[i].toX2] = ttemp2
                }

                board[possible2[i].fromY][possible2[i].fromX] = board[possible2[i].toY][possible2[i].toX]
                board[possible2[i].toY][possible2[i].toX] = temp2
            }
            difference -= maxi(r)
        }
        /*----------------------------------------------------------------------------*/

        p.push(difference)

        if (possible[i].enPassant) {
            board[possible[i].toY - 1][possible[i].toX] = tttemp
        }

        if (possible[i].toY2) {
            board[possible[i].fromY2][possible[i].fromX2] = board[possible[i].toY2][possible[i].toX2]
            board[possible[i].toY2][possible[i].toX2] = ttemp
        }

        board[possible[i].fromY][possible[i].fromX] = board[possible[i].toY][possible[i].toX]
        board[possible[i].toY][possible[i].toX] = temp
    }
}

function bestMove(possible, board, lastMove) { //todo...

    let best;
    let q = [];
    let p = [];

    tree(possible, p, 3, lastMove)

    for (let i = 0; i < p.length; i++) {
        if (p[i] == maxi(p)) {
            q.push(i)
        }
    }

    let good = []
    let qq = [];
    let pp = [];

    if ((q.length <= p.length / 3 && q.length != 1) || (p.length <= 10)) {
        for (let i = 0; i < q.length; i ++) {
            good[i] = possible[q[i]]
        }

        tree(good, pp, 5, lastMove)

        for (let i = 0; i < pp.length; i++) {
            if (pp[i] == maxi(pp)) {
                qq.push(i)
            }
        }

        p = [...pp]
        q = [...qq]
        
        possible = [...good]
    }
    let k = 0;

    for (let i = 0; i < q.length; i++) {
        if (board[possible[q[i]].fromY][possible[q[i]].fromX] == "kingblack") {
            k++
        }
    }

    console.log(q)

    console.log(lastto, lastfrom)

    for (let i = 0; i < q.length; i++) {
        if (q.length != 1) {
            if (possible[q[i]].fromY2 !== undefined) { // when castling is among the best moves, castle
                castlee = true
                best = possible[q[i]]
                break
            } else if (board[possible[q[i]].fromY][possible[q[i]].fromX] == "kingblack" && k < q.length && moves < 25) { // no unnecessary king moves
                q.splice(i, 1)
                i--
            } else if (board[possible[q[i]].fromY][possible[q[i]].fromX] == "knightblack" && ( // knight is bad on the edge of the board
                    possible[q[i]].toX == 0 || possible[q[i]].toX == 7)){
                q.splice(i, 1)
                i--
            } else if (board[possible[q[i]].fromY][possible[q[i]].fromX] == "pawnblack" && moves < 3 && (possible[q[i]].toX == 7 || possible[q[i]].toX == 0 || possible[q[i]].toX == 6 || possible[q[i]].toX == 1)) {
                q.splice(i, 1) // no stupid pawn moves
                i--
            } else if (board[possible[q[i]].fromY][possible[q[i]].fromX] == "queenblack" && moves < 10) { // no stupid queen moves
                q.splice(i, 1)
                i--
            } else if (possible[q[i]].fromY * 8 + possible[q[i]].fromX + 1 == lastto && moves < 10) { // dont repeat moves
                q.splice(i, 1)
                i--
            }
        }
    }

    if (!castlee) {
        let uh = Math.floor(Math.random() * q.length)
        best = possible[q[uh]]
        if (best.toY == 7 && board[best.fromY][best.fromX] == "pawnblack") {
            promote = true;
        }
    }

    // TODO ENDGAME MATING STRATEGIES
    
    return best
}

function make(piece, color) {

    let pis = document.createElement('div')
    pis.classList.add('piece')
    let pies = document.createElement('div')
    pies.classList.add(piece)
    let colr = document.createElement('div')
    colr.classList.add(color)

    pies.appendChild(colr)
    pis.appendChild(pies)
    return pis
}

let castlee = false;

function firetheengineup(lastMove) {

    currentBoard = getBoard();

    //console.log("white material: " + whiteMaterial(currentBoard))
    //console.log("black material: " + blackMaterial(currentBoard))

    let possible = possiblemoves(currentBoard, "black", lastMove);

    let best = bestMove(possible, currentBoard, lastMove)

    let fromSquare = squares[best.fromY * 8 + best.fromX]
    let toSquare = squares[best.toY * 8 + best.toX]
    
    if (promote) {
        let queenie = make('queen', 'black')
        if (toSquare.hasChildNodes()) {
            toSquare.removeChild(toSquare.firstChild)
        }
        toSquare.appendChild(queenie)
        fromSquare.removeChild(fromSquare.firstChild)
    }
    else if (castlee) { // castle
        kinghasmoved = true
        let fromSquare2 = squares[best.fromY2 * 8 + best.fromX2]
        let toSquare2 = squares[best.toY2 * 8 + best.toX2]
        if (toSquare == 2) {console.log("cpu: O-O")}
        else {console.log("cpu: O-O-O")}
        toSquare.appendChild(fromSquare.firstChild)
        toSquare2.appendChild(fromSquare2.firstChild)
        castlee = false
    } else {
    
        if (fromSquare.firstChild.firstChild.className == "king") {kinghasmoved = true}
        else if (fromSquare.firstChild.firstChild.className == "rook" && best.fromX == 0) {rook1hasmoved = true}
        else if (fromSquare.firstChild.firstChild.className == "rook" && best.fromX == 7) {rook2hasmoved = true}

        if (best.enPassant == true) {
            squares[(best.toY - 1) * 8 + best.toX].removeChild(squares[(best.toY - 1) * 8 + best.toX].firstChild)
        }

        lastfrom = best.fromY * 8 + best.fromX + 1
        lastto = best.toY * 8 + best.toX + 1

        console.log("cpu: " + fromSquare.firstChild.firstChild.className + " from " + lastfrom + " to " + lastto)

        if (toSquare.hasChildNodes()) {
            toSquare.removeChild(toSquare.firstChild);
        }
        toSquare.appendChild(fromSquare.firstChild)

        squares[lastfrom - 1].classList.add('enginefrom')
        squares[lastto - 1].classList.add('engineto')
    }

    blacksturn = false;

    if (checkCheckmateWhite() && !checkCheckmateBlack()){
        setTimeout(() => {
            if (confirm("you lost, press ok to try again")) {
                window.location.reload()
            }
        }, 0)
    }
}
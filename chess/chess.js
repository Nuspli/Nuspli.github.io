let selectedPiece;
let startSquare;
let endSquare;
let black;
let moveCount = 0;

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
const selectPieces = document.querySelectorAll('.select_piece');
let color;
let piece;
let lastfrom;
let lastto;
let blacksturn;
let select = false;

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

            move = validate(startSquare, endSquare, piece, lastfrom, lastto)

            if (valid) {
                if (square.hasChildNodes()) {
                    square.removeChild(square.firstChild);
                }
                square.appendChild(selectedPiece);

                blacksturn = true;
                moveCount ++;

                if (lastfrom) {
                    squares[lastfrom - 1].classList.remove('enginefrom')
                    squares[lastto - 1].classList.remove('engineto')
                }
                
                if (!select) {
                    setTimeout(() => {
                        firetheengineup(move);
                    }, 0)
                }
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
    
        move = validate(startSquare, endSquare, piece, lastfrom, lastto)

        if (valid) {
            if (squares[endSquare - 1].hasChildNodes()) {
                squares[endSquare - 1].removeChild(squares[endSquare - 1].firstChild);
            }
            squares[endSquare - 1].appendChild(squares[startSquare - 1].firstChild);
            squares[startSquare - 1].classList.remove('highlight')
            blacksturn = true;
            moveCount ++;
            if (lastfrom) {
                squares[lastfrom - 1].classList.remove('enginefrom')
                squares[lastto - 1].classList.remove('engineto')
            }
            
            if (!select) {
                setTimeout(() => {
                    firetheengineup(move);
                }, 0)
            }
        }
    }
}

let move

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
        
                    move = validate(startSquare, endSquare, piece, lastfrom, lastto)
        
                    if (valid) {
                        square.appendChild(squares[startSquare - 1].firstChild);
                        squares[startSquare - 1].classList.remove('highlight')
                        blacksturn = true;
                        moveCount ++;

                        if (lastfrom) {
                            squares[lastfrom - 1].classList.remove('enginefrom')
                            squares[lastto - 1].classList.remove('engineto')
                        }

                        if (!select) {
                            setTimeout(() => {
                                firetheengineup(move);
                            }, 0)
                        }
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
let promoSquare

retry.addEventListener('click', function() {
    if (confirm("are you sure you want to restart the game?")) {
        window.location.reload()
        return
        }
});

selectPieces.forEach(piece => {
    piece.addEventListener('click', function(event) {
        let p = event.target
        console.log('p', p)
        let selected = p.offsetParent.lastElementChild.className

        let piece = make(selected, 'white')
        piece.setAttribute("draggable", true);
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('dragend', dragEnd);
        piece.addEventListener('click', click)
        squares[promoSquare].removeChild(squares[promoSquare].firstChild)
        squares[promoSquare].appendChild(piece)

        document.querySelector('.promote_selector').style.top = '-1000px'
        select = false
        firetheengineup(move)
    });
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

function square2yx(square) {
    let y = (square + 8 - (square - 1) % 8 - 1) / 8 - 1
    let x = (square - 1) % 8
    return {y: y, x: x}
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

    let of = f
    let ot = t

    if (!select) {

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

        let b = getBoard()
        b[square2yx(ot).y][square2yx(ot).x] = piece + 'white'
        b[square2yx(of).y][square2yx(of).x] = '0'

        let last = {fromY: square2yx(of).y, fromX: square2yx(of).x, toY: square2yx(ot).y, toX: square2yx(ot).x}

        if (isInCheck('white', b, last)) {
            valid = false; castle1 = false; castle2 = false; promo = false
            console.log('check')
        } 
        if (castle2) {
            let b = getBoard()
            if (isInCheck('white', b, last)) {
                valid = false; castle1 = false; castle2 = false; promo = false
                console.log('check')
            }
            b[7][5] = 'kingwhite'
            b[7][4] = '0'
            if (isInCheck('white', b, last)) {
                valid = false; castle1 = false; castle2 = false; promo = false
                console.log('check')
            }
        }
        if (castle1) {
            let b = getBoard()
            if (isInCheck('white', b, last)) {
                valid = false; castle1 = false; castle2 = false; promo = false
                console.log('check')
            }
            b[7][3] = 'kingwhite'
            b[7][4] = '0'

            console.log(b)
            if (isInCheck('white', b, last)) {
                valid = false; castle1 = false; castle2 = false; promo = false
                console.log('check')
            }
        }

        if (castle2) {
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
            select = true
            promoSquare = t - 1
            document.querySelector('.promote_selector').style.top = '33%'
            valid = true;
        }

        if (valid) {
            console.log("you: " + piece + " from " + of + " to " + ot)
            if (enpassant) {
                squares[t + 7].removeChild(squares[t + 7].firstChild);
            }
            return {fromY: square2yx(of).y, fromX: square2yx(of).x , toY: square2yx(ot).y, toX: square2yx(ot).x}
        }
    }
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

function whiteMaterial(board) {
    let material = 0;
    for (let i = 0; i < 8; i++) {
        for (let x = 0; x < 8; x++) {
            if (board[i][x] == "pawnwhite") {material += 100}
            else if (board[i][x] == "knightwhite") {material += 300}
            else if (board[i][x] == "bishopwhite") {material += 300}
            else if (board[i][x] == "rookwhite") {material += 500}
            else if (board[i][x] == "queenwhite") {material += 900}
            else if (board[i][x] == "kingwhite") {material += 10000}
        }
    }
    return material
}

function blackMaterial(board) {
    blackPieceAmount = 0;
    let material = 0;
    for (let i = 0; i < 8; i++) {
        for (let x = 0; x < 8; x++) {
            if (board[i][x] == "pawnblack") {material += 100}
            else if (board[i][x] == "knightblack") {material += 300}
            else if (board[i][x] == "bishopblack") {material += 300}
            else if (board[i][x] == "rookblack") {material += 500}
            else if (board[i][x] == "queenblack") {material += 900}
            else if (board[i][x] == "kingblack") {material += 10000}
        }
    }
    return material
}

function pieceValue(piece) {
    let value = 0
    if (piece.startsWith('pawn')) {value = 100}
    else if (piece.startsWith('knight')) {value = 300}
    else if (piece.startsWith('bishop')) {value = 300}
    else if (piece.startsWith('rook')) {value = 500}
    else if (piece.startsWith('queen')) {value = 900}
    else if (piece.startsWith('king')) {value = 10000}
    return value
    
}

function isInCheck(color, board, lastMove) {
    let inCheck = false
    let otherColor = 'white'
    if (color == 'white') {otherColor = 'black'}
    let kingPosition;
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if (board[y][x] == "king" + color) {
                kingPosition = {y:y, x:x}
                break
            } 
        } 
    }
    let other = possiblemoves(board, otherColor, lastMove)
    for (let i = 0; i < other.length; i++) {
        if (other[i].toY == kingPosition.y && other[i].toX == kingPosition.x) {
            inCheck = true
        }
    }

    return inCheck
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
                    if (y == 6) {
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x, promoto: 'knight' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x, promoto: 'bishop' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x, promoto: 'rook' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x, promoto: 'queen' + end})
                    }
                    else {possible.push({fromY: y, fromX: x, toY: y + 1, toX: x})}
                }}
                if (y == 1) {if (board[y + 1][x] == "0" && board[y + 2][x] == "0") {
                    possible.push({fromY: y, fromX: x, toY: y + 2, toX: x})
                }}
                if (x != 7 && y != 7) {if (board[y + 1][x + 1].endsWith(otherend)) {
                    if (y == 6) {
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x + 1, promoto: 'knight' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x + 1, promoto: 'bishop' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x + 1, promoto: 'rook' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x + 1, promoto: 'queen' + end})
                    }
                    else {possible.push({fromY: y, fromX: x, toY: y + 1, toX: x + 1})}
                }}
                if (x != 0 && y != 7) {if (board[y + 1][x - 1].endsWith(otherend)) {
                    if (y == 6) {
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x - 1, promoto: 'knight' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x - 1, promoto: 'bishop' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x - 1, promoto: 'rook' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x - 1, promoto: 'queen' + end})
                    }
                    else {possible.push({fromY: y, fromX: x, toY: y + 1, toX: x - 1})}
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
                    if (y == 1) {
                        possible.push({fromY: y, fromX: x, toY: y - 1, toX: x, promoto: 'knight' + end})
                        possible.push({fromY: y, fromX: x, toY: y - 1, toX: x, promoto: 'bishop' + end})
                        possible.push({fromY: y, fromX: x, toY: y - 1, toX: x, promoto: 'rook' + end})
                        possible.push({fromY: y, fromX: x, toY: y - 1, toX: x, promoto: 'queen' + end})
                    }
                    else {possible.push({fromY: y, fromX: x, toY: y - 1, toX: x})}
                }}
                if (y == 6) {if (board[y - 1][x] == "0" && board[y - 2][x] == "0") {
                    possible.push({fromY: y, fromX: x, toY: y - 2, toX: x})
                }}
                if (x != 7 && y != 0) {if (board[y - 1][x + 1].endsWith(otherend)) {
                    if (y == 1) {
                        possible.push({fromY: y, fromX: x, toY: y - 1, toX: x + 1, promoto: 'knight' + end})
                        possible.push({fromY: y, fromX: x, toY: y - 1, toX: x + 1, promoto: 'bishop' + end})
                        possible.push({fromY: y, fromX: x, toY: y - 1, toX: x + 1, promoto: 'rook' + end})
                        possible.push({fromY: y, fromX: x, toY: y - 1, toX: x + 1, promoto: 'queen' + end})
                    }
                    else {possible.push({fromY: y, fromX: x, toY: y - 1, toX: x + 1})}
                }}
                if (x != 0 && y != 0) {if (board[y - 1][x - 1].endsWith(otherend)) {
                    if (y == 7) {
                        possible.push({fromY: y, fromX: x, toY: y - 1, toX: x - 1, promoto: 'knight' + end})
                        possible.push({fromY: y, fromX: x, toY: y - 1, toX: x - 1, promoto: 'bishop' + end})
                        possible.push({fromY: y, fromX: x, toY: y - 1, toX: x - 1, promoto: 'rook' + end})
                        possible.push({fromY: y, fromX: x, toY: y - 1, toX: x - 1, promoto: 'queen' + end})
                    }
                    else {possible.push({fromY: y, fromX: x, toY: y - 1, toX: x - 1})}
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

function check(possible, board, end, lastMove) { // todo improve or replace this
    for (let i = 0; i < possible.length; i++) {
        let check = false

        if (possible[i].toY2) {
            if (isInCheck(end, board, lastMove)) { // cant castle if in check
                check = true
            }

            let newBoard = doMove(possible[i], board)
            let newLastMove = possible[i]

            if (isInCheck(end, newBoard, newLastMove)) { // cant castle if in check afterwards
                check = true
            }

            let betweenMove

            if (possible.toX == 2) {
                betweenMove = {fromY: possible[i].fromY, fromX: possible[i].fromX, toY: possible[i].toY, toX: 3}
            } else {betweenMove = {fromY: possible[i].fromY, fromX: possible[i].fromX, toY: possible[i].toY, toX: 5}}

            newBoard = doMove(betweenMove, board)
            newLastMove = betweenMove

            if (isInCheck(end, newBoard, newLastMove)) {
                check = true
            }


        } else {

            let newBoard = doMove(possible[i], board)
            let newLastMove = possible[i]

            if (isInCheck(end, newBoard, newLastMove)) {
                check = true
            }

        }

        if (check) {
            possible.splice(i, 1)
            i--
        }
    }

    return possible
}

function maxi(arr) {
    let t = arr[0]
    let m = 0
    let a = []
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > t) {
            t = arr[i]
            m = i
        }
    }
    a.push(t)
    a.push(m)
    return a
}

let nodes = 0

function doMove(move, board) {
    let newBoard = board.map(row => row.slice());

    newBoard[move.toY][move.toX] = newBoard[move.fromY][move.fromX];
    newBoard[move.fromY][move.fromX] = "0";
    if (move.promoto){
        newBoard[move.toY][move.toX] = move.promoto
    }
    else if (move.toY2) {
        newBoard[move.toY2][move.toX2] = newBoard[move.fromY2][move.fromX2];
        newBoard[move.fromY2][move.fromX2] = "0";
    } else if (move.enPassant) {
        newBoard[move.toY - 1][move.toX] = "0";
    }

    return newBoard;
}

function tree(board, depth, alpha, beta, maximizingPlayer, lastMove) {

    nodes++
    let color

    if (depth == 0) {
      return blackMaterial(board) - whiteMaterial(board);
    }

    if (maximizingPlayer) {color = 'black'} else {color = 'white'}
  
    let moves = possiblemoves(board, color, lastMove);
    //moves = shuffle(moves)
    moves = order(moves, board)

    if (moves.length == 0) {return 0}

    if (maximizingPlayer) {
      let value = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        let newBoard = doMove(moves[i], board);
        value = Math.max(value, tree(newBoard, depth - 1, alpha, beta, false, moves[i]));
        alpha = Math.max(alpha, value);
        if (beta <= alpha) {
          break;
        }
      }
      return value;
    } else {
      let value = Infinity;
      for (let i = 0; i < moves.length; i++) {
        let newBoard = doMove(moves[i], board);
        value = Math.min(value, tree(newBoard, depth - 1, alpha, beta, true, moves[i]));
        beta = Math.min(beta, value);
        if (beta <= alpha) {
          break;
        }
      }
      return value;
    }
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function order(moves, board) {
    let scores = []
    for (let i = 0; i < moves.length; i++) {
      let guess = 0
      if (board[moves[i].toY][moves[i].toX] != '0') {
        guess = 10 * pieceValue(board[moves[i].toY][moves[i].toX]) - pieceValue(board[moves[i].fromY][moves[i].fromX])
      }
      if (moves[i].promoto) {
        guess += pieceValue(moves[i].promoto)
      }
      if (board[moves[i].fromY][moves[i].fromX].startsWith('king') && moveCount < 25) {
        guess -= 50
      }
      else if (board[moves[i].fromY][moves[i].fromX].startsWith('knight') && moveCount < 20 && (moves[i].toY == 0 || moves[i].toY == 7)) {
        guess -= 25
      }
      else if (board[moves[i].fromY][moves[i].fromX].startsWith('pawn') && moveCount < 10) {
        if (moves[i].toY == 3 || moves[i].toY == 4) {guess += 10}
        else if (moves[i].toY == 2 || moves[i].toY == 5) {guess += 5}
      }
      else if (board[moves[i].fromY][moves[i].fromX].startsWith('queen') && moveCount < 15) {
        guess -= 50
      }
      scores.push(guess)
    }

    moves = moves.sort((a, b) => scores[moves.indexOf(b)] - scores[moves.indexOf(a)]);

    return moves;
  }
  

function bestMove(possible, board, lastMove) {
    nodes = 0

    let best;
    let p = [];

    possible = shuffle(possible)
    possible = order(possible, board)

    for (let i = 0; i < possible.length; i++) {
        let newBoard = doMove(possible[i], board)
        lastMove = possible[i]
        let value = tree(newBoard, 4, -Infinity, Infinity, false, lastMove)
        p.push(value)
    }

    console.log(p)
    let max = maxi(p)[0]
    let index = maxi(p)[1]
    
    /*
    for (let i = 0; i < q.length; i++) {
        if (q.length != 1) {
            if (possible[q[i]].fromY2 !== undefined) { // when castling is among the best moves, castle
                castlee = true
                best = possible[q[i]]
                break
            } else if (possible[q[i]].fromY * 8 + possible[q[i]].fromX + 1 == lastto) { // dont repeat moves
                q.splice(i, 1)
                i--
            }
        }
    }
    */

    best = possible[index]
    if (best !== undefined) {
    if (best.toY == 7 && board[best.fromY][best.fromX] == "pawnblack") {
        promote = true;
    }}


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

    console.time('engine')

    currentBoard = getBoard();

    //console.log("white material: " + whiteMaterial(currentBoard))
    //console.log("black material: " + blackMaterial(currentBoard))

    let possible = possiblemoves(currentBoard, "black", lastMove);
    possible = check(possible, currentBoard, 'black', lastMove)

    let best = bestMove(possible, currentBoard, lastMove)

    if (best !== undefined) {
    let fromSquare = squares[best.fromY * 8 + best.fromX]
    let toSquare = squares[best.toY * 8 + best.toX]
    
    if (promote) {
        if (best.promoto.startsWith('queen')) {piece = 'queen'}
        else if (best.promoto.startsWith('rook')) {piece = 'rook'}
        else if (best.promoto.startsWith('bishop')) {piece = 'bishop'}
        else if (best.promoto.startsWith('knight')) {piece = 'knight'}
        let newPiece = make(piece, 'black')
        newPiece.setAttribute("draggable", true);
        newPiece.addEventListener('dragstart', dragStart);
        newPiece.addEventListener('dragend', dragEnd);
        newPiece.addEventListener('click', click)
        if (toSquare.hasChildNodes()) {
            toSquare.removeChild(toSquare.firstChild)
        }
        toSquare.appendChild(newPiece)
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
    console.log('nodes searched', nodes)
    }

    if (best === undefined){
        let msg
        if (isInCheck('black', currentBoard, lastMove)) {msg = "you won, press ok to try again"}
        else {msg = "draw, press ok to try again"}
        setTimeout(() => {
            if (confirm(msg)) {
                window.location.reload()
            }
        }, 0)
    }

    console.timeEnd('engine')

    let updatedBoard = getBoard()
    let whitemoves = possiblemoves(updatedBoard, 'white', lastMove)
    whitemoves = check(whitemoves, updatedBoard, 'white', lastMove)

    if (whitemoves.length == 0) {
        let msg
        if (isInCheck('white', currentBoard, lastMove)) {msg = "you lost, press ok to try again"}
        else {msg = "draw, press ok to try again"}
        setTimeout(() => {
            if (confirm(msg)) {
                window.location.reload()
            }
        }, 0)
    }
}

//firetheengineup()
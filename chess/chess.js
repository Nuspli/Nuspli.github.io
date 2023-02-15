let selectedPiece;
let startSquare;
let endSquare;
let black;
let moveCount = 0;

const squares = document.querySelectorAll('.square');
const selectPieces = document.querySelectorAll('.select_piece');

function boardSetup() {
    let startPosition = [["rookblack","knightblack","bishopblack","queenblack","kingblack","bishopblack","knightblack","rookblack"],
                         ["pawnblack","pawnblack","pawnblack","pawnblack","pawnblack","pawnblack","pawnblack","pawnblack"],
                         ["0","0","0","0","0","0","0","0"],
                         ["0","0","0","0","0","0","0","0"],
                         ["0","0","0","0","0","0","0","0"],
                         ["0","0","0","0","0","0","0","0"],
                         ["pawnwhite","pawnwhite","pawnwhite","pawnwhite","pawnwhite","pawnwhite","pawnwhite","pawnwhite"],
                         ["rookwhite","knightwhite","bishopwhite","queenwhite","kingwhite","bishopwhite","knightwhite","rookwhite"]]

    let startPosition1 = [["0","kingblack","0","0","0","0","0","rookblack"],
                        ["pawnblack","0","panwblack","0","0","0","0","0"],
                        ["0","pawnblack","biahopblack","0","0","0","0","0"],
                        ["0","0","0","pawnblack","queenwhite","0","queenblack","0"],
                        ["0","0","0","knightblack","0","0","knightwhite","0"],
                        ["pawnwhite","0","0","pawnwhite","0","pawnwhite","0","0"],
                        ["0","pawnwhite","pawnwhite","0","0","0","0","0"],
                        ["0","kingwhite","rookwhite","0","0","0","0","bishopwhite"]]

    let piece
    let color
    let s = -1

    for (let i = 0; i < 8; i++) {
        for (let x = 0; x < 8; x++) {
            s++
            if (startPosition[i][x].endsWith('white')) {
                color = 'white'
            } else if (startPosition[i][x].endsWith('black')) {
                color = 'black'
            }
            if (startPosition[i][x] != '0') {
                if (startPosition[i][x].startsWith('king')) {piece = 'king'}
                else if (startPosition[i][x].startsWith('queen')) {piece = 'queen'}
                else if (startPosition[i][x].startsWith('rook')) {piece = 'rook'}
                else if (startPosition[i][x].startsWith('bishop')) {piece = 'bishop'}
                else if (startPosition[i][x].startsWith('knight')) {piece = 'knight'}
                else if (startPosition[i][x].startsWith('pawn')) {piece = 'pawn'}
                let newPiece = make(piece, color)
                newPiece.setAttribute("draggable", true);
                newPiece.addEventListener('dragstart', dragStart);
                newPiece.addEventListener('dragend', dragEnd);
                newPiece.addEventListener('click', click)
                squares[s].appendChild(newPiece)
            }
        }
    }
}

boardSetup()

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

let color;
let piece;
let lastfrom;
let lastto;
let blacksturn;
let select = false;

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
    let move = {fromY: square2yx(f).y, fromX: square2yx(f).x, toY: square2yx(t).y, toX: square2yx(t).x}
    let possible = check(possiblemoves(getBoard(), 'white', {}), getBoard(), 'white', {})

    let of = f
    let ot = t

    if (!select) {

        for (let i = 0; i < possible.length; i++) {
            if (move.fromY == possible[i].fromY && move.fromX == possible[i].fromX && move.toY == possible[i].toY && move.toX == possible[i].toX) {
                valid = true
            }
        }

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

        if (piece == 'king') {
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

        if (isInCheck('white', b)) {
            valid = false; castle1 = false; castle2 = false; promo = false
            console.log('check')
        } 
        if (castle2) {
            let b = getBoard()
            if (isInCheck('white', b)) {
                valid = false; castle1 = false; castle2 = false; promo = false
                console.log('check')
            }
            b[7][5] = 'kingwhite'
            b[7][4] = '0'
            if (isInCheck('white', b)) {
                valid = false; castle1 = false; castle2 = false; promo = false
                console.log('check')
            }
        }
        if (castle1) {
            let b = getBoard()
            if (isInCheck('white', b)) {
                valid = false; castle1 = false; castle2 = false; promo = false
                console.log('check')
            }
            b[7][3] = 'kingwhite'
            b[7][4] = '0'

            console.log(b)
            if (isInCheck('white', b)) {
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

function isInCheck(color, board) {
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
    if (kingPosition === undefined) {return true}

    if (canCapture(board, otherColor, kingPosition)) {
        inCheck = true
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

function bishopCheck(board, end, kp) {
    let check = false
    let v = 1;
    let t = - 1;
    let p = - 1;
    for (let i = 0; i < 4; i++) {
        while (true) {
            if (((t == -1 && p == -1) && (kp.x == 0 || kp.y == 0)) ||
                ((t == -1 && p == 1) && (kp.x == 7 || kp.y == 0)) ||
                ((t == 1 && p == 1) && (kp.x == 7 || kp.y == 7)) ||
                ((t == 1 && p == -1) && (kp.x == 0 || kp.y == 7)) ||
                (kp.y + t*v == -1 || kp.y + t*v == 8 || kp.x + p*v == -1 || kp.x + p*v == 8)) {break;}

            if (board[kp.y + t*v][kp.x + p*v] == "0") {
                v++
            }
            else if (board[kp.y + t*v][kp.x + p*v] == 'bishop'+end || board[kp.y + t*v][kp.x + p*v] == 'queen'+end) {
                check = true
                break;
            }
            else {
                break;
            }
        }
        if (i == 0) {v = 1; t = - 1; p = 1;}
        else if (i == 1) {v = 1; t = 1; p = 1;}
        else {v = 1; t = 1; p = - 1;}
    }
    return check
}

function rookCheck(board, end, kp) {
    let check = false
    let v = 1;
    let t = 0;
    let p = - 1;
    for (let i = 0; i < 4; i++) {
        while (true) {
            if (((t == 0 && p == -1) && kp.x == 0) ||
                ((t == -1 && p == 0) && kp.y == 0) ||
                ((t == 0 && p == 1) && kp.x == 7) ||
                ((t == 1 && p == 0) && kp.y == 7) ||
                (kp.y + t*v == -1 || kp.y + t*v == 8 || kp.x + p*v == -1 || kp.x + p*v == 8)) {break;}

            if (board[kp.y + t*v][kp.x + p*v] == "0") {
                v++;
            }
            else if (board[kp.y + t*v][kp.x + p*v] == 'rook'+end || board[kp.y + t*v][kp.x + p*v] == 'queen'+end) {
                check = true
                break;
            }
            else {
                break;
            }
        }
        if (i == 0) {v = 1; t = - 1; p = 0;}
        else if (i == 1) {v = 1; t = 0; p = 1;}
        else {v = 1; t = 1; p = 0;}
    }
    return check
}

function canCapture(board, end, kingPosition) {
    let yes = false
    let kp = kingPosition
    if (end == "white") {
        otherend = "black"
    }
    else {
        otherend = "white"
    }
    
        if (kp.y+2 <= 7 && kp.x-1 >= 0) {if (board[kp.y+2][kp.x-1] == 'knight'+end) {yes = true}}
        if (kp.y+1 <= 7 && kp.x-2 >= 0) {if (board[kp.y+1][kp.x-2] == 'knight'+end) {yes = true}}
        if (kp.y-1 >= 0 && kp.x-2 >= 0) {if (board[kp.y-1][kp.x-2] == 'knight'+end) {yes = true}}
        if (kp.y-2 >= 0 && kp.x-1 >= 0) {if (board[kp.y-2][kp.x-1] == 'knight'+end) {yes = true}}
        if (kp.y-2 >= 0 && kp.x+1 <= 7) {if (board[kp.y-2][kp.x+1] == 'knight'+end) {yes = true}}
        if (kp.y-1 >= 0 && kp.x+2 <= 7) {if (board[kp.y-1][kp.x+2] == 'knight'+end) {yes = true}}
        if (kp.y+1 <= 7 && kp.x+2 <= 7) {if (board[kp.y+1][kp.x+2] == 'knight'+end) {yes = true}}
        if (kp.y+2 <= 7 && kp.x+1 <= 7) {if (board[kp.y+2][kp.x+1] == 'knight'+end) {yes = true}}

        if (kp.y+1 <= 7 && kp.x-1 >= 0) {if ((board[kp.y+1][kp.x-1] == 'king'+end) || (board[kp.y+1][kp.x-1] == 'bishop'+end) || (board[kp.y+1][kp.x-1] == 'queen'+end) || ((board[kp.y+1][kp.x-1] == 'pawn'+end) && end == 'white')) {yes = true}}
        if (kp.x-1 >= 0) {if ((board[kp.y][kp.x-1] == 'king'+end) || (board[kp.y][kp.x-1] == 'rook'+end) || (board[kp.y][kp.x-1] == 'queen'+end)) {yes = true}}
        if (kp.y-1 >= 0 && kp.x-1 >= 0) {if ((board[kp.y-1][kp.x-1] == 'king'+end) || (board[kp.y-1][kp.x-1] == 'bishop'+end) || (board[kp.y-1][kp.x-1] == 'queen'+end) || ((board[kp.y-1][kp.x-1] == 'pawn'+end) && end == 'black')) {yes = true}}
        if (kp.y-1 >= 0) {if ((board[kp.y-1][kp.x] == 'king'+end) || (board[kp.y-1][kp.x] == 'rook'+end) || (board[kp.y-1][kp.x] == 'queen'+end)) {yes = true}}
        if (kp.y-1 >= 0) {if (kp.x+1 <= 7 && (board[kp.y-1][kp.x+1] == 'king'+end) || (board[kp.y-1][kp.x+1] == 'bishop'+end) || (board[kp.y-1][kp.x+1] == 'queen'+end) || ((board[kp.y-1][kp.x+1] == 'pawn'+end) && end == 'black')) {yes = true}}
        if (kp.x+1 <= 7) {if ((board[kp.y][kp.x+1] == 'king'+end) || (board[kp.y][kp.x+1] == 'rook'+end) || (board[kp.y][kp.x+1] == 'queen'+end)) {yes = true}}
        if (kp.y+1 <= 7) {if (kp.x+1 <= 7 && (board[kp.y+1][kp.x+1] == 'king'+end) || (board[kp.y+1][kp.x+1] == 'bishop'+end) || (board[kp.y+1][kp.x+1] == 'queen'+end) || ((board[kp.y+1][kp.x+1] == 'pawn'+end) && end == 'white')) {yes = true}}
        if (kp.y+1 <= 7) {if ((board[kp.y+1][kp.x] == 'king'+end) || (board[kp.y+1][kp.x] == 'rook'+end) || (board[kp.y+1][kp.x] == 'queen'+end)) {yes = true}}

        if (bishopCheck(board, end, kp)) {yes = true}

        if (rookCheck(board, end, kp)) {yes = true}
        
    return yes
}

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
                if (y != 7) {if (board[y + 1][x] == "0") { // if there is no piece blocking its way
                    if (y == 6) { // if it goes to the last rank, it promotes
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x, promoto: 'knight' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x, promoto: 'bishop' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x, promoto: 'rook' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x, promoto: 'queen' + end})
                    }
                    else {possible.push({fromY: y, fromX: x, toY: y + 1, toX: x})} // pawn push
                }}
                if (y == 1) {if (board[y + 1][x] == "0" && board[y + 2][x] == "0") { // pawn can also move 2 squares down, if its on its starting square
                    possible.push({fromY: y, fromX: x, toY: y + 2, toX: x})
                }}
                if (x != 7 && y != 7) {if (board[y + 1][x + 1].endsWith(otherend)) { // taking to the right
                    if (y == 6) { // could also be promoting
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x + 1, promoto: 'knight' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x + 1, promoto: 'bishop' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x + 1, promoto: 'rook' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x + 1, promoto: 'queen' + end})
                    }
                    else {possible.push({fromY: y, fromX: x, toY: y + 1, toX: x + 1})}
                }}
                if (x != 0 && y != 7) {if (board[y + 1][x - 1].endsWith(otherend)) { // taking to the left
                    if (y == 6) {
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x - 1, promoto: 'knight' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x - 1, promoto: 'bishop' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x - 1, promoto: 'rook' + end})
                        possible.push({fromY: y, fromX: x, toY: y + 1, toX: x - 1, promoto: 'queen' + end})
                    }
                    else {possible.push({fromY: y, fromX: x, toY: y + 1, toX: x - 1});}
                }}

                if (y == 4 && x != 7) {if (board[y][x + 1] == "pawn" + otherend && lastMove.toY == y && lastMove.toX == x + 1 && lastMove.fromY == y + 2){ // en passant
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
                        if (((t == -1 && p == -1) && ( x == 0 || y == 0)) || // cant go further than the edge of the board
                            ((t == -1 && p == 1) && ( x == 7 || y == 0)) || // t and p are like x and y directions t:-1 and p :-1 means one square up and one left
                            ((t == 1 && p == 1) && ( x == 7 || y == 7)) ||
                            ((t == 1 && p == -1) && ( x == 0 || y == 7)) ||
                            (y + t*v == -1 || y + t*v == 8 || x + p*v == -1 || x + p*v == 8)) {break;}

                        if (board[y + t*v][x + p*v] == "0") {
                            possible.push({fromY: y, fromX: x, toY: y + t*v, toX: x + p*v}); // keep moving the bishop if nothing blocks it
                        }
                        else if (board[y + t*v][x + p*v].endsWith(otherend)) {
                            possible.push({fromY: y, fromX: x, toY: y + t*v, toX: x + p*v}); // if there is an enemy piece, capturing is possible, but going further isnt
                            break;
                        }
                        else {
                            break; // when the bishop is blocked by its own pieces
                        }
                        v++; // next square
                    }
                    if (i == 0) {v = 1; t = - 1; p = 1;} // cycle through all 4 diagonal directions
                    else if (i == 1) {v = 1; t = 1; p = 1;}
                    else {v = 1; t = 1; p = - 1;}
                }
            }

            else if (board[y][x] == "rook" + end) { // similar to the bishop, keep moving in all 4 directions until something is hit
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

            else if (board[y][x] == "queen" + end) { // the queen has all of the bishops and rooks moves combined
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

            else if (board[y][x] == "king" + end) { // king can move 1 square in every direction
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

                if (!kinghasmoved && !rook2hasmoved) {if (board[y][x + 1] == "0" && board[y][x + 2] == "0" && board[y][x + 3] == "rook" + end){ // castling, possible if king and rook havent moved yet and the king 
                    possible.push({fromY: y, fromX: x, toY: y, toX: x + 2, fromY2: y, fromX2: x + 3, toY2: y, toX2: x + 1}) // isnt in check before, after and on any square it crosses while castling (validated elsewhere)
                }}

                if (!kinghasmoved && !rook1hasmoved) {if (board[y][x - 1] == "0" && board[y][x - 2] == "0" && board[y][x - 3] == "0" && board[y][x - 4] == "rook" + end){
                    possible.push({fromY: y, fromX: x, toY: y, toX: x - 2, fromY2: y, fromX2: x - 4, toY2: y, toX2: x - 1})
                }}
            }
        }
    }
    return possible
}

function check(possible, board, end) {
    for (let i = 0; i < possible.length; i++) {
        let check = false

        if (possible[i].toY2) {
            if (isInCheck(end, board)) { // cant castle if in check
                check = true
            }

            let newBoard = doMove(possible[i], board)

            if (isInCheck(end, newBoard)) { // cant castle if in check afterwards
                check = true
            }

            let betweenMove

            if (possible.toX == 2) {
                betweenMove = {fromY: possible[i].fromY, fromX: possible[i].fromX, toY: possible[i].toY, toX: 3}
            } else {betweenMove = {fromY: possible[i].fromY, fromX: possible[i].fromX, toY: possible[i].toY, toX: 5}}

            newBoard = doMove(betweenMove, board)

            if (isInCheck(end, newBoard)) {
                check = true
            }


        } else {

            let newBoard = doMove(possible[i], board)

            if (isInCheck(end, newBoard)) {
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

function absolute(number) {
    if (number < 0) {
        return -1 * number
    } else {
        return number
    }
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

function evaluate(board) {
    
    let evaluation
    let b = blackMaterial(board)
    let w = whiteMaterial(board)
    evaluation = b - w;
    if (moveCount < 12) { // opening
        if (board[0][4] != 'kingblack') {evaluation -= 64}
        if (board[0][2] == 'kingblack' || board[0][6] == 'kingblack') {evaluation += 96}
        if (board[0][3] != 'queenblack') {evaluation -= 32}
        if (board[1][3] != 'pawnblack') {evaluation += 16}
        if (board[1][4] != 'pawnblack') {evaluation += 16}
        if (board[0][1] != 'knightblack') {evaluation += 16}
        if (board[0][6] != 'knightblack') {evaluation += 16}
        if (board[0][2] != 'bishopblack') {evaluation += 16}
        if (board[0][5] != 'bishopblack') {evaluation += 16}

    } else if ((b < 12000 || w < 12000) && moveCount > 30) { // endgame
        let blackKingPosition = [100, 100]
        let whiteKingPosition = [100, 100]
        for (let x = 0; x < 8; x++) {
            if (board[4][x] == "pawnblack") {evaluation += 4}
            if (board[5][x] == "pawnblack") {evaluation += 8}
            if (board[6][x] == "pawnblack") {evaluation += 16}
            if (board[7][x] == "pawnblack") {evaluation += 32}
            for (let y = 0; y < 8; y++) {
                if (board[y][x] == 'kingblack') {blackKingPosition[0] = y; blackKingPosition[1] = x}
                if (board[y][x] == 'kingwhite') {whiteKingPosition[0] = y; whiteKingPosition[1] = x}
            }
        }
        if (b == 10500 && w <= 10200 || b == 11000 && w <= 10200 || b == 10900 && w <= 10200) {
            let whiteKingDistToCenter = Math.max(3 - whiteKingPosition[0], whiteKingPosition[0] - 4) + Math.max(3 - whiteKingPosition[1], whiteKingPosition[1] - 4)
            let distBetweenKings = absolute(blackKingPosition[0] - whiteKingPosition[0]) + absolute(blackKingPosition[1] - whiteKingPosition[1])
            if (distBetweenKings > 4) {evaluation -= distBetweenKings}
            else if (distBetweenKings <= 3) {evaluation += whiteKingDistToCenter}
        }

    } else { // middlegame
        if (board[0][4] != 'kingblack') {evaluation -= 64}
        if (board[0][2] == 'kingblack' || board[0][6] == 'kingblack') {evaluation += 96}
        if (board[0][0] != 'rookblack') {evaluation += 16}
        if (board[0][7] != 'rookblack') {evaluation += 16}
        if (board[0][3] != 'queenblack') {evaluation += 16}
    }
    
    return evaluation

}

let transTable = new Map();

const ZOBRIST_TABLE = [];
const PIECE_TYPES = ['0', 'pawnblack', 'rookblack', 'knightblack', 'bishopblack', 'queenblack', 'kingblack', 'pawnwhite', 'rookwhite', 'knightwhite', 'bishopwhite', 'queenwhite', 'kingwhite'];

// Initialize the Zobrist table
for (let i = 0; i < 8; i++) {
    ZOBRIST_TABLE[i] = [];
    for (let j = 0; j < 8; j++) {
        ZOBRIST_TABLE[i][j] = [];
        for (let k = 0; k < PIECE_TYPES.length; k++) {
            ZOBRIST_TABLE[i][j][k] = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        }
    }
}

// Calculate the hash value of a board
function hashBoard(board) {
    let hash = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let pieceType = PIECE_TYPES.indexOf(board[i][j]);
            hash ^= ZOBRIST_TABLE[i][j][pieceType];
        }
    }
    return hash;
}

  let transpositions = 0

  function tree(board, depth, alpha, beta, maximizingPlayer, lastMove) {

    nodes++;

    let hash = hashBoard(board);
    let entry = transTable.get(hash);
    if (entry !== undefined && entry.depth >= depth) {
        transpositions++
        if (entry.flag === "exact") {
                return entry.value;
            } else if (entry.flag === "lowerbound" && entry.value >= beta) {
                return beta;
            } else if (entry.flag === "upperbound" && entry.value <= alpha) {
                return alpha;
            }
        }

    let color;
    if (maximizingPlayer) {
        color = "black";
      } else {
        color = "white";
      }

    if (depth == 0) {
        return evaluate(board)
    }

    let moves = possiblemoves(board, color, lastMove);

    if (check(moves, board, color).length == 0) {
        if (isInCheck(color, board)) {
            if (color == 'white') {return 100000} else {return -100000}
        } else {
            return 0
        }
    }

    moves = order(moves, board);

    if (maximizingPlayer) {
      let value = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        let newBoard = doMove(moves[i], board);
        value = Math.max(
          value,
          tree(newBoard, depth - 1, alpha, beta, false, moves[i])
        );
        alpha = Math.max(alpha, value);
        if (beta <= alpha) {
          break;
        }
      }
      transTable.set(hash, {depth: depth, value: value, flag: (value <= alpha ? "upperbound" : (value >= beta ? "lowerbound" : "exact"))});
      return value;
    } else {
      let value = Infinity;
      for (let i = 0; i < moves.length; i++) {
        let newBoard = doMove(moves[i], board);
        value = Math.min(
          value,
          tree(newBoard, depth - 1, alpha, beta, true, moves[i])
        );
        beta = Math.min(beta, value);
        if (beta <= alpha) {
          break;
        }
      }
      transTable.set(hash, {depth: depth, value: value, flag: (value <= alpha ? "upperbound" : (value >= beta ? "lowerbound" : "exact"))});
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
  
let oldBoard
let oldBoard2

function bestMove(possible, board, lastMove) {
    console.log(moveCount)
    nodes = 0
    transpositions = 0

    let best;
    let p = [];
    let maxTime

    possible = shuffle(possible)
    possible = order(possible, board)

    let maxDepth = 13 // 3 or 7 for rook + king mate // 3 for 2 rooks + king mate // 7 or 3 for queen + king mate
    if (moveCount > 50) {maxTime = 30000} else if (moveCount < 10) {maxTime = 5000} else {maxTime = 10000}
    //maxTime = 10000
    let start = Date.now()
    let stopSearch = false
    let d = 0

    for (let depth = 0; depth < maxDepth; depth++) {
        console.log('searching', depth)
        p = []
        for (let i = 0; i < possible.length; i++) {
            let value
            if (stopSearch) {
                value = 0
            } else {
                let newBoard = doMove(possible[i], board)
                lastMove = possible[i]
                value = tree(newBoard, depth, -Infinity, Infinity, false, lastMove) 
            }
            p.push(value)
            if (Date.now() - start > maxTime) {break}
            else if (value == 100000) {
                console.log('mate in', depth)
                stopSearch = true
            }
        }
        possible = possible.sort((a, b) => p[possible.indexOf(b)] - p[possible.indexOf(a)])
        if (Date.now() - start > maxTime) {break}
        console.log(p)
        console.log(possible)
        d = depth
        if (stopSearch) {break}
    }

    console.log('t:', transpositions)

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
    if (possible.length != 0) {

        if ((possible[0].toY == square2yx(lastfrom).y && possible[0].toX == square2yx(lastfrom).x) &&
            (possible[0].fromY == square2yx(lastto).y && possible[0].fromX == square2yx(lastto).x) && 
            possible.length > 1 && !d == 0) {
            console.log('repeat')
            best = possible[1]
        } else {
            best = possible[0]
        }

        if (best.toY == 7 && board[best.fromY][best.fromX] == "pawnblack") {
            promote = true;
        }
    }
    
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

function firetheengineup(lastMove) {

    console.time('engine')

    currentBoard = getBoard();

    //console.log("white material: " + whiteMaterial(currentBoard))
    //console.log("black material: " + blackMaterial(currentBoard))

    let possible = possiblemoves(currentBoard, "black", lastMove);
    console.log('pre', possible)
    possible = check(possible, currentBoard, 'black')
    console.log('aft', possible)

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
    else if (best.toY2 !== undefined) { // castle
        kinghasmoved = true
        let fromSquare2 = squares[best.fromY2 * 8 + best.fromX2]
        let toSquare2 = squares[best.toY2 * 8 + best.toX2]
        if (best.toX == 2) {console.log("cpu: O-O-O")}
        else {console.log("cpu: O-O")}
        toSquare.appendChild(fromSquare.firstChild)
        toSquare2.appendChild(fromSquare2.firstChild)
        lastfrom = best.fromY * 8 + best.fromX + 1
        lastto = best.toY * 8 + best.toX + 1
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
    }

    fromSquare.classList.add('enginefrom')
    toSquare.classList.add('engineto')

    blacksturn = false;
    console.log('nodes searched', nodes)
    }

    if (best === undefined){
        let msg
        if (isInCheck('black', currentBoard)) {msg = "you won, press ok to try again"}
        else {msg = "draw, press ok to try again"}
        setTimeout(() => {
            if (confirm(msg)) {
                window.location.reload()
            }
        }, 10)
    }

    currentBoard = doMove(best, currentBoard)
    let blackKingPosition = [0,0]
    let whiteKingPosition = [0,0]
    for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
            if (currentBoard[y][x] == 'kingblack') {blackKingPosition[0] = y; blackKingPosition[1] = x}
            if (currentBoard[y][x] == 'kingwhite') {whiteKingPosition[0] = y; whiteKingPosition[1] = x}
        }
    }
    console.log(whiteKingPosition, blackKingPosition)
    let whiteKingDistToCenter = Math.max(3 - whiteKingPosition[0], whiteKingPosition[0] - 4) + Math.max(3 - whiteKingPosition[1], whiteKingPosition[1] - 4)
    console.log(whiteKingDistToCenter)
    let distBetweenKings = absolute(blackKingPosition[0] - whiteKingPosition[0]) + absolute(blackKingPosition[1] - whiteKingPosition[1])
    console.log(distBetweenKings)
    console.log(whiteKingDistToCenter * 10 + (14 - distBetweenKings) * 4)

    console.timeEnd('engine')

    let updatedBoard = getBoard()
    if (oldBoard !== undefined) {oldBoard2 = oldBoard.map(row => row.slice());}
    oldBoard = updatedBoard.map(row => row.slice());
    let whitemoves = possiblemoves(updatedBoard, 'white', lastMove)
    whitemoves = check(whitemoves, updatedBoard, 'white')

    if (whitemoves.length == 0) {
        let msg
        if (isInCheck('white', currentBoard)) {msg = "you lost, press ok to try again"}
        else {msg = "draw, press ok to try again"}
        setTimeout(() => {
            if (confirm(msg)) {
                window.location.reload()
            }
        }, 10)
    }
}

//firetheengineup()

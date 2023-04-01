/*

    ABOUT:
    this is a chess engine written in javascript. It is a work in progress and is not yet complete. 
    It uses bitboards to represent the board and pieces. It uses a minimax algorithm with alpha-beta pruning to search the game tree.

    DEBUGGING

    console.log(bitboards.{BITBOARD_TYPE}.toString(2).padStart(64, '0')); //------------>    get the binary string for that bitboard
    

    const board = bitboards.{BITBOARD_TYPE}.toString(2).padStart(64, '0').split('');
    let boardDisplay = '';
    for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        const piece = board[row * 8 + col];
        if (piece === '1') {
        boardDisplay += 'X ';
        } else {
        boardDisplay += '. ';
        }
    }
    boardDisplay += '\n';
    }
    console.log(boardDisplay); //------------------------------------------------------->   display the binary string as an 8x8 board with X as 1 and . as 0 


    logBoard(bitboards) //-------------------------------------------------------------->   log the whole board with ranks and files
    */

    const p = 1
    const n = 2
    const b = 3
    const r = 4
    const q = 5
    const k = 6
    
    const P = -1
    const N = -2
    const B = -3
    const R = -4
    const Q = -5
    const K = -6
    
    const numbers = {
        'pawn': 100,
        'knight': 300,
        'bishop': 300,
        'rook': 500,
        'queen': 900,
        'king': 10000,
    }

    let selectedPiece;
    let startSquare;
    let endSquare;
    let black;
    let moveCount = 0;
    
    const squares = document.querySelectorAll('.square');
    const selectPieces = document.querySelectorAll('.select_piece');
    
    let whitePawns1 = 0x00000000;
    //console.log(whitePawns1.toString(2).padStart(32, '0'));
    let whitePawns2 = 0x00000000;
    let whiteKnights1 = 0x00000000;
    let whiteKnights2 = 0x00000000;
    let whiteBishops1 = 0x00000000;
    let whiteBishops2 = 0x00000000;
    let whiteRooks1 = 0x00000000;
    let whiteRooks2 = 0x00000000;
    let whiteQueens1 = 0x00000000;
    let whiteQueens2 = 0x00000000;
    let whiteKing1 = 0x00000000;
    let whiteKing2 = 0x00000000;
    
    let blackPawns1 = 0x00000000;
    let blackPawns2 = 0x00000000;
    let blackKnights1 = 0x00000000;
    let blackKnights2 = 0x00000000;
    let blackBishops1 = 0x00000000;
    let blackBishops2 = 0x00000000;
    let blackRooks1 = 0x00000000;
    let blackRooks2 = 0x00000000;
    let blackQueens1 = 0x00000000;
    let blackQueens2 = 0x00000000;
    let blackKing1 = 0x00000000;
    let blackKing2 = 0x00000000;
    
    let whitePieces1 = 0x00000000;
    let whitePieces2 = 0x00000000;
    let blackPieces1 = 0x00000000;
    let blackPieces2 = 0x00000000;
    let allPieces1 = 0x00000000;
    let allPieces2 = 0x00000000;
    let allPieces91 = 0x00000000;
    let allPieces92 = 0x00000000;
    let allPieces46R = 0x00000000;
    let allPieces47R = 0x00000000;
    let allPieces46L = 0x00000000;
    let allPieces47L = 0x00000000;

    let whiteAttacks1 = 0x00000000;
    let whiteAttacks2 = 0x00000000;

    let blackAttacks1 = 0x00000000;
    let blackAttacks2 = 0x00000000;
    
    let whiteCastleKingSide = false;
    let whiteCastleQueenSide = false;
    let blackCastleKingSide = false;
    let blackCastleQueenSide = false;
    
    let enPassantSquare1 = 0x00000000;
    let enPassantSquare2 = 0x00000000;
    
    let bitboards = {
        whitePawns : [whitePawns1, whitePawns2],
        whiteKnights: [whiteKnights1, whiteKnights2],
        whiteBishops: [whiteBishops1, whiteBishops2],
        whiteRooks: [whiteRooks1, whiteRooks2],
        whiteQueens: [whiteQueens1, whiteQueens2],
        whiteKing: [whiteKing1, whiteKing2],
        blackPawns: [blackPawns1, blackPawns2],
        blackKnights: [blackKnights1, blackKnights2],
        blackBishops: [blackBishops1, blackBishops2],
        blackRooks: [blackRooks1, blackRooks2],
        blackQueens: [blackQueens1, blackQueens2],
        blackKing: [blackKing1, blackKing2],
        whitePieces: [whitePieces1, whitePieces2],
        blackPieces: [blackPieces1, blackPieces2],
        allPieces: [allPieces1, allPieces2],
        allPieces90: [allPieces91, allPieces92],
        allPieces45R: [allPieces46R, allPieces47R],
        allPieces45L: [allPieces46L, allPieces47L],
        enPassantSquare: [enPassantSquare1, enPassantSquare2],
        whiteCastleKingSide: whiteCastleKingSide,
        whiteCastleQueenSide: whiteCastleQueenSide,
        blackCastleKingSide: blackCastleKingSide,
        blackCastleQueenSide: blackCastleQueenSide
    };

    console.log(bitboards.whiteCastleKingSide)
    
    let startPosition = [[r,n,b,q,k,b,n,r],
                         [p,p,p,p,p,p,p,p],
                         [0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0],
                         [P,P,P,P,P,P,P,P],
                         [R,N,B,Q,K,B,N,R]]
    
    let startPosition1= [[k,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0],
                         [0,0,0,0,r,0,0,0],
                         [0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,K]]

    let startPosition2 = [[r,0,b,0,k,0,0,r],
                        [0,p,p,0,0,p,p,p],
                        [p,0,0,0,0,n,0,0],
                        [0,0,0,P,q,0,0,0],
                        [0,0,0,0,P,0,0,0],
                        [0,0,N,0,0,P,0,0],
                        [P,P,0,0,Q,0,P,P],
                        [R,0,B,0,0,R,K,0]]
    
    function boardSetup() {
    
        let piece
        let color
        let s = -1
    
        for (let i = 0; i < 8; i++) {
            for (let x = 0; x < 8; x++) {
                s++
                if (startPosition[i][x] < 0) {
                    color = 'white'
                } else if (startPosition[i][x] > 0) {
                    color = 'black'
                }
                if (startPosition[i][x] != 0) {
                    if (startPosition[i][x] == k || startPosition[i][x] == K) {piece = 'king'}
                    else if (startPosition[i][x] == q || startPosition[i][x] == Q) {piece = 'queen'}
                    else if (startPosition[i][x] == r || startPosition[i][x] == R) {piece = 'rook'}
                    else if (startPosition[i][x] == b || startPosition[i][x] == B) {piece = 'bishop'}
                    else if (startPosition[i][x] == n || startPosition[i][x] == N) {piece = 'knight'}
                    else if (startPosition[i][x] == p || startPosition[i][x] == P) {piece = 'pawn'}
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
    
    function logBoard(bitboards) {
            let b = [
              ["0", "0", "0", "0", "0", "0", "0", "0"],
              ["0", "0", "0", "0", "0", "0", "0", "0"],
              ["0", "0", "0", "0", "0", "0", "0", "0"],
              ["0", "0", "0", "0", "0", "0", "0", "0"],
              ["0", "0", "0", "0", "0", "0", "0", "0"],
              ["0", "0", "0", "0", "0", "0", "0", "0"],
              ["0", "0", "0", "0", "0", "0", "0", "0"],
              ["0", "0", "0", "0", "0", "0", "0", "0"],
            ];
          
            let s = 31
            for (let i = 4; i < 8; i++) {
              for (let x = 0; x < 8; x++) {
                if (checkBit(bitboards.whitePawns[0], s)) {
                  b[i][x] = "P";
                } else if (checkBit(bitboards.blackPawns[0], s)) {
                  b[i][x] = "p";
                } else if (checkBit(bitboards.whiteKnights[0], s)) {
                  b[i][x] = "N";
                } else if (checkBit(bitboards.blackKnights[0], s)) {
                  b[i][x] = "n";
                } else if (checkBit(bitboards.whiteBishops[0], s)) {
                  b[i][x] = "B";
                } else if (checkBit(bitboards.blackBishops[0], s)) {
                  b[i][x] = "b";
                } else if (checkBit(bitboards.whiteRooks[0], s)) {
                  b[i][x] = "R";
                } else if (checkBit(bitboards.blackRooks[0], s)) {
                  b[i][x] = "r";
                } else if (checkBit(bitboards.whiteQueens[0], s)) {
                  b[i][x] = "Q";
                } else if (checkBit(bitboards.blackQueens[0], s)) {
                  b[i][x] = "q";
                } else if (checkBit(bitboards.whiteKing[0], s)) {
                  b[i][x] = "K";
                } else if (checkBit(bitboards.blackKing[0], s)) {
                  b[i][x] = "k";
                }
                s--;
                }
            }

            s = 31
            for (let i = 0; i < 4; i++) {
              for (let x = 0; x < 8; x++) {
                if (checkBit(bitboards.whitePawns[1], s)) {
                  b[i][x] = "P";
                } else if (checkBit(bitboards.blackPawns[1], s)) {
                  b[i][x] = "p";
                } else if (checkBit(bitboards.whiteKnights[1], s)) {
                  b[i][x] = "N";
                } else if (checkBit(bitboards.blackKnights[1], s)) {
                  b[i][x] = "n";
                } else if (checkBit(bitboards.whiteBishops[1], s)) {
                  b[i][x] = "B";
                } else if (checkBit(bitboards.blackBishops[1], s)) {
                  b[i][x] = "b";
                } else if (checkBit(bitboards.whiteRooks[1], s)) {
                  b[i][x] = "R";
                } else if (checkBit(bitboards.blackRooks[1], s)) {
                  b[i][x] = "r";
                } else if (checkBit(bitboards.whiteQueens[1], s)) {
                  b[i][x] = "Q";
                } else if (checkBit(bitboards.blackQueens[1], s)) {
                  b[i][x] = "q";
                } else if (checkBit(bitboards.whiteKing[1], s)) {
                  b[i][x] = "K";
                } else if (checkBit(bitboards.blackKing[1], s)) {
                  b[i][x] = "k";
                }
                s--;
                }
            }
            
                console.log(b.join("\n"));
                

                let castlingStr = '';
                if (bitboards.whiteCastleKingSide) {
                  castlingStr += 'K';
                }
                if (bitboards.whiteCastleQueenSide) {
                    castlingStr += 'Q'
                }
                if (bitboards.blackCastleKingSide) {
                castlingStr += 'k'
                }
                if (bitboards.blackCastleQueenSide) {
                    castlingStr += 'q'
                }
        console.log(castlingStr)
    }
    
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
    let blacksturn;
    let select = false;
    let lastfrom;
    let lastto;
    
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
    
                move = validate(startSquare, endSquare, piece)
    
                if (valid) {
                    if (square.hasChildNodes()) {
                        square.removeChild(square.firstChild);
                    }
                    square.appendChild(selectedPiece);
    
                    blacksturn = true;
                    moveCount ++;
    
                    if (lastfrom) {
                        squares[lastfrom].classList.remove('enginefrom')
                        squares[lastto].classList.remove('engineto')
                    }
                    
                    if (!select) {
                        setTimeout(() => {
                            firetheengineup();
                        }, 10)
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
        
            move = validate(startSquare, endSquare, piece)
    
            if (valid) {
                if (squares[endSquare - 1].hasChildNodes()) {
                    squares[endSquare - 1].removeChild(squares[endSquare - 1].firstChild);
                }
                squares[endSquare - 1].appendChild(squares[startSquare - 1].firstChild);
                squares[startSquare - 1].classList.remove('highlight')
                blacksturn = true;
                moveCount ++;
                if (lastfrom) {
                    squares[lastfrom].classList.remove('enginefrom')
                    squares[lastto].classList.remove('engineto')
                }
                
                if (!select) {
                    setTimeout(() => {
                        firetheengineup();
                    }, 10)
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
            
                        move = validate(startSquare, endSquare, piece)
            
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
                                    firetheengineup();
                                }, 10)
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

    const promotionTypes = ['knight', 'bishop', 'rook', 'queen']
    
    selectPieces.forEach(piece => {
        piece.addEventListener('click', function(event) {
            let p = event.target
            let selected = p.offsetParent.lastElementChild.className
    
            let piece = make(selected, 'white')
            piece.setAttribute("draggable", true);
            piece.addEventListener('dragstart', dragStart);
            piece.addEventListener('dragend', dragEnd);
            piece.addEventListener('click', click)
            squares[promoSquare].removeChild(squares[promoSquare].firstChild)
            squares[promoSquare].appendChild(piece)

            let promotesTo = promotionTypes.indexOf(selected)+1

            bitboards.whitePawns[1] = unsetBit(bitboards.whitePawns[1], (63-promoSquare) & 0x1F)

            if (promotesTo == 4) {
                bitboards.whiteQueens[1] = setBit(bitboards.whiteQueens[1], (63-promoSquare) & 0x1F);
            } else if (promotesTo == 3) {
                bitboards.whiteRooks[1] = setBit(bitboards.whiteRooks[1], (63-promoSquare) & 0x1F);
            } else if (promotesTo == 2) {
                bitboards.whiteBishops[1] = setBit(bitboards.whiteBishops[1], (63-promoSquare) & 0x1F);
            } else if (promotesTo == 1) {
                bitboards.whiteKnights[1] = setBit(bitboards.whiteKnights[1], (63-promoSquare) & 0x1F);
            }
    
            document.querySelector('.promote_selector').style.top = '-1000px'
            select = false
            setTimeout(() => {
                firetheengineup();
            }, 10)
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
            return 0;
        }
    }
    
    function getPieceColor(square) {
        if (squares[square - 1].lastElementChild) {
            return squares[square - 1].lastElementChild.lastElementChild.lastElementChild.className
        }
        else {
            return 0;
        }
    }
    
    function square2yx(square) {
        let y = Math.floor(square / 8);
        let x = square % 8;
        return {y: y, x: x}
    }
    
    /* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ USEFUL FUNCTIONS ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
    
    /*---------------------------------MOVE VALIDATION FOR WHITE---------------------------------*/
    
    let valid;
    
    function validate(f, t, piece) {
    
        let move = {from: 64-f, to: 64-t}
        console.log(move, '#########################################################')
        console.log('possible', possiblemoves(bitboards, true))
        let possible = possiblemoves(bitboards, true)
        let index = 0
        valid = false
    
        if (!select) {
            for (let i = 0; i < possible.length; i++) {
                let castleCheck = possible[i].castle ? (!illegalCastle(possible[i], bitboards, true) && !canCaptureKing(bitboards, true)) : true
                let newBoard = doMove(possible[i], bitboards, true)
                if (move.from == possible[i].from &&
                    move.to == possible[i].to && 
                    !canCaptureKing(newBoard, true) && 
                    castleCheck
                    ) {
                    valid = true
                    index = i
                    break
                }}
            if (valid) {
                if (possible[index].castle == 'kingSide') {
                    console.log("you: O-O");
                    squares[61].appendChild(squares[63].lastElementChild)  
                }
                else if (possible[index].castle == 'queenSide') {
                    console.log("you: O-O-O")
                    squares[59].appendChild(squares[56].lastElementChild) 
                }
                else if (possible[index].promotesTo) {
                    select = true
                    promoSquare = t - 1
                    document.querySelector('.promote_selector').style.top = '33%'
                    bitboards = doMove(move, bitboards, true)
                    return 0
                } else if (possible[index].enPassant) {
                    squares[t + 7].removeChild(squares[t + 7].firstChild);
                }
                else {
                    console.log("you: " + piece + " from " + f + " to " + t)
                }
                console.log(possible[index])
                bitboards = doMove(possible[index], bitboards, true)
                squares.forEach(square => {
                    square.classList.remove('enginefrom')
                    square.classList.remove('engineto')
                })
            }
        }
    }
    /*---------------------------------ENGINE STUFF---------------------------------*/
    
    function bitCount(num) {
        num -= (num >>> 1) & 0x55555555;
        num = (num & 0x33333333) + ((num >>> 2) & 0x33333333);
        num = (num + (num >>> 4)) & 0x0f0f0f0f;
        num += num >>> 8;
        num += num >>> 16;
        return num & 0x3f;
      }

    function not(n) {
        return ~n >>> 0
    }
    
    function getBoard() {
        let a = 1;
        let bit = 31
    
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 8; col++) {
              const piece = getPiece(a)
              if (piece != 0) {
                bitboards.allPieces[1] = setBit(bitboards.allPieces[1], bit);
                if (piece.endsWith('black')) {
                    bitboards.blackPieces[1] = setBit(bitboards.blackPieces[1], bit);
                } else {
                    bitboards.whitePieces[1] = setBit(bitboards.whitePieces[1], bit);
                }
                if (piece == 'pawnblack') {
                    bitboards.blackPawns[1] = setBit(bitboards.blackPawns[1], bit);}
                else if (piece == 'knightblack') {
                    bitboards.blackKnights[1] = setBit(bitboards.blackKnights[1], bit);}
                else if (piece == 'bishopblack') {
                    bitboards.blackBishops[1] = setBit(bitboards.blackBishops[1], bit);}
                else if (piece == 'rookblack') {
                    bitboards.blackRooks[1] = setBit(bitboards.blackRooks[1], bit);}
                else if (piece == 'queenblack') {
                    bitboards.blackQueens[1] = setBit(bitboards.blackQueens[1], bit);}
                else if (piece == 'kingblack') {
                    bitboards.blackKing[1] = setBit(bitboards.blackKing[1], bit);}
                else if (piece == 'pawnwhite') {
                    bitboards.whitePawns[1] = setBit(bitboards.whitePawns[1], bit);}
                else if (piece == 'knightwhite') {
                    bitboards.whiteKnights[1] = setBit(bitboards.whiteKnights[1], bit);}
                else if (piece == 'bishopwhite') {
                    bitboards.whiteBishops[1] = setBit(bitboards.whiteBishops[1], bit);}
                else if (piece == 'rookwhite') {
                    bitboards.whiteRooks[1] = setBit(bitboards.whiteRooks[1], bit);}
                else if (piece == 'queenwhite') {
                    bitboards.whiteQueens[1] = setBit(bitboards.whiteQueens[1], bit);}
                else if (piece == 'kingwhite') {
                    bitboards.whiteKing[1] = setBit(bitboards.whiteKing[1], bit);}
              }
              
              bit--
              a++
            }
          }
        bit = 31
    
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 8; col++) {
              const piece = getPiece(a)
              if (piece != 0) {
                bitboards.allPieces[0] = setBit(bitboards.allPieces[0], bit);
                if (piece.endsWith('black')) {
                    bitboards.blackPieces[0] = setBit(bitboards.blackPieces[0], bit);
                } else {
                    bitboards.whitePieces[0] = setBit(bitboards.whitePieces[0], bit);
                }
                if (piece == 'pawnblack') {
                    bitboards.blackPawns[0] = setBit(bitboards.blackPawns[0], bit);}
                else if (piece == 'knightblack') {
                    bitboards.blackKnights[0] = setBit(bitboards.blackKnights[0], bit);}
                else if (piece == 'bishopblack') {
                    bitboards.blackBishops[0] = setBit(bitboards.blackBishops[0], bit);}
                else if (piece == 'rookblack') {
                    bitboards.blackRooks[0] = setBit(bitboards.blackRooks[0], bit);}
                else if (piece == 'queenblack') {
                    bitboards.blackQueens[0] = setBit(bitboards.blackQueens[0], bit);}
                else if (piece == 'kingblack') {
                    bitboards.blackKing[0] = setBit(bitboards.blackKing[0], bit);}
                else if (piece == 'pawnwhite') {
                    bitboards.whitePawns[0] = setBit(bitboards.whitePawns[0], bit);}
                else if (piece == 'knightwhite') {
                    bitboards.whiteKnights[0] = setBit(bitboards.whiteKnights[0], bit);}
                else if (piece == 'bishopwhite') {
                    bitboards.whiteBishops[0] = setBit(bitboards.whiteBishops[0], bit);}
                else if (piece == 'rookwhite') {
                    bitboards.whiteRooks[0] = setBit(bitboards.whiteRooks[0], bit);}
                else if (piece == 'queenwhite') {
                    bitboards.whiteQueens[0] = setBit(bitboards.whiteQueens[0], bit);}
                else if (piece == 'kingwhite') {
                    bitboards.whiteKing[0] = setBit(bitboards.whiteKing[0], bit);}
              }
              
              bit--
              a++
            }
          }

          let s = 56
          let b = 0
          let all45R = bitboards.allPieces45R
          let all45L = bitboards.allPieces45L

          for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {


                let all = x > 3 ? bitboards.allPieces[0] : bitboards.allPieces[1]
                let all90 = y < 4 ? bitboards.allPieces90[0] : bitboards.allPieces90[1]
                if (checkBit(all, (s - 8 * x) % 32)) {
                    all90 = setBit(all90, b & 0x1F)
                    if (y < 4) {bitboards.allPieces90[0] = all90} else {bitboards.allPieces90[1] = all90}
                }
                
                all = y < 4 ? bitboards.allPieces[0] : bitboards.allPieces[1]
                
                if (checkBit(all, b)) {
                    let inde = Math.floor(rotated45R[b] >> 5) 
                    all45R[inde] = setBit(all45R[inde], rotated45R[b] & 0x1F)

                    inde = Math.floor(rotated45L[b] >> 5) 
                    all45L[inde] = setBit(all45L[inde], rotated45L[b] & 0x1F)
                }
                
                b++
            }
            s++
          }

            bitboards.allPieces45L[0] = all45L[0]
            bitboards.allPieces45L[1] = all45L[1]

            bitboards.allPieces45R[0] = all45R[0]
            bitboards.allPieces45R[1] = all45R[1]

            if (checkBit(bitboards.whiteKing[0], 3)) {
                if (checkBit(bitboards.whiteRooks[0], 0)) {
                    bitboards.whiteCastleKingSide = true
                }
                if (checkBit(bitboards.whiteRooks[0], 7)) {
                    bitboards.whiteCastleQueenSide = true
                }
            }
            if (checkBit(bitboards.blackKing[1], 27)) {
                if (checkBit(bitboards.blackRooks[1], 24)) {
                    bitboards.blackCastleKingSide = true
                }
                if (checkBit(bitboards.blackRooks[1], 31)) {
                    bitboards.blackCastleQueenSide = true
                }
            }
        
        return bitboards
    }

    function setBit(b, index) {
        let bitboard = b
        if (index === 31) {
          // Set the first bit to 1
          bitboard = (bitboard | 0x80000000)
        } else {
          // Set the bit at the given index to 1
          bitboard |= 1 << index;
        }
        bitboard >>>= 0
        return bitboard 
      }

    function unsetBit(b, index) {
        let bitboard = b
        bitboard &= not((1 << index));
        bitboard >>>= 0
    return bitboard
    }

    function checkBit(bitboard, index) {
        if (bitboard & 1 << index) {
            return true
        } else {
            return false
        }
    }

    function lsb(num) {
        return Math.clz32(num & -num) ^ 31;
      }

      function msb(num) {
        return 31 - Math.clz32(num);
      }

    function nextBit(num, lastBit) {
        let bit = lastBit
        if (lastBit == 0) {
            return msb(num)
        }
        bit--
        while (bit < 32) {
            if (checkBit(num, bit)) {
                return bit
            }
            bit--
        }
        return -1
    }
    
    function canCaptureKing(bitboards, isKingWhite) {
        // function to check wether the king can be captured by the enemy
    
        const king = isKingWhite ? bitboards.whiteKing : bitboards.blackKing
        const enemyKnights = isKingWhite ? bitboards.blackKnights : bitboards.whiteKnights
        const enemyKing = isKingWhite ? bitboards.blackKing : bitboards.whiteKing
        const enemyQueens = isKingWhite ? bitboards.blackQueens : bitboards.whiteQueens
        const enemyBishops = isKingWhite ? bitboards.blackBishops : bitboards.whiteBishops
        const enemyRooks = isKingWhite ? bitboards.blackRooks : bitboards.whiteRooks
        const enemyPawns = isKingWhite ? bitboards.blackPawns : bitboards.whitePawns
        const occupied = bitboards.allPieces
        const occupied90 = bitboards.allPieces90
        const occupied45R = bitboards.allPieces45R
        const occupied45L = bitboards.allPieces45L

        let lking

        if (bitCount(king[1]) != 0) {
            lking = msb(king[1]) + 32

        } else if (bitCount(king[0]) != 0) {
            lking = msb(king[0])
        } else {return true}

        if (kingAttacks[lking][1] & enemyKing[1] || kingAttacks[lking][0] & enemyKing[0]) {
            return true
        } else if (knightAttacks[lking][1] & enemyKnights[1] || knightAttacks[lking][0] & enemyKnights[0]) {
            return true
        } else if (generateBishopAttacks(lking, occupied45R, occupied45L)[1] & (enemyBishops[1] | enemyQueens[1]) ||
                    generateBishopAttacks(lking, occupied45R, occupied45L)[0] & (enemyBishops[0] | enemyQueens[0])) {
            return true
        } else if (generateRookAttacks(lking, occupied, occupied90)[1] & (enemyRooks[1] | enemyQueens[1]) ||
                    generateRookAttacks(lking, occupied, occupied90)[0] & (enemyRooks[0] | enemyQueens[0])) {
            return true
        } else if (generatePawnAttacks(lking, isKingWhite)[1] & enemyPawns[1] ||
                    generatePawnAttacks(lking, isKingWhite)[0] & enemyPawns[0]) {
            return true
        }
        return false
    }

    const rightmostFileMask = 0b00000001000000010000000100000001
    
    const leftmostFileMask = 0b10000000100000001000000010000000

    const whitePawnStartRank = 0b00000000000000001111111100000000

    const blackPawnStartRank = 0b00000000111111110000000000000000
                        
    function possiblemoves(bitboards, isWhiteToMove) {

        let possible = [];
        
        let enemyPieces
        let myPieces
        let castleQueen
        let castleKing
    
        let king
        let knights
        let queens
        let bishops
        let rooks
        let pawns

        switch (isWhiteToMove) {
            case true:
                enemyPieces = bitboards.blackPieces
                myPieces = bitboards.whitePieces
                castleQueen = bitboards.whiteCastleQueenSide
                castleKing = bitboards.whiteCastleKingSide
                king = bitboards.whiteKing
                knights = bitboards.whiteKnights
                queens = bitboards.whiteQueens
                bishops = bitboards.whiteBishops
                rooks = bitboards.whiteRooks
                pawns = bitboards.whitePawns
                break
            case false:
                enemyPieces = bitboards.whitePieces
                myPieces = bitboards.blackPieces
                castleQueen = bitboards.blackCastleQueenSide
                castleKing = bitboards.blackCastleKingSide
                king = bitboards.blackKing
                knights = bitboards.blackKnights
                queens = bitboards.blackQueens
                bishops = bitboards.blackBishops
                rooks = bitboards.blackRooks
                pawns = bitboards.blackPawns
                break
        }

        const occupied = bitboards.allPieces
        const occupied90 = bitboards.allPieces90
        const occupied45R = bitboards.allPieces45R
        const occupied45L = bitboards.allPieces45L

        let epSquare = bitboards.enPassantSquare

        let o
        let lking
        let kingMoves = []
        let index = 0

        if (bitCount(king[1]) != 0) {
            lking = lsb(king[1]) + 32
            kingMoves[1] = kingAttacks[lking][1] & not(myPieces[1])
            kingMoves[0] = kingAttacks[lking][0] & not(myPieces[0])
        } else if (bitCount(king[0]) != 0) {
            lking = lsb(king[0])
            kingMoves[1] = kingAttacks[lking][1] & not(myPieces[1])
            kingMoves[0] = kingAttacks[lking][0] & not(myPieces[0])
        } else {
            return []
        }

        for (let i = 0; i < bitCount(kingMoves[1]); i++) {
            let bit = nextBit(kingMoves[1], index)
            possible.push({from: lking, to: bit + 32, pieceType: 5})
            index = bit
        }
        index = 0
        for (let i = 0; i < bitCount(kingMoves[0]); i++) {
            let bit = nextBit(kingMoves[0], index)
            possible.push({from: lking, to: bit, pieceType: 5})
            index = bit
        }

        o = lking > 31 ? 1 : 0
        if (castleKing && ((!checkBit(occupied[o], (lking-1) & 0x1F)) && (!checkBit(occupied[o], (lking-2) & 0x1F)) && (checkBit(rooks[o], (lking-3) & 0x1F)))) {
            possible.push({from: lking, to: lking-2, castle: 'kingSide', pieceType: 5})
        }
        if (castleQueen && (!checkBit(occupied[o], (lking+1) & 0x1F) && (!checkBit(occupied[o], (lking+2) & 0x1F)) && (!checkBit(occupied[o], (lking+3) & 0x1F)) && (checkBit(rooks[o], (lking+4) & 0x1F)))) {
            possible.push({from: lking, to: lking+2, castle: 'queenSide', pieceType: 5})
        }

        index = 0

        for (let i = 0; i < bitCount(knights[1]); i++) {
            let lknight = nextBit(knights[1], index)
            index = lknight
            let knightMoves = []
            knightMoves[0] = knightAttacks[lknight + 32][0] & not(myPieces[0])
            knightMoves[1] = knightAttacks[lknight + 32][1] & not(myPieces[1])
            let nestIndex = 0
            for (let j = 0; j < bitCount(knightMoves[1]); j++) {
                let bit = nextBit(knightMoves[1], nestIndex)
                possible.push({from: lknight + 32, to: bit + 32, pieceType: 1})
                nestIndex = bit
            }
            nestIndex = 0
            for (let j = 0; j < bitCount(knightMoves[0]); j++) {
                let bit = nextBit(knightMoves[0], nestIndex)
                possible.push({from: lknight + 32, to: bit, pieceType: 1})
                nestIndex = bit
            }
        }

        index = 0

        for (let i = 0; i < bitCount(knights[0]); i++) {
            let lknight = nextBit(knights[0], index)
            index = lknight
            let knightMoves = []
            knightMoves[0] = knightAttacks[lknight][0] & not(myPieces[0])
            knightMoves[1] = knightAttacks[lknight][1] & not(myPieces[1])
            let nestIndex = 0
            for (let j = 0; j < bitCount(knightMoves[1]); j++) {
                let bit = nextBit(knightMoves[1], nestIndex)
                possible.push({from: lknight, to: bit + 32, pieceType: 1})
                nestIndex = bit
            }
            nestIndex = 0
            for (let j = 0; j < bitCount(knightMoves[0]); j++) {
                let bit = nextBit(knightMoves[0], nestIndex)
                possible.push({from: lknight, to: bit, pieceType: 1})
                nestIndex = bit
            }
        }

        index = 0

        for (let i = 0; i < bitCount(bishops[1]); i++) {
            let lbishop = nextBit(bishops[1], index)
            index = lbishop
            let bishopMoves = generateBishopMoves(lbishop + 32, occupied45R, occupied45L)
            bishopMoves[0] = bishopMoves[0] & not(myPieces[0])
            bishopMoves[1] = bishopMoves[1] & not(myPieces[1])
            let nestIndex = 0
            for (let j = 0; j < bitCount(bishopMoves[1]); j++) {
                let bit = nextBit(bishopMoves[1], nestIndex)
                possible.push({from: lbishop + 32, to: bit + 32, pieceType: 2})
                nestIndex = bit
            }
            nestIndex = 0
            for (let j = 0; j < bitCount(bishopMoves[0]); j++) {
                let bit = nextBit(bishopMoves[0], nestIndex)
                possible.push({from: lbishop + 32, to: bit, pieceType: 2})
                nestIndex = bit
            }
        }

        index = 0

        for (let i = 0; i < bitCount(bishops[0]); i++) {
            let lbishop = nextBit(bishops[0], index)
            index = lbishop
            let bishopMoves = generateBishopMoves(lbishop, occupied45R, occupied45L)
            bishopMoves[0] = bishopMoves[0] & not(myPieces[0])
            bishopMoves[1] = bishopMoves[1] & not(myPieces[1])
            let nestIndex = 0
            for (let j = 0; j < bitCount(bishopMoves[1]); j++) {
                let bit = nextBit(bishopMoves[1], nestIndex)
                possible.push({from: lbishop, to: bit + 32, pieceType: 2})
                nestIndex = bit
            }
            nestIndex = 0
            for (let j = 0; j < bitCount(bishopMoves[0]); j++) {
                let bit = nextBit(bishopMoves[0], nestIndex)
                possible.push({from: lbishop, to: bit, pieceType: 2})
                nestIndex = bit
            }
        }

        index = 0

        for (let i = 0; i < bitCount(rooks[1]); i++) {
            let lrook = nextBit(rooks[1], index)
            index = lrook
            let rookMoves = generateRookMoves(lrook + 32, occupied, occupied90)
            rookMoves[0] = rookMoves[0] & not(myPieces[0])
            rookMoves[1] = rookMoves[1] & not(myPieces[1])
            let nestIndex = 0
            for (let j = 0; j < bitCount(rookMoves[1]); j++) {
                let bit = nextBit(rookMoves[1], nestIndex)
                possible.push({from: lrook + 32, to: bit + 32, pieceType: 3})
                nestIndex = bit
            }
            nestIndex = 0
            for (let j = 0; j < bitCount(rookMoves[0]); j++) {
                let bit = nextBit(rookMoves[0], nestIndex)
                possible.push({from: lrook + 32, to: bit, pieceType: 3})
                nestIndex = bit
            }
        }

        index = 0

        for (let i = 0; i < bitCount(rooks[0]); i++) {
            let lrook = nextBit(rooks[0], index)
            index = lrook
            let rookMoves = generateRookMoves(lrook, occupied, occupied90)
            rookMoves[0] = rookMoves[0] & not(myPieces[0])
            rookMoves[1] = rookMoves[1] & not(myPieces[1])
            let nestIndex = 0
            for (let j = 0; j < bitCount(rookMoves[1]); j++) {
                let bit = nextBit(rookMoves[1], nestIndex)
                possible.push({from: lrook, to: bit + 32, pieceType: 3})
                nestIndex = bit
            }
            nestIndex = 0
            for (let j = 0; j < bitCount(rookMoves[0]); j++) {
                let bit = nextBit(rookMoves[0], nestIndex)
                possible.push({from: lrook, to: bit, pieceType: 3})
                nestIndex = bit
            }
        }

        index = 0

        for (let i = 0; i < bitCount(queens[1]); i++) {
            let lqueen = nextBit(queens[1], index)
            index = lqueen
            let queenMoves = generateBishopMoves(lqueen + 32, occupied45R, occupied45L)
            let otherqueenMoves = generateRookMoves(lqueen + 32, occupied, occupied90)
            queenMoves[0] = queenMoves[0] & not(myPieces[0])
            queenMoves[1] = queenMoves[1] & not(myPieces[1])
            otherqueenMoves[0] = otherqueenMoves[0] & not(myPieces[0])
            otherqueenMoves[1] = otherqueenMoves[1] & not(myPieces[1])
            queenMoves[0] |= otherqueenMoves[0]
            queenMoves[1] |= otherqueenMoves[1]
            let nestIndex = 0
            for (let j = 0; j < bitCount(queenMoves[1]); j++) {
                let bit = nextBit(queenMoves[1], nestIndex)
                possible.push({from: lqueen + 32, to: bit + 32, pieceType: 4})
                nestIndex = bit
            }
            nestIndex = 0
            for (let j = 0; j < bitCount(queenMoves[0]); j++) {
                let bit = nextBit(queenMoves[0], nestIndex)
                possible.push({from: lqueen + 32, to: bit, pieceType: 4})
                nestIndex = bit
            }
        }

        index = 0

        for (let i = 0; i < bitCount(queens[0]); i++) {
            let lqueen = nextBit(queens[0], index)
            index = lqueen
            let queenMoves = generateBishopMoves(lqueen, occupied45R, occupied45L)
            let otherqueenMoves = generateRookMoves(lqueen, occupied, occupied90)
            queenMoves[0] = queenMoves[0] & not(myPieces[0])
            queenMoves[1] = queenMoves[1] & not(myPieces[1])
            otherqueenMoves[0] = otherqueenMoves[0] & not(myPieces[0])
            otherqueenMoves[1] = otherqueenMoves[1] & not(myPieces[1])
            queenMoves[0] |= otherqueenMoves[0]
            queenMoves[1] |= otherqueenMoves[1]
            let nestIndex = 0
            for (let j = 0; j < bitCount(queenMoves[1]); j++) {
                let bit = nextBit(queenMoves[1], nestIndex)
                possible.push({from: lqueen, to: bit + 32, pieceType: 4})
                nestIndex = bit
            }
            nestIndex = 0
            for (let j = 0; j < bitCount(queenMoves[0]); j++) {
                let bit = nextBit(queenMoves[0], nestIndex)
                possible.push({from: lqueen, to: bit, pieceType: 4})
                nestIndex = bit
            }
        }

        index = 0

        for (let i = 0; i < bitCount(pawns[1]); i++) {
            let lpawn = nextBit(pawns[1], index) + 32
            let pawnMoves = generatePawnMoves(lpawn, occupied, enemyPieces, isWhiteToMove, epSquare)

            let nestIndex = 0
            for (let j = 0; j < bitCount(pawnMoves[1]); j++) {
                let bit = nextBit(pawnMoves[1], nestIndex)
                if (bit == lsb(epSquare[1])) {
                    possible.push({from: lpawn, to: bit + 32, enPassant: true, pieceType: 0})
                } else if (Math.abs(lpawn-32-bit) == 16) {
                    possible.push({from: lpawn, to: bit + 32, createsEnPassant: true, pieceType: 0})
                } else if (Math.floor((bit + 32)/8) == 7) {
                    possible.push({from: lpawn, to: bit + 32, promotesTo: 4, pieceType: 0});
                    possible.push({from: lpawn, to: bit + 32, promotesTo: 3, pieceType: 0});
                    possible.push({from: lpawn, to: bit + 32, promotesTo: 2, pieceType: 0});
                    possible.push({from: lpawn, to: bit + 32, promotesTo: 1, pieceType: 0});
                } else {
                    possible.push({from: lpawn, to: bit + 32, pieceType: 0})
                }
                nestIndex = bit
            }
            nestIndex = 0
            for (let j = 0; j < bitCount(pawnMoves[0]); j++) {
                let bit = nextBit(pawnMoves[0], nestIndex)
                possible.push({from: lpawn, to: bit, pieceType: 0})
                nestIndex = bit
            }
            index = lpawn - 32
        }

        index = 0

        for (let i = 0; i < bitCount(pawns[0]); i++) {
            let lpawn = nextBit(pawns[0], index)
            let pawnMoves = generatePawnMoves(lpawn, occupied, enemyPieces, isWhiteToMove, epSquare)

            let nestIndex = 0
            for (let j = 0; j < bitCount(pawnMoves[1]); j++) {
                let bit = nextBit(pawnMoves[1], nestIndex)
                possible.push({from: lpawn, to: bit + 32, pieceType: 0})
                nestIndex = bit
            }
            nestIndex = 0
            for (let j = 0; j < bitCount(pawnMoves[0]); j++) {
                let bit = nextBit(pawnMoves[0], nestIndex)
                if (bit == lsb(epSquare[0])) {
                    possible.push({from: lpawn, to: bit, enPassant: true, pieceType: 0})
                } else if (Math.abs(lpawn-bit) == 16) {
                    possible.push({from: lpawn, to: bit, createsEnPassant: true, pieceType: 0})
                } else if (Math.floor(bit/8) == 0) {
                    possible.push({from: lpawn, to: bit, promotesTo: 4, pieceType: 0});
                    possible.push({from: lpawn, to: bit, promotesTo: 3, pieceType: 0});
                    possible.push({from: lpawn, to: bit, promotesTo: 2, pieceType: 0});
                    possible.push({from: lpawn, to: bit, promotesTo: 1, pieceType: 0});
                } else {
                    possible.push({from: lpawn, to: bit, pieceType: 0})
                }
                nestIndex = bit
            }
            index = lpawn
        }
        return possible
    }

    function illegalCastle(move, bitboards, isWhiteToMove) {
        let betweenMove
        if (move.castle == 'queenSide') {
            betweenMove = {from: move.from, to: move.to - 1}
        } else {
            betweenMove = {from: move.from, to: move.to + 1}
        }
        let newBoard = doMove(betweenMove, bitboards, isWhiteToMove) // cant castle if in check while moving the king
        if (canCaptureKing(newBoard, isWhiteToMove)) {
            return true
        }
        return false
    }

    function checkCheckmate(possible, bitboards, isWhiteToMove) {
        for (let i = 0; i < possible.length; i++) {
            let check = false
            if (possible[i].castle) {
                check = illegalCastle(possible[i], bitboards, isWhiteToMove)
            } else {
                let newBoard = doMove(possible[i], bitboards, isWhiteToMove)
                if (canCaptureKing(newBoard, isWhiteToMove)) {
                    check = true
                }
            }
            if (check) {
                possible.splice(i, 1)
                i--
            }
        }

        return canCaptureKing(bitboards, isWhiteToMove) ? possible.length > 0 : false
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
    
    function abs(number) {
        if (number < 0) {
            return -1 * number
        } else {
            return number
        }
    }

    const knightAttacks = new Array(64)

    for (let i = 0; i < 64; i++) {
        
        let knightboard = [0x00000000, 0x00000000]

        let o
        if (i % 8 < 6 && Math.floor(i / 8) != 7) {
            o = i+10 > 31 ? 1 : 0
            knightboard[o] = setBit(knightboard[o], i+10)
            }
        if (i % 8 > 1 && Math.floor(i / 8) != 0) {
            o = i-10 > 31 ? 1 : 0
            knightboard[o] = setBit(knightboard[o], i-10)}
        if (i % 8 != 7 && Math.floor(i / 8) < 6) {
            o = i+17 > 31 ? 1 : 0
            knightboard[o] = setBit(knightboard[o], i+17)}
        if (i % 8 != 0 && Math.floor(i / 8) > 1) {
            o = i-17 > 31 ? 1 : 0
            knightboard[o] = setBit(knightboard[o], i-17)}
        if (i % 8 != 0 && Math.floor(i / 8) < 6) {
            o = i+15 > 31 ? 1 : 0
            knightboard[o] = setBit(knightboard[o], i+15)}
        if (i % 8 != 7 && Math.floor(i / 8) > 1) {
            o = i-15 > 31 ? 1 : 0
            knightboard[o] = setBit(knightboard[o], i-15)}
        if (i % 8 > 1 && Math.floor(i / 8) != 7) {
            o = i+6 > 31 ? 1 : 0
            knightboard[o] = setBit(knightboard[o], i+6)}
        if (i % 8 < 6 && Math.floor(i / 8) != 0) {
            o = i-6 > 31 ? 1 : 0
            knightboard[o] = setBit(knightboard[o], i-6)}

        knightAttacks[i] = knightboard
    }

    const kingAttacks = new Array(64)

    for (let i = 0; i < 64; i++) {
        
        let kingboard = [0x00000000, 0x00000000]

        let o

        if (i % 8 != 7) {
            o = i+1 > 31 ? 1 : 0
            kingboard[o] = setBit(kingboard[o], i+1)}
        if (i % 8 != 0 && Math.floor(i / 8) != 7) {
            o = i+7 > 31 ? 1 : 0
            kingboard[o] = setBit(kingboard[o], i+7)}
        if (Math.floor(i / 8) != 7) {
            o = i+8 > 31 ? 1 : 0
            kingboard[o] = setBit(kingboard[o], i+8)}
        if (i % 8 != 7 && Math.floor(i / 8) != 7) {
            o = i+9 > 31 ? 1 : 0
            kingboard[o] = setBit(kingboard[o], i+9)}
        if (i % 8 != 0) {
            o = i-1 > 31 ? 1 : 0
            kingboard[o] = setBit(kingboard[o], i-1)}
        if (i % 8 != 7 && Math.floor(i / 8) != 0) {
            o = i-7 > 31 ? 1 : 0
            kingboard[o] = setBit(kingboard[o], i-7)}
        if (Math.floor(i / 8) != 0) {
            o = i-8 > 31 ? 1 : 0
            kingboard[o] = setBit(kingboard[o], i-8)}
        if (i % 8 != 0 && Math.floor(i / 8) != 0) {
            o = i-9 > 31 ? 1 : 0
            kingboard[o] = setBit(kingboard[o], i-9)}

        kingAttacks[i] = kingboard
    }
    
    let nodes = 0

    function leftShift(board, amount) {
        for (let i = 0; i < amount; i++) {
            if (checkBit(board, 30)) {
                board = unsetBit(board, 30)
                board <<= 1
                board = setBit(board, 31)
            } else {
                board <<= 1
            }
        }
        return board
    }

    // function leftShiftBoth(b, amount) {
    //     let boards = [b[0], b[1]]
    //     for (let i = 0; i < amount; i++) {
    //         if (checkBit(boards[0], 31)) {
    //             boards[0] = unsetBit(boards[0], 31)
    //             boards[0] <<= 1
    //             boards[1] <<= 1
    //             boards[1] = setBit(boards[1], 0)
    //         } else {
    //             boards[0] <<= 1
    //             boards[1] <<= 1
    //         }
    //         boards[0] >>>= 0
    //         boards[1] >>>= 0
    //     }
    //     return boards
    // }

    let testb = [0b01000100000000000000000000001000, 
                 0b00001010011000000001010011000000]

    boardDisplay(testb[1])
    boardDisplay(testb[0])

    testb = leftShiftBoth(testb, 13)

    boardDisplay(testb[1])
    boardDisplay(testb[0])

    function leftShiftBoth(b, amount) {
        let boards = [b[0], b[1]]
        if (amount > Math.clz32(boards[0])) {
            boards[1] = boards[1] << amount | boards[0] >>> (32 - amount)
            boards[0] = boards[0] << amount
        } else {
            boards[0] = boards[0] << amount
            boards[1] = boards[1] << amount
        }
        boards[0] >>>= 0
        boards[1] >>>= 0
        return boards
    }

    // function rightShiftBoth(b, amount) {
    //     let boards = [b[0], b[1]]
    //     for (let i = 0; i < amount; i++) {
    //         if (checkBit(boards[1], 0)) {
    //             boards[1] = unsetBit(boards[1], 0)
    //             boards[1] >>>= 1
    //             boards[0] >>>= 1
    //             boards[0] = setBit(boards[0], 31)
    //         } else {
    //             boards[1] >>>= 1
    //             boards[0] >>>= 1
    //         }
    //     }
    //     return boards
    // }

    function rightShiftBoth(b, amount) {
        let boards = [b[0], b[1]]
        if (amount > lsb(boards[1])) {
            boards[0] = boards[0] >>> amount | boards[1] << (32 - amount)
            boards[1] = boards[1] >>> amount
        } else {
            boards[0] = boards[0] >>> amount
            boards[1] = boards[1] >>> amount
        }
        boards[0] >>>= 0
        boards[1] >>>= 0

        return boards
    }

    const rotated90 = [
        7, 15, 23, 31, 39, 47, 55, 63,
        6, 14, 22, 30, 38, 46, 54, 62,
        5, 13, 21, 29, 37, 45, 53, 61,
        4, 12, 20, 28, 36, 44, 52, 60,
        3, 11, 19, 27, 35, 43, 51, 59,
        2, 10, 18, 26, 34, 42, 50, 58,
        1, 9,  17, 25, 33, 41, 49, 57,
        0, 8,  16, 24, 32, 40, 48, 56
    ]

    // const rotated45R = [
    //     0,
    //     8, 1,
    //     16, 9, 2,
    //     24, 17, 10, 3,
    //     32, 25, 18, 11, 4,
    //     40, 33, 26, 19, 12, 5,
    //     48, 41, 34, 27, 20, 13, 6,
    //     56, 49, 42, 35, 28, 21, 14, 7,
    //     57, 50, 43, 36, 29, 22, 15,
    //     58, 51, 44, 37, 30, 23,
    //     59, 52, 45, 38, 31,
    //     60, 53, 46, 39,
    //     61, 54, 47,
    //     62, 55,
    //     63
    // ]

    const rotated45R = [
         0,  2,  5,  9, 14, 20, 27, 35, 
         1,  4,  8, 13, 19, 26, 34, 42, 
         3,  7, 12, 18, 25, 33, 41, 48, 
         6, 11, 17, 24, 32, 40, 47, 53, 
        10, 16, 23, 31, 39, 46, 52, 57, 
        15, 22, 30, 38, 45, 51, 56, 60, 
        21, 29, 37, 44, 50, 55, 59, 62, 
        28, 36, 43, 49, 54, 58, 61, 63
    ]

    // const rotated45L = [
    //     7,
    //     6, 15,
    //     5, 14, 23,
    //     4, 13, 22, 31,
    //     3, 12, 21, 30, 39,
    //     2, 11, 20, 29, 38, 47,
    //     1, 10, 19, 28, 37, 46, 55,
    //     0, 9, 18, 27, 36, 45, 54, 63,
    //     8, 17, 26, 35, 44, 53, 62,
    //     16, 25, 34, 43, 52, 61,
    //     24, 33, 42, 51, 60,
    //     32, 41, 50, 59,
    //     40, 49, 58,
    //     48, 57,
    //     56
    // ]

    const rotated45L = [
        28, 21, 15, 10,  6,  3,  1,  0, 
        36, 29, 22, 16, 11,  7,  4,  2, 
        43, 37, 30, 23, 17, 12,  8,  5, 
        49, 44, 38, 31, 24, 18, 13,  9, 
        54, 50, 45, 39, 32, 25, 19, 14, 
        58, 55, 51, 46, 40, 33, 26, 20, 
        61, 59, 56, 52, 47, 41, 34, 27, 
        63, 62, 60, 57, 53, 48, 42, 35
    ]


    const rookRowAttacks = new Array(64)

    for (let i = 0; i < 64; i++) {
        rookRowAttacks[i] = new Array(256)
        // for each square
        let o = i > 31 ? 1 : 0

        for (let j = 0; j < 256; j++) {
            // there is an 8 bit number representing the occuancy of the rank
            let fullRookRankAttacks = [0x00000000, 0x00000000]
            let indexboard = 0b00000000 | j

            let rookboard = 0b00000000
            let dx = -1

            for (let t = 0; t < 2; t++) { // generate rook moves left and right
                let target = i % 8 + dx
                if ((i%8 == 7 && dx > 0) || (i%8 == 0 && dx < 0)) {
                    // todo nothing, somehow negating the condition didn't work, will fix later
                } else {
                    while (true) {
                        if ((target == 7 && dx > 0) || (target == 0 && dx < 0)) {
                            rookboard = setBit(rookboard, target)
                            break
                        } else if (checkBit(indexboard, target)) { // indexboard being the occupied bits
                            rookboard = setBit(rookboard, target)
                            break
                        } else {
                            rookboard = setBit(rookboard, target)
                            target += dx
                        }
                    }}
                    if (t == 0) {dx = 1}
            }

            fullRookRankAttacks[o] |= rookboard // put the rank on the least significant bits of the full board
            fullRookRankAttacks[o] = leftShift(fullRookRankAttacks[o], ((Math.floor(i/8)) * 8) % 32) // shift them back to the rank of the square

            rookRowAttacks[i][j] = fullRookRankAttacks
        }
    }

    const rookFileAttacks = new Array(64)

    for (let i = 0; i < 64; i++) {
        rookFileAttacks[i] = new Array(256)
        // for each square

        for (let j = 0; j < 256; j++) {
            // there is an 8 bit number representing the occuancy of the rank
            let fullRookFileAttacks = [0x00000000, 0x00000000]
            let indexboard = 0b00000000 | j

            let dx = 1

            for (let t = 0; t < 2; t++) { // generate rook moves left and right
                let target = i % 8 + dx
                if ((i%8 == 7 && dx > 0) || (i%8 == 0 && dx < 0)) {
                    
                } else {
                    while (true) {
                        let h = target < 4 ? 1 : 0
                        if ((target == 7 && dx > 0) || (target == 0 && dx < 0)) {
                            fullRookFileAttacks[h] = setBit(fullRookFileAttacks[h], rotated90[rotated90[rotated90[i]]]%8 + 8*((7-target)%4))
                            break
                        } else if (checkBit(indexboard, target)) { // indexboard being the occupied bits
                            fullRookFileAttacks[h] = setBit(fullRookFileAttacks[h], rotated90[rotated90[rotated90[i]]]%8 + 8*((7-target)%4))
                            break
                        } else {
                            fullRookFileAttacks[h] = setBit(fullRookFileAttacks[h], rotated90[rotated90[rotated90[i]]]%8 + 8*((7-target)%4))
                            target += dx
                        }
                    }}
                if (t == 0) {dx = -1}
            }
            rookFileAttacks[i][j] = fullRookFileAttacks
        }
    }

    const bishopTopDownAttacksR = new Array(64)

    const diagonalLenR = [
        0,1,2,3,4,5,6,7,
        1,2,3,4,5,6,7,6,
        2,3,4,5,6,7,6,5,
        3,4,5,6,7,6,5,4,
        4,5,6,7,6,5,4,3,
        5,6,7,6,5,4,3,2,
        6,7,6,5,4,3,2,1,
        7,6,5,4,3,2,1,0
    ]

    const positionInDiagonalR = [
        0,1,2,3,4,5,6,7,
        0,1,2,3,4,5,6,6,
        0,1,2,3,4,5,5,5,
        0,1,2,3,4,4,4,4,
        0,1,2,3,3,3,3,3,
        0,1,2,2,2,2,2,2,
        0,1,1,1,1,1,1,1,
        0,0,0,0,0,0,0,0
    ]

    for (let i = 0; i < 64; i++) {
        bishopTopDownAttacksR[i] = new Array(256)

        for (let j = 0; j < 256; j++) {
            let bishopAttacks = [0x00000000, 0x00000000]
            let indexboard = 0b00000000 | j
            
            let dx = 1
            
            for (let t = 0; t < 2; t++) {
                let target

                target = positionInDiagonalR[i] + dx
                
                if ((positionInDiagonalR[i] == diagonalLenR[i] && dx > 0) || (positionInDiagonalR[i] == 0 && dx < 0)) {
                    
                } else {
                    while (true) {
                        let h = i + (positionInDiagonalR[i] - target) * 7 > 31 ? 1 : 0
                        
                        if ((target >= diagonalLenR[i] && dx > 0) || (target == 0 && dx < 0)) {
                            bishopAttacks[h] = setBit(bishopAttacks[h], (i + (positionInDiagonalR[i] - target)*7) & 0x1F)
                            break
                        } else if (checkBit(indexboard, target)) {
                            bishopAttacks[h] = setBit(bishopAttacks[h], (i + (positionInDiagonalR[i] - target)*7) & 0x1F)
                            break
                        } else {
                            bishopAttacks[h] = setBit(bishopAttacks[h], (i + (positionInDiagonalR[i] - target)*7) & 0x1F)
                            target += dx
                        }
                    }}
                if (t == 0) {dx = -1}
            }
            bishopTopDownAttacksR[i][j] = bishopAttacks
        }
    }

    const bishopTopDownAttacksL = new Array(64)

    const diagonalLenL = [
        7,6,5,4,3,2,1,0,
        6,7,6,5,4,3,2,1,
        5,6,7,6,5,4,3,2,
        4,5,6,7,6,5,4,3,
        3,4,5,6,7,6,5,4,
        2,3,4,5,6,7,6,5,
        1,2,3,4,5,6,7,6,
        0,1,2,3,4,5,6,7
    ]

    const positionInDiagonalL = [
        7,6,5,4,3,2,1,0,
        6,6,5,4,3,2,1,0,
        5,5,5,4,3,2,1,0,
        4,4,4,4,3,2,1,0,
        3,3,3,3,3,2,1,0,
        2,2,2,2,2,2,1,0,
        1,1,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0
    ]

    for (let i = 0; i < 64; i++) {
        bishopTopDownAttacksL[i] = new Array(256)

        for (let j = 0; j < 256; j++) {
            let bishopAttacks = [0x00000000, 0x00000000]
            let indexboard = 0b00000000 | j
            
            let dx = 1
            
            for (let t = 0; t < 2; t++) {
                let target

                target = positionInDiagonalL[i] + dx
                
                if ((positionInDiagonalL[i] == diagonalLenL[i] && dx > 0) || (positionInDiagonalL[i] == 0 && dx < 0)) {
                    
                } else {
                    while (true) {
                        let h = i + (positionInDiagonalL[i] - target) * 9 > 31 ? 1 : 0
                        if ((target >= diagonalLenL[i] && dx > 0) || (target == 0 && dx < 0)) {
                            bishopAttacks[h] = setBit(bishopAttacks[h], (i + (positionInDiagonalL[i] - target)*9) & 0x1F)
                            break
                        } else if (checkBit(indexboard, diagonalLenL[i]-target)) {
                            bishopAttacks[h] = setBit(bishopAttacks[h], (i + (positionInDiagonalL[i] - target)*9) & 0x1F)
                            break
                        } else {
                            bishopAttacks[h] = setBit(bishopAttacks[h], (i + (positionInDiagonalL[i] - target)*9) & 0x1F)
                            target += dx
                        }
                    }}
                if (t == 0) {dx = -1}
            }
            bishopTopDownAttacksL[i][j] = bishopAttacks
        }
    }

    function generateRookRankAttacks(rookIndex, occupied) {
        let o = rookIndex > 31 ? 1 : 0
        return [rookRowAttacks[rookIndex][(occupied[o] >> Math.floor((rookIndex % 32) / 8) * 8) & 255][0],
                rookRowAttacks[rookIndex][(occupied[o] >> Math.floor((rookIndex % 32) / 8) * 8) & 255][1]]
    }

    function generateRookFileAttacks(rookIndex, occupied90) {
        let o = rookIndex > 31 ? 1 : 0
        return [rookFileAttacks[rookIndex][(occupied90[o] >> Math.floor((rookIndex % 32) / 8) * 8) & 255][0],
                rookFileAttacks[rookIndex][(occupied90[o] >> Math.floor((rookIndex % 32) / 8) * 8) & 255][1]]
    }

    function generateRookMoves(rookIndex, occupied, occupied90) {

        let attacks = generateRookRankAttacks(rookIndex, occupied)
        let otherAttacks = generateRookFileAttacks(rotated90[rookIndex], occupied90)
        attacks[0] = (attacks[0] | otherAttacks[0]) >>> 0
        attacks[1] = (attacks[1] | otherAttacks[1]) >>> 0

        return attacks
    }

    function generateRookAttacks(rookIndex, occupied, occupied90) {
        let attacks = generateRookRankAttacks(rookIndex, occupied)
        let otherAttacks = generateRookFileAttacks(rotated90[rookIndex], occupied90)
        attacks[0] = (attacks[0] | otherAttacks[0]) >>> 0
        attacks[1] = (attacks[1] | otherAttacks[1]) >>> 0

        // attacks[0] = (attacks[0] & enemyPieces[0]) >>> 0
        // attacks[1] = (attacks[1] & enemyPieces[1]) >>> 0

        return attacks
    }

    const diagonalShiftAmountTop = [
        0,  0,  0,  0,  4,  4,  4,  4, 
        4,  4,  4, 11, 11, 11, 11, 11,
       11, 17, 17, 17, 17, 17, 22, 22,
       22, 22, 26, 26, 26, 29, 29, 31
   ]

   const diagonalShiftAmountBottom = [
        0,  1,  1,  3,  3,  3,  6,  6,
        6,  6, 10, 10, 10, 10, 10, 15,
       15, 15, 15, 15, 15, 21, 21, 21,
       21, 21, 21, 21,  0,  0,  0,  0
  ]

    function generateBishopTL2BRAttacks(bishopIndex, occupied45L) {

        let placeInRotated45L = rotated45L[bishopIndex]

        let o = placeInRotated45L > 31 ? 1 : 0

        let diagonalShiftAmount = placeInRotated45L > 31 ? diagonalShiftAmountTop : diagonalShiftAmountBottom

        let shiftedBits = placeInRotated45L > 27 && placeInRotated45L < 36 ?

        (255 & ((occupied45L[0] >>> 28) | (occupied45L[1] & 255) << 4)) :

        255 & (occupied45L[o] >>> diagonalShiftAmount[placeInRotated45L & 0x1F])

        return [bishopTopDownAttacksL[bishopIndex][shiftedBits][0], bishopTopDownAttacksL[bishopIndex][shiftedBits][1]]
    }

    function generateBishopTR2BLAttacks(bishopIndex, occupied45R) {

        let placeInRotated45R = rotated45R[bishopIndex]

        let o = placeInRotated45R > 31 ? 1 : 0

        let diagonalShiftAmount = placeInRotated45R > 31 ? diagonalShiftAmountTop : diagonalShiftAmountBottom

        let shiftedBits = placeInRotated45R > 27 && placeInRotated45R < 36 ?

        (255 & ((occupied45R[0] >>> 28) | (occupied45R[1] & 255) << 4)) :

        255 & (occupied45R[o] >>> diagonalShiftAmount[placeInRotated45R & 0x1F])

        return [bishopTopDownAttacksR[bishopIndex][shiftedBits][0], bishopTopDownAttacksR[bishopIndex][shiftedBits][1]]
    }

    function generateBishopMoves(bishopIndex, occupied45R, occupied45L) {

        let attacks = generateBishopTL2BRAttacks(bishopIndex, occupied45L)

        let otherAttacks = generateBishopTR2BLAttacks(bishopIndex, occupied45R)

        attacks[0] = (attacks[0] | otherAttacks[0]) >>> 0
        attacks[1] = (attacks[1] | otherAttacks[1]) >>> 0

        return attacks
    }


    function generateBishopAttacks(bishopIndex, occupied45R, occupied45L) {

        let attacks = generateBishopTL2BRAttacks(bishopIndex, occupied45L)
        let otherAttacks = generateBishopTR2BLAttacks(bishopIndex, occupied45R)

        attacks[0] = (attacks[0] | otherAttacks[0]) >>> 0
        attacks[1] = (attacks[1] | otherAttacks[1]) >>> 0

        // attacks[0] = (attacks[0] & enemyPieces[0]) >>> 0
        // attacks[1] = (attacks[1] & enemyPieces[1]) >>> 0

        return attacks
    }

    function generatePawnMoves(pawnIndex, occupied, enemyPieces, isWhitePawn, enPassantSquare) {
        // todo use precomputed table instead
        if (isWhitePawn) {
            let pawn = [0x00000000, 0x00000000]
            let o = Math.floor(pawnIndex >> 5)
            pawn[o] = setBit(pawn[o], pawnIndex & 0x1F)
            let attacks = leftShiftBoth(pawn, 7)

            attacks[0] &= not(leftmostFileMask)
            attacks[1] &= not(leftmostFileMask)

            let otherattacks = leftShiftBoth(pawn, 9)

            otherattacks[0] &= not(rightmostFileMask)
            otherattacks[1] &= not(rightmostFileMask)

            let step = leftShiftBoth(pawn, 8)

            step[0] &= not(occupied[0])
            step[1] &= not(occupied[1])

            if (pawn[o] & whitePawnStartRank) {
                let step2 = leftShiftBoth(step, 8)
                step[0] |= step2[0] & not(occupied[0])
                step[1] |= step2[1] & not(occupied[1])
            }

            attacks[0] |= otherattacks[0]
            attacks[1] |= otherattacks[1]

            attacks[0] &= enemyPieces[0] | enPassantSquare[0] 
            attacks[1] &= enemyPieces[1] | enPassantSquare[1]

            return [attacks[0] | step[0], attacks[1] | step[1]]

        } else {
            let pawn = [0x00000000, 0x00000000]
            let o = Math.floor(pawnIndex >> 5)
            pawn[o] = setBit(pawn[o], pawnIndex & 0x1F)
            
            let attacks = rightShiftBoth(pawn, 9)

            attacks[0] &= not(leftmostFileMask)
            attacks[1] &= not(leftmostFileMask)

            let otherattacks = rightShiftBoth(pawn, 7)

            otherattacks[0] &= not(rightmostFileMask)
            otherattacks[1] &= not(rightmostFileMask)

            let step = rightShiftBoth(pawn, 8)

            step[0] &= not(occupied[0])
            step[1] &= not(occupied[1])

            if (pawn[o] & blackPawnStartRank) {
                let step2 = rightShiftBoth(step, 8)
                step[0] |= step2[0] & not(occupied[0])
                step[1] |= step2[1] & not(occupied[1])
            }

            attacks[0] |= otherattacks[0]
            attacks[1] |= otherattacks[1]

            attacks[0] &= enemyPieces[0] | enPassantSquare[0]
            attacks[1] &= enemyPieces[1] | enPassantSquare[1]

            return [attacks[0] | step[0], attacks[1] | step[1]]
        }
    }

    function generatePawnAttacks(pawnIndex, isWhitePawn) {
        if (isWhitePawn) {
            let pawn = [0x00000000, 0x00000000]
            let o = Math.floor(pawnIndex >> 5)
            pawn[o] = setBit(pawn[o], pawnIndex & 0x1F)
            let attacks = leftShiftBoth(pawn, 7)

            attacks[0] &= not(leftmostFileMask)
            attacks[1] &= not(leftmostFileMask)

            let otherattacks = leftShiftBoth(pawn, 9)

            otherattacks[0] &= not(rightmostFileMask)
            otherattacks[1] &= not(rightmostFileMask)

            attacks[0] |= otherattacks[0]
            attacks[1] |= otherattacks[1]

            return [attacks[0], attacks[1]]

        } else {
            let pawn = [0x00000000, 0x00000000]
            let o = Math.floor(pawnIndex >> 5)
            pawn[o] = setBit(pawn[o], pawnIndex & 0x1F)
            
            let attacks = rightShiftBoth(pawn, 9)

            attacks[0] &= not(leftmostFileMask)
            attacks[1] &= not(leftmostFileMask)

            let otherattacks = rightShiftBoth(pawn, 7)

            otherattacks[0] &= not(rightmostFileMask)
            otherattacks[1] &= not(rightmostFileMask)

            attacks[0] |= otherattacks[0]
            attacks[1] |= otherattacks[1]

            return [attacks[0], attacks[1]]
        }
    }

    const indexArray = Array.from({length: 64}, (_, i) => i > 31 ? 1 : 0);
    const indexArrayR45 = rotated45R.map(val => val > 31 ? 1 : 0);
    const indexArrayL45 = rotated45L.map(val => val > 31 ? 1 : 0);
    const indexArray90 = rotated90.map(val => val > 31 ? 1 : 0);

    function updateObject(originalObj) {
        // Define the new arrays
      
        // Make a shallow copy of the original object
        const updatedObj = { ...originalObj };

        updatedObj.array1 = [originalObj.array1[0], originalObj.array1[1], originalObj.array1[2]]
        updatedObj.array2 = [...originalObj.array2]
      
        // Update the first array
        updatedObj.array1[1] = 10;
      
        // Update the second array
        updatedObj.array2[2] = 11;
      
        // Return both the original object and the updated object as a new object
        return updatedObj
      }
      
      const originalObj = {
        array1: [1, 2, 3],
        array2: [4, 5, 6],
        array3: [7, 8, 9],
      };
      
      console.log(originalObj);
      const updatedObj = updateObject(originalObj);
      console.log(updatedObj);

    
    function doMove(move, b, isWhiteMove) {
        

        let bitboards = {...b}

        // the goal of this function is to update the bitboards
        // it will only update the bitboards that are affected by the move and use a copy for that

        let f = indexArray[move.from]
        let t = indexArray[move.to]

        let f90 = indexArray90[move.from]
        let t90 = indexArray90[move.to]

        let f45R = indexArrayR45[move.from]
        let t45R = indexArrayR45[move.to]

        let f45L = indexArrayL45[move.from]
        let t45L = indexArrayL45[move.to]

        // set the new bit in all necesarry boards
        // we use a copy of the board to avoid mutating the original
        // todo find a way to make it actually work
        bitboards.allPieces = [...b.allPieces]
        bitboards.allPieces90 = [...b.allPieces90]
        bitboards.allPieces45R = [...b.allPieces45R]
        bitboards.allPieces45L = [...b.allPieces45L]

        bitboards.allPieces[t] = setBit(bitboards.allPieces[t], move.to & 0x1F)
        bitboards.allPieces90[t90] = setBit(bitboards.allPieces90[t90], rotated90[move.to] & 0x1F)
        bitboards.allPieces45R[t45R] = setBit(bitboards.allPieces45R[t45R], rotated45R[move.to] & 0x1F)
        bitboards.allPieces45L[t45L] = setBit(bitboards.allPieces45L[t45L], rotated45L[move.to] & 0x1F)

        // remove the bit from where it was
        bitboards.allPieces[f] = unsetBit(bitboards.allPieces[f], move.from & 0x1F);
        bitboards.allPieces90[f90] = unsetBit(bitboards.allPieces90[f90], rotated90[move.from] & 0x1F);
        bitboards.allPieces45R[f45R] = unsetBit(bitboards.allPieces45R[f45R], rotated45R[move.from] & 0x1F)
        bitboards.allPieces45L[f45L] = unsetBit(bitboards.allPieces45L[f45L], rotated45L[move.from] & 0x1F)

        // now for the specific pieces

        if (isWhiteMove) {
            bitboards.whitePieces = [...b.whitePieces]
            if (move.enPassant) {
                // En passant capture
                bitboards.blackPawns = [...b.blackPawns]
                bitboards.blackPieces = [...b.blackPieces]

                bitboards.blackPawns[t] = unsetBit(bitboards.blackPawns[t], (move.to - 8) & 0x1F)
                bitboards.blackPieces[t] = unsetBit(bitboards.blackPieces[t], (move.to - 8) & 0x1F)

                bitboards.allPieces[t] = unsetBit(bitboards.allPieces[t], (move.to - 8) & 0x1F) // here the board is already a copy, so we can mutate it
                bitboards.allPieces90[t90] = unsetBit(bitboards.allPieces90[t90], rotated90[move.to - 8] & 0x1F)
                bitboards.allPieces45R[t45R] = unsetBit(bitboards.allPieces45R[t45R], rotated45R.indexOf(move.to - 8) & 0x1F)
                bitboards.allPieces45L[t45L] = unsetBit(bitboards.allPieces45L[t45L], rotated45L.indexOf(move.to - 8) & 0x1F)
    
            } else if (checkBit(bitboards.blackPieces[t], move.to & 0x1F)) {
                // if the piece captures a piece
                // here we dont need to remove the bit from the occupied squares, because we will just overwrite it

                bitboards.blackPieces = [...b.blackPieces]
                bitboards.blackPieces[t] = unsetBit(bitboards.blackPieces[t], move.to & 0x1F);

                if (checkBit(bitboards.blackPawns[t], move.to & 0x1F)) {
                    bitboards.blackPawns = [...b.blackPawns]
                    bitboards.blackPawns[t] = unsetBit(bitboards.blackPawns[t], move.to & 0x1F);
        
                } else if (checkBit(bitboards.blackBishops[t], move.to & 0x1F)) {
                    bitboards.blackBishops = [...b.blackBishops]
                    bitboards.blackBishops[t] = unsetBit(bitboards.blackBishops[t], move.to & 0x1F);
        
                } else if (checkBit(bitboards.blackKnights[t], move.to & 0x1F)) {
                    bitboards.blackKnights = [...b.blackKnights]
                    bitboards.blackKnights[t] = unsetBit(bitboards.blackKnights[t], move.to & 0x1F);
        
                } else if (checkBit(bitboards.blackRooks[t], move.to & 0x1F)) {
                    bitboards.blackRooks = [...b.blackRooks]
                    bitboards.blackRooks[t] = unsetBit(bitboards.blackRooks[t], move.to & 0x1F);
        
                } else if (checkBit(bitboards.blackQueens[t], move.to & 0x1F)) {
                    bitboards.blackQueens = [...b.blackQueens]
                    bitboards.blackQueens[t] = unsetBit(bitboards.blackQueens[t], move.to & 0x1F);
        
                } else if (checkBit(bitboards.blackKing[t], move.to & 0x1F)) {
                    bitboards.blackKing = [...b.blackKing]
                    bitboards.blackKing[t] = unsetBit(bitboards.blackKing[t], move.to & 0x1F); // in theory this should never happen because the search will stop if one player has no moves
                }
                // remove the captured bit from all the boards its part of
            }
            
            bitboards.whitePieces[t] = setBit(bitboards.whitePieces[t], move.to & 0x1F)
            bitboards.whitePieces[f] = unsetBit(bitboards.whitePieces[f], move.from & 0x1F);

            if (checkBit(bitboards.whitePawns[f], move.from & 0x1F)) {
                bitboards.whitePawns = [...b.whitePawns]
                bitboards.whitePawns[f] = unsetBit(bitboards.whitePawns[f], move.from & 0x1F);
                if (move.to >= 56) {
                    // Pawn promotion
                    if (move.promotesTo == 4) {
                        bitboards.whiteQueens = [...b.whiteQueens]
                        bitboards.whiteQueens[t] = setBit(bitboards.whiteQueens[t], move.to & 0x1F);
                    } else if (move.promotesTo == 3) {
                        bitboards.whiteRooks = [...b.whiteRooks]
                        bitboards.whiteRooks[t] = setBit(bitboards.whiteRooks[t], move.to & 0x1F);
                    } else if (move.promotesTo == 2) {
                        bitboards.whiteBishops = [...b.whiteBishops]
                        bitboards.whiteBishops[t] = setBit(bitboards.whiteBishops[t], move.to & 0x1F);
                    } else if (move.promotesTo == 1) {
                        bitboards.whiteKnights = [...b.whiteKnights]
                        bitboards.whiteKnights[t] = setBit(bitboards.whiteKnights[t], move.to & 0x1F);
                    }
                } else {
                    bitboards.whitePawns[t] = setBit(bitboards.whitePawns[t], move.to & 0x1F);
                }
            }
            else if (checkBit(bitboards.whiteKnights[f], move.from & 0x1F)) {
                bitboards.whiteKnights = [...b.whiteKnights]
                bitboards.whiteKnights[t] = setBit(bitboards.whiteKnights[t], move.to & 0x1F)
                bitboards.whiteKnights[f] = unsetBit(bitboards.whiteKnights[f], move.from & 0x1F);

            } else if (checkBit(bitboards.whiteBishops[f], move.from & 0x1F)) {
                bitboards.whiteBishops = [...b.whiteBishops]
                bitboards.whiteBishops[t] = setBit(bitboards.whiteBishops[t], move.to & 0x1F)
                bitboards.whiteBishops[f] = unsetBit(bitboards.whiteBishops[f], move.from & 0x1F);

            } else if (checkBit(bitboards.whiteRooks[f], move.from & 0x1F)) {
                bitboards.whiteRooks = [...b.whiteRooks]
                bitboards.whiteRooks[t] = setBit(bitboards.whiteRooks[t], move.to & 0x1F)
                bitboards.whiteRooks[f] = unsetBit(bitboards.whiteRooks[f], move.from & 0x1F);
                if (bitboards.whiteCastleQueenSide && move.from & 0x1F == 7) {
                    bitboards.whiteCastleQueenSide = false
                } else if (bitboards.whiteCastleKingSide && move.from & 0x1F == 0) {
                    bitboards.whiteCastleKingSide = false
                }
            } else if (checkBit(bitboards.whiteQueens[f], move.from & 0x1F)) {
                bitboards.whiteQueens = [...b.whiteQueens]
                bitboards.whiteQueens[t] = setBit(bitboards.whiteQueens[t], move.to & 0x1F)
                bitboards.whiteQueens[f] = unsetBit(bitboards.whiteQueens[f], move.from & 0x1F);

            } else if (checkBit(bitboards.whiteKing[f], move.from & 0x1F)) {
                bitboards.whiteKing = [...b.whiteKing]
                bitboards.whiteKing[t] = setBit(bitboards.whiteKing[t], move.to & 0x1F)
                bitboards.whiteKing[f] = unsetBit(bitboards.whiteKing[f], move.from & 0x1F);
                if (move.castle) {
                    bitboards.whiteRooks = [...b.whiteRooks]
                    let s 
                    let o
                    if (move.castle == 'kingSide') {s = 0; o = 2} else {s = 7; o = 4}
                        // put the rook on its new sqaure
                        bitboards.allPieces[f] = unsetBit(bitboards.allPieces[f], s & 0x1F)
                        bitboards.allPieces90[f90] = unsetBit(bitboards.allPieces90[f90], rotated90[s] & 0x1F)
                        bitboards.allPieces45R[f45R] = unsetBit(bitboards.allPieces45R[f45R], rotated45R[s] & 0x1F)
                        bitboards.allPieces45L[f45L] = unsetBit(bitboards.allPieces45L[f45L], rotated45L[s] & 0x1F)
                        bitboards.whitePieces[f] = unsetBit(bitboards.whitePieces[f], s & 0x1F)
                        bitboards.whiteRooks[f] = unsetBit(bitboards.whiteRooks[f], s & 0x1F)

                        bitboards.allPieces[t] = setBit(bitboards.allPieces[t], o & 0x1F)
                        bitboards.allPieces90[t90] = setBit(bitboards.allPieces90[t90], rotated90[o] & 0x1F)
                        bitboards.allPieces45R[t45R] = setBit(bitboards.allPieces45R[t45R], rotated45R[o] & 0x1F)
                        bitboards.allPieces45L[t45L] = setBit(bitboards.allPieces45L[t45L], rotated45L[o] & 0x1F)
                        bitboards.whitePieces[t] = setBit(bitboards.whitePieces[t], o & 0x1F)
                        bitboards.whiteRooks[t] = setBit(bitboards.whiteRooks[t], o & 0x1F)
                    }
                bitboards.whiteCastleQueenSide = false
                bitboards.whiteCastleKingSide = false
                fuck = true
                
            }
    
            bitboards.enPassantSquare[1] = 0x00000000
            bitboards.enPassantSquare[0] = 0x00000000

            if (move.createsEnPassant) {
                bitboards.enPassantSquare[f] = setBit(bitboards.enPassantSquare[f], move.to - 8)
            }
    
        } else {
            // Black move
            bitboards.blackPieces = [...b.blackPieces]
            if (move.enPassant) {
                // En passant capture
                bitboards.whitePieces = [...b.whitePieces]
                bitboards.whitePawns = [...b.whitePawns]
                bitboards.whitePawns[t] = unsetBit(bitboards.whitePawns[t], (move.to + 8) & 0x1F)
                bitboards.whitePieces[t] = unsetBit(bitboards.whitePieces[t], (move.to + 8) & 0x1F)
                
                bitboards.allPieces[t] = unsetBit(bitboards.allPieces[t], (move.to + 8) & 0x1F)
                bitboards.allPieces90[t90] = unsetBit(bitboards.allPieces90[t90], rotated90[move.to + 8] & 0x1F)
                bitboards.allPieces45R[t45R] = unsetBit(bitboards.allPieces45R[t45R], rotated45R[move.to + 8] & 0x1F)
                bitboards.allPieces45L[t45L] = unsetBit(bitboards.allPieces45L[t45L], rotated45L[move.to + 8] & 0x1F)
    
            } else if (checkBit(bitboards.whitePieces[t], move.to & 0x1F)) {
                bitboards.whitePieces = [...b.whitePieces]
                bitboards.whitePieces[t] = unsetBit(bitboards.whitePieces[t], move.to & 0x1F);

                if (checkBit(bitboards.whitePawns[t], move.to & 0x1F)) {
                    bitboards.whitePawns = [...b.whitePawns]
                    bitboards.whitePawns[t] = unsetBit(bitboards.whitePawns[t], move.to & 0x1F);
        
                } else if (checkBit(bitboards.whiteBishops[t], move.to & 0x1F)) {
                    bitboards.whiteBishops = [...b.whiteBishops]
                    bitboards.whiteBishops[t] = unsetBit(bitboards.whiteBishops[t], move.to & 0x1F);
        
                } else if (checkBit(bitboards.whiteKnights[t], move.to & 0x1F)) {
                    bitboards.whiteKnights = [...b.whiteKnights]
                    bitboards.whiteKnights[t] = unsetBit(bitboards.whiteKnights[t], move.to & 0x1F);
        
                } else if (checkBit(bitboards.whiteRooks[t], move.to & 0x1F)) {
                    bitboards.whiteRooks = [...b.whiteRooks]
                    bitboards.whiteRooks[t] = unsetBit(bitboards.whiteRooks[t], move.to & 0x1F);
        
                } else if (checkBit(bitboards.whiteQueens[t], move.to & 0x1F)) {
                    bitboards.whiteQueens = [...b.whiteQueens]
                    bitboards.whiteQueens[t] = unsetBit(bitboards.whiteQueens[t], move.to & 0x1F);
        
                } else if (checkBit(bitboards.whiteKing[t], move.to & 0x1F)) {
                    bitboards.whiteKing = [...b.whiteKing]
                    bitboards.whiteKing[t] = unsetBit(bitboards.whiteKing[t], move.to & 0x1F);
        
                }
            }
            
            bitboards.blackPieces[t] = setBit(bitboards.blackPieces[t], move.to & 0x1F)
            bitboards.blackPieces[f] = unsetBit(bitboards.blackPieces[f], move.from & 0x1F);
    
            if (checkBit(bitboards.blackPawns[f], move.from & 0x1F)) {
                bitboards.blackPawns = [...b.blackPawns]
                bitboards.blackPawns[f] = unsetBit(bitboards.blackPawns[f], move.from & 0x1F);
                if (move.to <= 7) {
                    // Pawn promotion
                    if (move.promotesTo == 4) {
                        bitboards.blackQueens = [...b.blackQueens]
                        bitboards.blackQueens[t] = setBit(bitboards.blackQueens[t], move.to & 0x1F);
                    } else if (move.promotesTo == 3) {
                        bitboards.blackRooks = [...b.blackRooks]
                        bitboards.blackRooks[t] = setBit(bitboards.blackRooks[t], move.to & 0x1F);
                    } else if (move.promotesTo == 2) {
                        bitboards.blackBishops = [...b.blackBishops]
                        bitboards.blackBishops[t] = setBit(bitboards.blackBishops[t], move.to & 0x1F);
                    } else if (move.promotesTo == 1) {
                        bitboards.blackKnights = [...b.blackKnights]
                        bitboards.blackKnights[t] = setBit(bitboards.blackKnights[t], move.to & 0x1F);
                    }
                } else {
                    bitboards.blackPawns[t] = setBit(bitboards.blackPawns[t], move.to & 0x1F);
                }
            }
            else if (checkBit(bitboards.blackKnights[f], move.from & 0x1F)) {
                bitboards.blackKnights = [...b.blackKnights]
                bitboards.blackKnights[t] = setBit(bitboards.blackKnights[t], move.to & 0x1F)
                bitboards.blackKnights[f] = unsetBit(bitboards.blackKnights[f], move.from & 0x1F);

            } else if (checkBit(bitboards.blackBishops[f], move.from & 0x1F)) {
                bitboards.blackBishops = [...b.blackBishops]
                bitboards.blackBishops[t] = setBit(bitboards.blackBishops[t], move.to & 0x1F)
                bitboards.blackBishops[f] = unsetBit(bitboards.blackBishops[f], move.from & 0x1F);

            } else if (checkBit(bitboards.blackRooks[f], move.from & 0x1F)) {
                bitboards.blackRooks = [...b.blackRooks]
                bitboards.blackRooks[t] = setBit(bitboards.blackRooks[t], move.to & 0x1F)
                bitboards.blackRooks[f] = unsetBit(bitboards.blackRooks[f], move.from & 0x1F);
                if (bitboards.blackCastleQueenSide && move.from & 0x1F == 31) {
                    bitboards.blackCastleQueenSide = false
                } else if (bitboards.blackCastleKingSide && move.from & 0x1F == 24) {
                    bitboards.blackCastleKingSide = false
                }
            } else if (checkBit(bitboards.blackQueens[f], move.from & 0x1F)) {
                bitboards.blackQueens = [...b.blackQueens]
                bitboards.blackQueens[t] = setBit(bitboards.blackQueens[t], move.to & 0x1F)
                bitboards.blackQueens[f] = unsetBit(bitboards.blackQueens[f], move.from & 0x1F);

            } else if (checkBit(bitboards.blackKing[f], move.from & 0x1F)) {
                bitboards.blackKing = [...b.blackKing]
                bitboards.blackKing[t] = setBit(bitboards.blackKing[t], move.to & 0x1F)
                bitboards.blackKing[f] = unsetBit(bitboards.blackKing[f], move.from & 0x1F);
                if (move.castle) {
                    bitboards.blackRooks = [...b.blackRooks]
                    let s 
                    let o
                    if (move.castle == 'kingSide') {s = 56; o = 58} else {s = 63; o = 60}
                        // put the rook on its new sqaure
                        bitboards.allPieces[f] = unsetBit(bitboards.allPieces[f], s & 0x1F)
                        bitboards.allPieces90[f90] = unsetBit(bitboards.allPieces90[f90], rotated90[s] & 0x1F)
                        bitboards.allPieces45R[f45R] = unsetBit(bitboards.allPieces45R[f45R], rotated45R[s] & 0x1F)
                        bitboards.allPieces45L[f45L] = unsetBit(bitboards.allPieces45L[f45L], rotated45L[s] & 0x1F)
                        bitboards.blackPieces[f] = unsetBit(bitboards.blackPieces[f], s & 0x1F)
                        bitboards.blackRooks[f] = unsetBit(bitboards.blackRooks[f], s & 0x1F)

                        bitboards.allPieces[t] = setBit(bitboards.allPieces[t], o & 0x1F)
                        bitboards.allPieces90[t90] = setBit(bitboards.allPieces90[t90], rotated90[o] & 0x1F)
                        bitboards.allPieces45R[t45R] = setBit(bitboards.allPieces45R[t45R], rotated45R[o] & 0x1F)
                        bitboards.allPieces45L[t45L] = setBit(bitboards.allPieces45L[t45L], rotated45L[o] & 0x1F)
                        bitboards.blackPieces[t] = setBit(bitboards.blackPieces[t], o & 0x1F)
                        bitboards.blackRooks[t] = setBit(bitboards.blackRooks[t], o & 0x1F)
                    }
                bitboards.blackCastleQueenSide = false
                bitboards.blackCastleKingSide = false
            }
    
            bitboards.enPassantSquare[1] = 0x00000000
            bitboards.enPassantSquare[0] = 0x00000000

            if (move.createsEnPassant) {
                bitboards.enPassantSquare[f] = setBit(bitboards.enPassantSquare[f], move.to + 8)
            }
        }
        return bitboards
    }

    let fuck = false

    const PIECE_VALUES = [100, 300, 300, 500, 900, 10000]

    function Material(bitboards) {
        let material = []
        let bmaterial = 0
        let wmaterial = 0;
        const bitboardValues = Object.values(bitboards);
        for (let i = 0; i < 12; i++) {
            let bitboard = bitboardValues[i];
            let value = PIECE_VALUES[i % 6] * (bitCount(bitboard[0]) + bitCount(bitboard[1]))
            if (i < 6) {
                wmaterial += value;
            } else {
                bmaterial += value;
            }
        }
        material.push(bmaterial - wmaterial)
        material.push(bmaterial)
        material.push(wmaterial)
        return material;
    }

    function boardDisplay (bitboard) {
        const board = bitboard.toString(2).padStart(32, '0').split('');
        let boardDisplay = '';
        for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row * 8 + col];
            if (piece === '1') {
            boardDisplay += 'X ';
            } else {
            boardDisplay += '. ';
            }
        }
        boardDisplay += '\n';
        }
        console.log(boardDisplay);
    }

    // const pawnEval = [
    //     32, 32, 32, 32, 32, 32, 32, 32,
    //     16, 16, 16, 16, 16, 16, 16, 16,
    //      8,  8,  8,  8,  8,  8,  8,  8,
    //      0,  0,  0, 64, 64,  0,  0,  0,
    //      0,  0, 16, 64, 64, 16,  0,  0,
    //      0,  0,  0, 32, 32,  0,  0,  0,
    //      0,  0,  0,-96,-96,  0,  0,  0,
    //      0,  0,  0,  0,  0,  0,  0,  0
    // ]

    const pawnEval = [
         0,  0,  0,  0,  0,  0,  0,  0,
         0,  0,  0,-96,-96,  0,  0,  0,
         0,  0,  0, 32, 32,  0,  0,  0,
         0,  0, 16, 64, 64, 16,  0,  0,
         0,  0,  0, 64, 64,  0,  0,  0,
         8,  8,  8,  8,  8,  8,  8,  8,
        16, 16, 16, 16, 16, 16, 16, 16,
        32, 32, 32, 32, 32, 32, 32, 32
    ]

    const knightEval = [
        -96,-96,-96,-96,-96,-96,-96,-96,
        -96, 24, 24, 24, 24, 24, 24,-96,
        -96, 24, 64, 64, 64, 64, 24,-96,
        -96, 24, 64, 96, 96, 64, 24,-96,
        -96, 24, 64, 96, 96, 64, 24,-96,
        -96, 24, 64, 64, 64, 64, 24,-96,
        -96, 24, 24, 24, 24, 24, 24,-96,
        -96,-96,-96,-96,-96,-96,-96,-96
    ]

    const bishopEval = [
        -40,-40,-40,-40,-40,-40,-40,-40,
        -40, 16, 16, 16, 16, 16, 16,-40,
        -40, 16, 32, 32, 32, 32, 16,-40,
        -40, 16, 32, 48, 48, 32, 16,-40,
        -40, 16, 32, 48, 48, 32, 16,-40,
        -40, 16, 32, 32, 32, 32, 16,-40,
        -40, 16, 16, 16, 16, 16, 16,-40,
        -40,-40,-40,-40,-40,-40,-40,-40
    ]

    const rookEval = [
         0,  0, 10, 15, 15, 10,  0,  0,
         0,  0, 10, 15, 15, 10,  0,  0,
         0,  0, 10, 15, 15, 10,  0,  0,
         0,  0, 10, 15, 15, 10,  0,  0,
         0,  0, 10, 15, 15, 10,  0,  0,
         0,  0, 10, 15, 15, 10,  0,  0,
         0,  0, 10, 15, 15, 10,  0,  0,
         0,  0, 10, 15, 15, 10,  0,  0
    ]

    const queenEval = [
         0,  0,  0,  0,  0,  0,  0,  0,
         0,  0,  0,  0,  0,  0,  0,  0,
         0,  0, 72, 72, 72, 72,  0,  0,
         0,  0, 72, 96, 96, 72,  0,  0,
         0,  0, 72, 96, 96, 72,  0,  0,
         0,  0, 72, 72, 72, 72,  0,  0,
         0,  0,  0,  0,  0,  0,  0,  0,
         0,  0,  0,  0,  0,  0,  0,  0
    ]

    // const kingEval = [
    //     -900,-900,-900,-900,-900,-900,-900,-900,
    //     -900,-900,-900,-900,-900,-900,-900,-900,
    //     -900,-900,-900,-900,-900,-900,-900,-900,
    //     -900,-900,-900,-900,-900,-900,-900,-900,
    //     -900,-900,-900,-900,-900,-900,-900,-900,
    //     -700,-700,-700,-700,-700,-700,-700,-700,
    //     -200,-200,-500,-500,-500,-500,-200,-200,
    //      200, 300, 100,-300, 300, 100, 300, 200
    // ]

    const kingEval = [
        200, 300, 100,-300, 300, 100, 300, 200,
        -200,-200,-500,-500,-500,-500,-200,-200,
        -700,-700,-700,-700,-700,-700,-700,-700,
        -900,-900,-900,-900,-900,-900,-900,-900,
        -900,-900,-900,-900,-900,-900,-900,-900,
        -900,-900,-900,-900,-900,-900,-900,-900,
        -900,-900,-900,-900,-900,-900,-900,-900,
        -900,-900,-900,-900,-900,-900,-900,-900
    ]

    const kingEvalEnd = [
          0,  30,  50, 200, 200,  50,  30,   0,
         30,  50, 100, 300, 300, 100,  50,  30,
         50, 100, 200, 400, 400, 200, 100,  50,
        200, 300, 400, 500, 500, 400, 300, 200,
        200, 300, 400, 500, 500, 400, 300, 200,
         50, 100, 200, 400, 400, 200, 100,  50,
         30,  50, 100, 300, 300, 100,  50,  30,
          0,  30,  50, 200, 200,  50,  30,   0
    ]



    function evaluate(BITBOARDS) {
        
        let material = Material(BITBOARDS)
        let evaluation = material[0]

        let black = material[1]
        let white = material[2]
    
        if ((black < 12000 || white < 12000) && moveCount > 30) { // endgame
            // todo
            let blackKingPosition = [100, 100]
            let whiteKingPosition = [100, 100]
            for (let x = 0; x < 8; x++) {
                if (board[4][x] == p) {evaluation += 4}
                if (board[5][x] == p) {evaluation += 8}
                if (board[6][x] == p) {evaluation += 16}
                if (board[7][x] == p) {evaluation += 32}
                for (let y = 0; y < 8; y++) {
                    if (board[y][x] == k) {blackKingPosition[0] = y; blackKingPosition[1] = x}
                    else if (board[y][x] == K) {whiteKingPosition[0] = y; whiteKingPosition[1] = x}
                }
            }
            if (black == 10500 && white <= 10200 || black == 11000 && white <= 10200 || black == 10900 && white <= 10200) {
                let whiteKingDistToCenter = Math.max(3 - whiteKingPosition[0], whiteKingPosition[0] - 4) + Math.max(3 - whiteKingPosition[1], whiteKingPosition[1] - 4)
                let distBetweenKings = abs(blackKingPosition[0] - whiteKingPosition[0]) + abs(blackKingPosition[1] - whiteKingPosition[1])
                if (distBetweenKings > 4) {evaluation -= distBetweenKings}
                else if (distBetweenKings <= 3) {evaluation += whiteKingDistToCenter}
            }
    
        } 
        else { // openig and middlegame
            if (bitCount(BITBOARDS.blackKing[1]) != 0) {
                evaluation += kingEval[lsb(BITBOARDS.blackKing[1]) + 32]
            } else if (bitCount(BITBOARDS.blackKing[0]) != 0) {
                evaluation += kingEval[lsb(BITBOARDS.blackKing[0])]
            }

            let index = 0

            for (let i = 0; i < bitCount(BITBOARDS.blackKnights[1]); i++) {
                let lknight = nextBit(BITBOARDS.blackKnights[1], index)
                evaluation += knightEval[lknight + 32]
                index = lknight
            }
    
            index = 0
    
            for (let i = 0; i < bitCount(BITBOARDS.blackKnights[0]); i++) {
                let lknight = nextBit(BITBOARDS.blackKnights[0], index)
                evaluation += knightEval[lknight]
                index = lknight
            }

            index = 0

            for (let i = 0; i < bitCount(BITBOARDS.blackBishops[1]); i++) {
                let lbishop = nextBit(BITBOARDS.blackBishops[1], index)
                evaluation += bishopEval[lbishop + 32]
                index = lbishop
            }

            index = 0

            for (let i = 0; i < bitCount(BITBOARDS.blackBishops[0]); i++) {
                let lbishop = nextBit(BITBOARDS.blackBishops[0], index)
                evaluation += bishopEval[lbishop]
                index = lbishop
            }

            index = 0

            for (let i = 0; i < bitCount(BITBOARDS.blackRooks[1]); i++) {
                let lrook = nextBit(BITBOARDS.blackRooks[1], index)
                evaluation += rookEval[lrook + 32]
                index = lrook
            }

            index = 0

            for (let i = 0; i < bitCount(BITBOARDS.blackRooks[0]); i++) {
                let lrook = nextBit(BITBOARDS.blackRooks[0], index)
                evaluation += rookEval[lrook]
                index = lrook
            }

            index = 0

            for (let i = 0; i < bitCount(BITBOARDS.blackQueens[1]); i++) {
                let lqueen = nextBit(BITBOARDS.blackQueens[1], index)
                evaluation += queenEval[lqueen + 32]
                index = lqueen
            }

            index = 0

            for (let i = 0; i < bitCount(BITBOARDS.blackQueens[0]); i++) {
                let lqueen = nextBit(BITBOARDS.blackQueens[0], index)
                evaluation += queenEval[lqueen]
                index = lqueen
            }

            index = 0

            for (let i = 0; i < bitCount(BITBOARDS.blackPawns[1]); i++) {
                let lpawn = nextBit(BITBOARDS.blackPawns[1], index)
                evaluation += pawnEval[lpawn + 32]
                index = lpawn
            }

            index = 0

            for (let i = 0; i < bitCount(BITBOARDS.blackPawns[0]); i++) {
                let lpawn = nextBit(BITBOARDS.blackPawns[0], index)
                evaluation += pawnEval[lpawn]
                index = lpawn
            }
        }
        return evaluation
    }


    let transTable = new Map();
    
    const ZOBRIST_TABLE = [];
    
    for (let i = 0; i < 64; i++) {
      ZOBRIST_TABLE[i] = [];
        for (let k = 0; k < 13; k++) {
          ZOBRIST_TABLE[i][k] = [Math.floor(Math.random() * 0xFFFFFFFF), Math.floor(Math.random() * 0xFFFFFFFF)]
        }
    }

    const blackToMove = [Math.floor(Math.random() * 0xFFFFFFFF), Math.floor(Math.random() * 0xFFFFFFFF)]
    const castleRights = [  [Math.floor(Math.random() * 0xFFFFFFFF), Math.floor(Math.random() * 0xFFFFFFFF)], 
                            [Math.floor(Math.random() * 0xFFFFFFFF), Math.floor(Math.random() * 0xFFFFFFFF)], 
                            [Math.floor(Math.random() * 0xFFFFFFFF), Math.floor(Math.random() * 0xFFFFFFFF)], 
                            [Math.floor(Math.random() * 0xFFFFFFFF), Math.floor(Math.random() * 0xFFFFFFFF)]]
    
    function hashBoard(BITBOARDS, isBlackToMove) {
        let hashHigh = 0
        let hashLow = 0
        if (isBlackToMove) {hashLow ^= blackToMove[0]; hashHigh ^= blackToMove[1]}
        if (BITBOARDS.blackCastleKingSide) {hashLow ^= castleRights[0][0]; hashHigh ^= castleRights[0][1]}
        if (BITBOARDS.blackCastleQueenSide) {hashLow ^= castleRights[1][0]; hashHigh ^= castleRights[1][1]}
        if (BITBOARDS.whiteCastleKingSide) {hashLow ^= castleRights[2][0]; hashHigh ^= castleRights[2][1]}
        if (BITBOARDS.whiteCastleQueenSide) {hashLow ^= castleRights[3][0]; hashHigh ^= castleRights[3][1]}
        for (let i = 0; i < 64; i++) {
            if (checkBit(BITBOARDS.enPassantSquare[1]), i & 0x1F) {
                hashHigh = (hashHigh ^ ZOBRIST_TABLE[i][12][1]) >>> 0
            } else if (checkBit(BITBOARDS.enPassantSquare[0]), i) {
                hashLow = (hashLow ^ ZOBRIST_TABLE[i][12][0]) >>> 0
            }
            if (checkBit(BITBOARDS.allPieces[1], i & 0x1F)) {
                if (checkBit(BITBOARDS.whitePawns[1], i & 0x1F)) {hashHigh = (hashHigh ^ ZOBRIST_TABLE[i][0][1]) >>> 0}
                else if (checkBit(BITBOARDS.whiteRooks[1], i & 0x1F)) {hashHigh = (hashHigh ^ ZOBRIST_TABLE[i][1][1]) >>> 0}
                else if (checkBit(BITBOARDS.whiteKnights[1], i & 0x1F)) {hashHigh = (hashHigh ^ ZOBRIST_TABLE[i][2][1]) >>> 0}
                else if (checkBit(BITBOARDS.whiteBishops[1], i & 0x1F)) {hashHigh = (hashHigh ^ ZOBRIST_TABLE[i][3][1]) >>> 0}
                else if (checkBit(BITBOARDS.whiteQueens[1], i & 0x1F)) {hashHigh = (hashHigh ^ ZOBRIST_TABLE[i][4][1]) >>> 0}
                else if (checkBit(BITBOARDS.whiteKing[1], i & 0x1F)) {hashHigh = (hashHigh ^ ZOBRIST_TABLE[i][5][1]) >>> 0}
                else if (checkBit(BITBOARDS.blackPawns[1], i & 0x1F)) {hashHigh = (hashHigh ^ ZOBRIST_TABLE[i][6][1]) >>> 0}
                else if (checkBit(BITBOARDS.blackRooks[1], i & 0x1F)) {hashHigh = (hashHigh ^ ZOBRIST_TABLE[i][7][1]) >>> 0}
                else if (checkBit(BITBOARDS.blackKnights[1], i & 0x1F)) {hashHigh = (hashHigh ^ ZOBRIST_TABLE[i][8][1]) >>> 0}
                else if (checkBit(BITBOARDS.blackBishops[1], i & 0x1F)) {hashHigh = (hashHigh ^ ZOBRIST_TABLE[i][9][1]) >>> 0}
                else if (checkBit(BITBOARDS.blackQueens[1], i & 0x1F)) {hashHigh = (hashHigh ^ ZOBRIST_TABLE[i][10][1]) >>> 0}
                else if (checkBit(BITBOARDS.blackKing[1], i & 0x1F)) {hashHigh = (hashHigh ^ ZOBRIST_TABLE[i][11][1]) >>> 0}
            } else if (checkBit(BITBOARDS.allPieces[0], i)) {
                if (checkBit(BITBOARDS.whitePawns[0], i)) {hashLow = (hashLow ^ ZOBRIST_TABLE[i][0][0]) >>> 0}
                else if (checkBit(BITBOARDS.whiteRooks[0], i)) {hashLow = (hashLow ^ ZOBRIST_TABLE[i][1][0]) >>> 0}
                else if (checkBit(BITBOARDS.whiteKnights[0], i)) {hashLow = (hashLow ^ ZOBRIST_TABLE[i][2][0]) >>> 0}
                else if (checkBit(BITBOARDS.whiteBishops[0], i)) {hashLow = (hashLow ^ ZOBRIST_TABLE[i][3][0]) >>> 0}
                else if (checkBit(BITBOARDS.whiteQueens[0], i)) {hashLow = (hashLow ^ ZOBRIST_TABLE[i][4][0]) >>> 0}
                else if (checkBit(BITBOARDS.whiteKing[0], i)) {hashLow = (hashLow ^ ZOBRIST_TABLE[i][5][0]) >>> 0}
                else if (checkBit(BITBOARDS.blackPawns[0], i)) {hashLow = (hashLow ^ ZOBRIST_TABLE[i][6][0]) >>> 0}
                else if (checkBit(BITBOARDS.blackRooks[0], i)) {hashLow = (hashLow ^ ZOBRIST_TABLE[i][7][0]) >>> 0}
                else if (checkBit(BITBOARDS.blackKnights[0], i)) {hashLow = (hashLow ^ ZOBRIST_TABLE[i][8][0]) >>> 0}
                else if (checkBit(BITBOARDS.blackBishops[0], i)) {hashLow = (hashLow ^ ZOBRIST_TABLE[i][9][0]) >>> 0}
                else if (checkBit(BITBOARDS.blackQueens[0], i)) {hashLow = (hashLow ^ ZOBRIST_TABLE[i][10][0]) >>> 0}
                else if (checkBit(BITBOARDS.blackKing[0], i)) {hashLow = (hashLow ^ ZOBRIST_TABLE[i][11][0]) >>> 0}
            }
        }
        return hashLow * hashHigh
    }

    function copyBoard(bitboards) {
        return {
            whitePawns: [...bitboards.whitePawns],
            whiteKnights: [...bitboards.whiteKnights],
            whiteBishops: [...bitboards.whiteBishops],
            whiteRooks: [...bitboards.whiteRooks],
            whiteQueens: [...bitboards.whiteQueens],
            whiteKing: [...bitboards.whiteKing],
            blackPawns: [...bitboards.blackPawns],
            blackKnights: [...bitboards.blackKnights],
            blackBishops: [...bitboards.blackBishops],
            blackRooks: [...bitboards.blackRooks],
            blackQueens: [...bitboards.blackQueens],
            blackKing: [...bitboards.blackKing],
            whitePieces: [...bitboards.whitePieces],
            blackPieces: [...bitboards.blackPieces],
            allPieces: [...bitboards.allPieces],
            allPieces90: [...bitboards.allPieces90],
            allPieces45R: [...bitboards.allPieces45R],
            allPieces45L: [...bitboards.allPieces45L],
            enPassantSquare: [...bitboards.enPassantSquare],
            whiteCastleKingSide: bitboards.whiteCastleKingSide,
            whiteCastleQueenSide: bitboards.whiteCastleQueenSide,
            blackCastleKingSide: bitboards.blackCastleKingSide,
            blackCastleQueenSide: bitboards.blackCastleQueenSide
        }
    }

    function deepEqual(x, y) {
        return (x && y && typeof x === 'object' && typeof y === 'object') ?
          (Object.keys(x).length === Object.keys(y).length) && Object.keys(x).reduce(function(isEqual, key) {
              return isEqual && deepEqual(x[key], y[key]);
            }, true) : (x === y);
      }
    
      let transpositions = 0
    
      function tree(BITBOARDS, depth, alpha, beta, maximizingPlayer) { 
        // on the first call maximizingPlayer is false, since its white's turn and we try to find the best move for black
    
        nodes++;
    
        let hash = hashBoard(BITBOARDS, !maximizingPlayer);
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
    
        if (depth == 0) {
            return evaluate(BITBOARDS)
        }
    
        let moves = possiblemoves(BITBOARDS, !maximizingPlayer); // on first call this generates all white moves
        
        moves = order(moves, BITBOARDS, !maximizingPlayer);
    
        if (maximizingPlayer) { // black's turn
          let value = -inf;
          for (let i = 0; i < moves.length; i++) {
            let newBoard = doMove(moves[i], BITBOARDS, !maximizingPlayer);
            if (!canCaptureKing(newBoard, !maximizingPlayer) && (moves[i].castle ? !illegalCastle(moves[i], BITBOARDS, !maximizingPlayer) && !canCaptureKing(BITBOARDS, !maximizingPlayer) : true)) {
                value = Math.max(
                value,
                tree(newBoard, depth - 1, alpha, beta, false)
                );
            }
            alpha = Math.max(alpha, value);
            if (beta <= alpha) {
              break;
            }
          }
          transTable.set(hash, {depth: depth, value: value, flag: (value <= alpha ? "upperbound" : (value >= beta ? "lowerbound" : "exact"))});
          return value;
        } else { // white's turn
          let value = inf;
          for (let i = 0; i < moves.length; i++) {
            let newBoard = doMove(moves[i], BITBOARDS, !maximizingPlayer); // on first call do white moves
            // if black cant capture the king after the move or its not an illegal castle move, then continue
            if (!canCaptureKing(newBoard, !maximizingPlayer) && (moves[i].castle ? !illegalCastle(moves[i], BITBOARDS, !maximizingPlayer) && !canCaptureKing(BITBOARDS, !maximizingPlayer) : true)) {
            value = Math.min(
              value,
              tree(newBoard, depth - 1, alpha, beta, true)
              );
            }

            beta = Math.min(beta, value); // todo fix whats wrong with the search or castling
            if (beta <= alpha) {
              break;
            }
          }
            transTable.set(hash, {depth: depth, value: value, flag: (value <= alpha ? "upperbound" : (value >= beta ? "lowerbound" : "exact"))});
          return value;
        }
      }
    
      function pieceOnSquare(bitboards, square, ind, isBlack) {
         
        // Check for each piece type if it is on the square
        if (isBlack) {
            if (checkBit(bitboards.blackKing, square)) {return 5}
            else if (checkBit(bitboards.blackQueens[ind], square)) {return 4}
            else if (checkBit(bitboards.blackRooks[ind], square)) {return 3}
            else if (checkBit(bitboards.blackBishops[ind], square)) {return 2}
            else if (checkBit(bitboards.blackKnights[ind], square)) {return 1}
            else if (checkBit(bitboards.blackPawns[ind], square)) {return 0}
        } else {
            if (checkBit(bitboards.whiteKing, square)) {return 5}
            else if (checkBit(bitboards.whiteQueens[ind], square)) {return 4}
            else if (checkBit(bitboards.whiteRooks[ind], square)) {return 3}
            else if (checkBit(bitboards.whiteBishops[ind], square)) {return 2}
            else if (checkBit(bitboards.whiteKnights[ind], square)) {return 1}
            else if (checkBit(bitboards.whitePawns[ind], square)) {return 0}
        }
        // No piece on the square
        return -1;
      }
    
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
    
      function order(moves, BITBOARDS, isWhiteMove) {

        let enemyPawns = isWhiteMove ? BITBOARDS.blackPawns : BITBOARDS.whitePawns
        let ext = isWhiteMove ? 1 : - 1

        let allPieces = bitboards.allPieces

        let moveScores = moves.map(move => {
            let f = move.from > 31 ? 1 : 0
            let t = move.to > 31 ? 1 : 0
            let extraT = move.to + 8*ext > 31 ? 1 : 0
            let guess = 0
            if (checkBit(allPieces[t], move.to & 0x1F)) {
              guess = 10 * PIECE_VALUES[pieceOnSquare(BITBOARDS, move.to & 0x1F, t, isWhiteMove)] - PIECE_VALUES[move.pieceType]
            }
            else if (move.promotesTo) {
              guess += PIECE_VALUES[move.promotesTo]
            }
            else if (checkBit(enemyPawns[extraT], (move.to & 0x1F) + 7*ext) || checkBit(enemyPawns[extraT], (move.to & 0x1F) + 9*ext)) {
                guess -= PIECE_VALUES[move.pieceType]
            }

            return { move, score: guess }
          })
        
          // Sort moves by score in descending order
          moveScores.sort((a, b) => b.score - a.score)
        
          // Extract sorted moves from the array of move-scores
          moves = moveScores.map(moveScore => moveScore.move)
        
          return moves;
      }
      
    let inf
    
    function bestMove(possible, bitboards) {
        console.log(moveCount)
        nodes = 0
        transpositions = 0
    
        let best;
        let pos = [];
        let maxTime
    
        possible = shuffle(possible)
        possible = order(possible, bitboards, false)
    
        let maxDepth = 13 // 3 or 7 for rook + king mate // 3 for 2 rooks + king mate // 7 or 3 for queen + king mate
        if (moveCount > 50) {maxTime = 30000} else if (moveCount < 10) {maxTime = 5000} else {maxTime = 10000}
        let start = Date.now()
        let stopSearch = false
        let d = 0
        inf = 100000
    
        for (let depth = 0; depth < maxDepth; depth++) {
            console.log('searching', depth)
            pos = []
            for (let i = 0; i < possible.length; i++) {
                let value
                if (stopSearch) {
                    value = 0
                } else {
                    let newBoard = doMove(possible[i], bitboards, false) // black move
                    if (!canCaptureKing(newBoard, false) && (possible[i].castle ? !illegalCastle(possible[i], bitboards, false) && !canCaptureKing(bitboards, false) : true)) { // if black king cant be captured
                        value = tree(newBoard, depth, -inf, inf, false) // start search, maximizingPlayer = false
                    } else {
                        value = -100001
                    }
                }
                pos.push(value)
                if (Date.now() - start > maxTime) {break}
                // else if (value == 100000) {
                //     console.log('mate in', depth)
                //     stopSearch = true
                // }
            }
            if (Date.now() - start > maxTime) {break}
            console.log(pos)
            console.log(possible)
            possible = possible.sort((a, b) => pos[possible.indexOf(b)] - pos[possible.indexOf(a)])
            console.log('sorted')
            console.log(pos)
            console.log(possible)
            console.log('best move:', possible[0])
            d = depth
            if (stopSearch) {break}
        }
    
        console.log('t:', transpositions)
    
        if (possible.length != 0) {
    
            if (possible[0].to == lastfrom && possible.length > 1 && !d == 0) {
                console.log('repeat')
                best = possible[1]
            } else {
                best = possible[0]
            }
        }

        if (maxi(pos)[0] == -100001) {
            return undefined
        } else {
            return best
        }
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
    
    function firetheengineup() {
    
        console.time('engine')
    
        //console.log("white material: " + whiteMaterial(currentBoard))
        //console.log("black material: " + blackMaterial(currentBoard))
    
        let possible = possiblemoves(bitboards, false);
        console.log('pre', possible)
        // possible = check(possible, bitboards, false)
        // console.log('aft', possible)
    
        let best = bestMove(possible, bitboards)
        
        if (best !== undefined) {

            bitboards = doMove(best, bitboards, false)

            console.log('board after black move')
            logBoard(bitboards)
            boardDisplay(bitboards.allPieces[1])
            boardDisplay(bitboards.allPieces[0])

            let fromSquare = squares[63-best.from]
            let toSquare = squares[63-best.to]
            lastfrom = 63 - best.from
            lastto = 63 - best.to

            console.log(best)

            //todo fix everything test castle
            
            if (best.promotesTo) {
                let piece
                if (best.promotesTo == 4) {piece = 'queen'}
                else if (best.promotesTo == 3) {piece = 'rook'}
                else if (best.promotesTo == 2) {piece = 'bishop'}
                else if (best.promotesTo == 1) {piece = 'knight'}
                console.log("cpu: " + fromSquare.firstChild.firstChild.className + " from " + lastfrom + " to " + lastto + " promotiong to: " + piece)
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
            else if (best.castle) { // castle
                kinghasmoved = true
                let fromSquare2
                let toSquare2
                if (best.to == 61) {
                    console.log("cpu: O-O-O")
                    fromSquare2 = squares[0]
                    toSquare2 = squares[3]
                }
                else {
                    console.log("cpu: O-O")
                    fromSquare2 = squares[7]
                    toSquare2 = squares[5]
                }
                toSquare.appendChild(fromSquare.firstChild)
                toSquare2.appendChild(fromSquare2.firstChild)
            } else {
                if (best.enPassant) {
                    squares[63-best.to-8].removeChild(squares[63-best.to-8].firstChild)
                }
        
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
            if (canCaptureKing(bitboards, false)) {msg = "you won, press ok to try again"}
            else {msg = "draw, press ok to try again"}
            setTimeout(() => {
                if (confirm(msg)) {
                    window.location.reload()
                }
            }, 10)
        }
    
        console.timeEnd('engine')
    
        logBoard(bitboards)
    
        let whitemoves = possiblemoves(bitboards, true)
        isWhiteCheckmate = checkCheckmate(whitemoves, bitboards, true)
    
        if (whitemoves.length == 0) {
            let msg
            if (canCaptureKing(bitboards, true)) {msg = "you lost, press ok to try again"}
            else {msg = "draw, press ok to try again"}
            setTimeout(() => {
                if (confirm(msg)) {
                    window.location.reload()
                }
            }, 10)
        }
    }
    
    //firetheengineup()
    
    boardSetup()
    bitboards = getBoard()
    logBoard(bitboards)

    console.log(Material(bitboards))

//    boardDisplay(bitboards.allPieces2)
//     boardDisplay(bitboards.allPieces1)

//    boardDisplay(al45L[1])
//    boardDisplay(al45L[0])


//    let placeInRotated45R = rotated45R.indexOf(index)

//    console.log(placeInRotated45R % 32)

//    let al45R = [bitboards.allPieces46R, bitboards.allPieces47R]
//    let hm = placeInRotated45R > 31 ? 1 : 0 // todo implement unrotate array to find the index of the index

//     diagonalShiftAmount = placeInRotated45R > 31 ? diagonalShiftAmountTop : diagonalShiftAmountBottom

//     shiftedBits = placeInRotated45R > 27 && placeInRotated45R < 36 ?

//     (255 & ((bitboards.allPieces46R >>> 28) | (bitboards.allPieces47R & 255) << 4)):

//     255 & (al45R[hm] >>> diagonalShiftAmount[placeInRotated45R & 0x1F])

    // boardDisplay(al45R[1])
    // boardDisplay(al45R[0])
    // console.log('----------')
    // boardDisplay(shiftedBits)
    // console.log('----------')
    // console.log(index)
    // boardDisplay(bishopTopDownAttacksR[index][shiftedBits][1])
    // boardDisplay(bishopTopDownAttacksR[index][shiftedBits][0])

    // boardDisplay(bitboards.allPieces47L)
    // boardDisplay(bitboards.allPieces46L)

    // bitboards = doMove({from: 11, to: 35}, bitboards)

    // boardDisplay(bitboards.allPieces47L)
    // boardDisplay(bitboards.allPieces46L)

    // let attacks = generateRookFileAttacks(rotated90[25], [bitboards.allPieces91, bitboards.allPieces92])

    // boardDisplay(attacks[1])
    // boardDisplay(attacks[0])

    // let i
    // if (bitCount(bitboards.whiteRooks1) > 0) {
    //     i = lsb(bitboards.whiteRooks1)
    // }
    // if (bitCount(bitboards.whiteRooks2) > 0) {
    //     i = lsb(bitboards.whiteRooks2) + 32
    // }

    // let attacks = generateBishopMoves(19, [bitboards.allPieces1, bitboards.allPieces2], 
    //                                     [bitboards.allPieces91, bitboards.allPieces92], 
    //                                     [bitboards.whitePieces1, bitboards.whitePieces2])

    // boardDisplay(attacks[1])
    // boardDisplay(attacks[0])


    // boardDisplay(bitboards.allPieces2)
    // boardDisplay(bitboards.allPieces1)
    // boardDisplay(bitboards.whitePawns2)
    // boardDisplay(bitboards.whitePawns1)
    // boardDisplay(bitboards.whiteKnights2)
    // boardDisplay(bitboards.whiteKnights1)
    // boardDisplay(bitboards.whiteBishops2)
    // boardDisplay(bitboards.whiteBishops1)
    // boardDisplay(bitboards.whiteRooks2)
    // boardDisplay(bitboards.whiteRooks1)
    // boardDisplay(bitboards.whiteQueens2)
    // boardDisplay(bitboards.whiteQueens1)
    // boardDisplay(bitboards.whiteKing2)
    // boardDisplay(bitboards.whiteKing1)

    // let bis = generateBishopMoves(4, [bitboards.allPieces46R, bitboards.allPieces47R], [bitboards.allPieces46L, bitboards.allPieces47L], [bitboards.whitePieces1, bitboards.whitePieces2])

    // boardDisplay(bis[1])
    // boardDisplay(bis[0])

    // console.log('before')
    // boardDisplay(bitboards.allPieces47R)
    // boardDisplay(bitboards.allPieces46R)
    
    
    /////////////////////////////////////////////////////////
    // console.log('before')
    // logBoard(bitboards)

    // let possible = possiblemoves(bitboards, true)
    // console.log(possible)

    // boardDisplay(bitboards.blackPieces[1])
    // boardDisplay(bitboards.blackPieces[0])
    

    // let temp = doMove({from: 11, to: 19}, bitboards)
    // undoMove({from: 11, to: 19}, bitboards, temp)


    // console.log('after')
    // logBoard(bitboards)

    // console.log(possiblemoves(bitboards, true))

    // boardDisplay(bitboards.blackPieces[1])
    // boardDisplay(bitboards.blackPieces[0])
    /////////////////////////////////////////////////////////////
    // boardDisplay(bitboards.allPieces47R)
    // boardDisplay(bitboards.allPieces46R)

    // console.log('after')
    // boardDisplay(bitboards.allPieces47L)
    // boardDisplay(bitboards.allPieces46L)

    // console.log('after')

    // bis = generateBishopMoves(4, [bitboards.allPieces46R, bitboards.allPieces47R], [bitboards.allPieces46L, bitboards.allPieces47L], [bitboards.whitePieces1, bitboards.whitePieces2])

    // boardDisplay(bis[1])
    // boardDisplay(bis[0])

    // console.log(possiblemoves(bitboards, true))


    // boardDisplay(rookRowAttacks[20][211][1])
    // boardDisplay(rookRowAttacks[20][211][0])


    // boardDisplay(bitboards.allPieces2)
    // boardDisplay(bitboards.allPieces1)

    // boardDisplay(bitboards.allPieces92)
    // boardDisplay(bitboards.allPieces91)

    // console.time('deb')
    // let moves = possiblemoves(bitboards, true)
    // // for (let i = 0; i < 63836; i++) {
    // //     let moves = possiblemoves(bitboards, true)
    // // }

    // // for (let i = 0; i < 506960; i++) {
    // //     let newBoard = doMove({from: 32, to: 44}, bitboards, true)
    // // }

    // // for (let i = 0; i < 428426; i++) {
    // //     let eval = evaluate(bitboards)
    // // }

    // for (let i = 0; i < 63836; i++) {
    //     let ordered = order(moves, bitboards, true)
    // }
    
    // console.timeEnd('deb')

    // console.log(possiblemoves(bitboards, true), '\n', order(possiblemoves(bitboards, true), bitboards, true))


// let original = getBoard()

// let newBoard = doMove({from: 11, to: 27}, original, true)

// logBoard(original)
// logBoard(newBoard)

// 20353
// 793738
// 20352
let selectedPiece;
let startSquare;
let endSquare;
let black = false; //todo:  remove false

// Function to handle the selection of a piece
function dragStart(event) {
    selectedPiece = event.target;
    //todo uncomment:   if (selectedPiece.lastElementChild.lastElementChild.className != 'white') {black = true;}
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

        if (color != 'white' && !black){
            let x = event.clientX, y = event.clientY;
            endSquare = getSquare(x, y)

            validate(startSquare, endSquare, piece)

            if (valid) {
                if (square.hasChildNodes()) {
                    square.removeChild(square.firstChild);
                }
                square.appendChild(selectedPiece);
            }
        }
        black = false;
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

function hasPawn(square) {
    if (squares[square - 1].lastElementChild.lastElementChild) {
        return squares[square - 1].lastElementChild.lastElementChild.className == 'pawn'
    }
}

let valid;

function validate(f, t, piece) {
    console.log(piece + " from " + f + " to " + t)

    
    valid = false;
    // fuck cheshs

    if (piece == 'pawn') {
        if ((f - t == 8 && !hasPiece(t)) || // 1 step
            (f - t == 16 && !hasPiece(t) && !hasPiece(t - 8) && f >= 49) || // 2 step first move
            (f - t == 7 && hasPiece(t)) || // take right
            (f - t == 9 && hasPiece(t)) // take left
            //todo en passant right
            //todo en passant left
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
        else if (f - (f % 8) == (t - (t % 8)) || f % 8 == 0) {
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

    }

    else if (piece == 'bishop') {

    }

    else if (piece == 'queen') {

    }

    else if (piece == 'king') {

    }

}


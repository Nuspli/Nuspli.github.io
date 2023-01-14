let selectedPiece;

// Function to handle the selection of a piece
function dragStart(event) {
  selectedPiece = event.target;
}

// Function to handle the placement of a piece
function dragEnd(event) {
  let targetSquare = event.target;
  // Check if the target is a square
  if (!targetSquare.classList.contains('square')) {
    targetSquare = targetSquare.closest('.square');
  }
  if (targetSquare && selectedPiece) {
    // Append the selected piece to the target square
    targetSquare.appendChild(selectedPiece);
    selectedPiece.style.left = 0;
    selectedPiece.style.top = 0;
    selectedPiece = null;
  }
}

const squares = document.querySelectorAll('.square');
const pieces = document.querySelectorAll('.piece');

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
    if (square.hasChildNodes()) {
      square.removeChild(square.firstChild);
    }
    square.appendChild(selectedPiece);
  });
});

const retry = document.querySelector('.retry_button');

retry.addEventListener('click', function() {
    if (confirm("are you sure you want to restart the game?")) {
        window.location.reload()
        return
        }
});
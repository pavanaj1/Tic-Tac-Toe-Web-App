const gameBoard = document.getElementById('game');
const resetBtn = document.getElementById('resetBtn');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createBoard() {
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.setAttribute('data-cell-index', index);
        cellElement.innerText = cell;
        cellElement.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const clickedCellIndex = event.target.getAttribute('data-cell-index');

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    event.target.innerText = currentPlayer;
    checkResult();

    if (gameActive) {
        currentPlayer = 'O'; // AI's turn
        makeAIMove();
    }
}

function makeAIMove() {
    let availableCells = board.map((cell, index) => (cell === '' ? index : null)).filter(index => index !== null);
    
    if (availableCells.length > 0) {
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomIndex] = currentPlayer;
        const cellElements = document.querySelectorAll('.cell');
        cellElements[randomIndex].innerText = currentPlayer;
        checkResult();

        if (gameActive) {
            currentPlayer = 'X'; // Player's turn
        }
    }
}

function checkResult() {
    let roundWon = false;

    // Iterate through the winning conditions to see if a player has won
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];

        // Check if all three cells are filled and are the same
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    // Handle the win, draw, or continue the game
    if (roundWon) {
        alert(`Player ${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    // Check for a draw if all cells are filled and no winner
    if (!board.includes('')) {
        alert('Draw!');
        gameActive = false;
        return;
    }

    // Continue the game, switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

resetBtn.addEventListener('click', resetGame);

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    gameBoard.innerHTML = '';
    createBoard();
}

createBoard();

// DOM element selections
const modalBackground = document.getElementById('modalBackground');
const startGameButton = document.getElementById('startGame');
const player1ScoreDisplay = document.getElementById('player1Name');
const player2ScoreDisplay = document.getElementById('player2Name');
const turnIndicator = document.getElementById('turnIndicator')

// Game variables
let currentPlayer = 'X';
let player1Score = 0;
let player2Score = 0;

// Show the modal initially
modalBackground.classList.remove('hidden');

// Start game button functionality
startGameButton.addEventListener('click', () => {
    const player1NameInput = document.getElementById('player1Name');
    const player2NameInput = document.getElementById('player2Name');
    
    // Update player names if provided or use defaults
    player1ScoreDisplay.textContent = (player1NameInput.value || 'Player 1') + ': 0';
    player2ScoreDisplay.textContent = (player2NameInput.value || 'Player 2') + ': 0';
    
    modalBackground.classList.add('hidden');
});

// Function to switch player turns and update the turn indicator
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const playerName = currentPlayer === 'X' ? player1ScoreDisplay.textContent.split(':')[0] : player2ScoreDisplay.textContent.split(':')[0]
    turnIndicator.textContent = `${playerName}'s Turn`;
}

// Add click event listeners for the cells - we will write the logic for this later
const cells = Array.from(document.querySelectorAll('.cell'));
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Function to handle cell click
function handleCellClick(event) {
    const cell = event.target;
    if (!cell.textContent) { // Check if cell is empty
        cell.textContent = currentPlayer;
        if(checkForDraw()){
            showDrawModal();
            resetBoard(); 
            return;
        }

        if (checkForWinner()) {
            showWinnerModal();
            updateScore();
            resetBoard(); 
        } else {
            switchPlayer();
        }
    }
}

//Function that checks for a winner
function checkForWinner() {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], //rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], //columns
        [1, 5, 9], [3, 5, 7]  //diagonals
    ];
    return winningCombinations.some(combination => {
        return combination.every(cellId => {
            return cells[cellId - 1].textContent === currentPlayer;
        });
    });
}

function checkForDraw() {
    return cells.every( cell => {
        return cell.textContent != ''
    })
}

function showWinnerModal() {
    const winnerName = currentPlayer === 'X' ? player1ScoreDisplay.textContent.split(':')[0] : player2ScoreDisplay.textContent.split(':')[0]
    modalContent.innerHTML = `<h2>${winnerName} Wins!</h2>`;
    modalBackground.classList.remove('hidden'); 
}

function showDrawModal() {
    modalContent.innerHTML = `<h2>It's a draw...</h2>`;
    modalBackground.classList.remove('hidden'); 
}

function updateScore() {
    if(currentPlayer === 'X'){
        player1Score++;
        player1ScoreDisplay.textContent = `${player1ScoreDisplay.textContent.split(':')[0]}: ${player1Score}`;
    }else {
        player2Score++;
        player2ScoreDisplay.textContent = `${player2ScoreDisplay.textContent.split(':')[0]}: ${player2Score}`;
    }
}

function resetBoard() {
    cells.forEach(cell => cell.textContent = '');
}

// Add click event listener to modal to close and start a new game
modalBackground.addEventListener('click', () => {
    modalBackground.classList.add('hidden');
})


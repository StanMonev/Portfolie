// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("startBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const cells = Array.from(document.querySelectorAll('.cell'));
const player1ScoreDisplay = document.getElementById('player1Name');
const player2ScoreDisplay = document.getElementById('player2Name');
const turnIndicator = document.getElementById('turnInfo')

let currentPlayer = 'X';
let player1Score = 0;
let player2Score = 0;
let player1Name = "Player 1"
let player2Name = "Player 2"

// Get player names and start the game
btn.onclick = function() {
    setup();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    setup();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        setup();
    }
}

function setup() {
    player1Name = document.getElementById("player1").value || "Player 1";
    player2Name = document.getElementById("player2").value || "Player 2";

    document.getElementById("player1Name").textContent = player1Name + " Wins: 0 ";
    document.getElementById("player2Name").textContent = player2Name + " Wins: 0 ";

    modal.style.display = "none";

    // Initialize the game with player names
    initializeGame(player1Name, player2Name);
}

// Function to initialize the game
function initializeGame(player1Name, player2Name) {
    document.getElementById("turnInfo").textContent = player1Name + "'s turn";
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
}

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
    const winnerName = currentPlayer === 'X' ? player1Name : player2Name
    showResultModal(`${winnerName} Wins!`)
}

function showDrawModal() {
    showResultModal(`It's a draw...`)
}

// Function to show the modal with the result
function showResultModal(message) {
    var modal = document.getElementById("resultModal");
    var modalMessage = document.getElementById("modalMessage");
    modalMessage.textContent = message;
    modal.style.display = "flex";
}

// Function to close the modal
function closeModal() {
    var modal = document.getElementById("resultModal");
    modal.style.display = "none";
}

function updateScore() {
    if(currentPlayer === 'X'){
        player1Score++;
        player1ScoreDisplay.textContent = `${player1Name} Wins: ${player1Score}`;
    }else {
        player2Score++;
        player2ScoreDisplay.textContent = `${player2Name} Wins: ${player2Score}`;
    }
}

// Function to switch player turns and update the turn indicator
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const playerName = currentPlayer === 'X' ? player1Name : player2Name
    turnIndicator.textContent = `${playerName}'s Turn`;
}

function resetBoard() {
    cells.forEach(cell => cell.textContent = '');
}

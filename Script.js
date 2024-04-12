  document.addEventListener('DOMContentLoaded', function () {
            const board = document.getElementById('board');
            const status = document.getElementById('status');
            const resetButton = document.getElementById('resetButton');
            const winData = document.getElementById('winData');

            let currentPlayer = 'X';
            let boardState = ['', '', '', '', '', '', '', '', ''];
            let gameActive = true;
            let xWins = 0;
            let oWins = 0;

            // Function to handle cell click
            function handleCellClick(index) {
                if (gameActive && boardState[index] === '') {
                    boardState[index] = currentPlayer;
                    renderBoard();
                    checkResult();
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }

            // Function to check for winning conditions
            function checkResult() {
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

                for (let condition of winningConditions) {
                    const [a, b, c] = condition;
                    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                        status.textContent = `${currentPlayer} wins!`;
                        gameActive = false;
                        updateWinData(currentPlayer);
                        return;
                    }
                }

                if (!boardState.includes('')) {
                    status.textContent = "It's a draw!";
                    gameActive = false;
                }
            }

            // Function to update win data
            function updateWinData(player) {
                if (player === 'X') {
                    xWins++;
                } else {
                    oWins++;
                }
                winData.textContent = `X Wins: ${xWins}  O Wins: ${oWins}`;
            }

            // Function to render the board
            function renderBoard() {
                board.innerHTML = '';
                boardState.forEach((cell, index) => {
                    const cellElement = document.createElement('div');
                    cellElement.classList.add('cell');
                    cellElement.textContent = cell;
                    cellElement.addEventListener('click', () => handleCellClick(index));
                    board.appendChild(cellElement);
                });
            }

            // Function to reset the game
            function resetGame() {
                currentPlayer = 'X';
                boardState = ['', '', '', '', '', '', '', '', ''];
                gameActive = true;
                status.textContent = '';
                renderBoard();
            }

            // Event listener for reset button
            resetButton.addEventListener('click', resetGame);

            // Initial rendering of the board
            renderBoard();
			
			// Declare variables to store start and stop time
let startTime;
let stopTime;

// Function to update win data
function updateWinData(player) {
    if (player === 'X') {
        xWins++;
    } else {
        oWins++;
    }
    stopTime = new Date(); // Record stop time
    const elapsedTime = (stopTime - startTime) / 1000; // Calculate elapsed time in seconds
    winData.innerHTML = `X Wins: ${xWins}  O Wins: ${oWins}<br>Game Duration: ${elapsedTime} seconds`;
}

// Function to reset the game
function resetGame() {
    startTime = new Date(); // Record start time when the game resets
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    status.textContent = '';
    renderBoard();
}

// Event listener for reset button
resetButton.addEventListener('click', resetGame);

// Initial recording of start time
startTime = new Date();

        });

// ... (previous code)

// Handle user interactions
const createGameButton = document.getElementById('createGameButton');
const joinGameButton = document.getElementById('joinGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const startGameButton = document.getElementById('startGameButton');
const gameCodeDisplay = document.getElementById('gameCodeDisplay');

createGameButton.addEventListener('click', createGame);
joinGameButton.addEventListener('click', showGameCodeInput);
startGameButton.addEventListener('click', joinGame);

function createGame() {
    // Generate a random game code and display it
    generatedGameCode = generateGameCode();
    gameCodeDisplay.innerText = `Share this code with your friend: ${generatedGameCode}`;
    gameCodeDisplay.style.display = 'block';
    startGameButton.style.display = 'block';
    createGameButton.style.display = 'none';
    joinGameButton.style.display = 'none';
}

function showGameCodeInput() {
    gameCodeInput.style.display = 'block';
    startGameButton.style.display = 'block';
    createGameButton.style.display = 'none';
    joinGameButton.style.display = 'none';
}

// Handle game joining
function joinGame() {
    if (joinedGame) return; // Prevent joining multiple times
    joinedGame = true;

    if (gameCodeInput.value === generatedGameCode) {
        // Emit the join game event with the game code
        socket.emit('joinGame', generatedGameCode);
    } else {
        alert('Invalid game code. Please enter the correct code.');
    }
}

// Receive game code validation from the server
socket.on('gameCodeValid', (gameCode) => {
    if (generatedGameCode === gameCode) {
        alert('You have successfully joined the game!');
    } else {
        alert('Invalid game code. Please enter the correct code.');
    }
});

// ... (rest of the code)

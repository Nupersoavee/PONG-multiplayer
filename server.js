const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Store game state
let gameState = {
    player1Y: 200,
    player2Y: 200,
    ballX: 400,
    ballY: 200,
};

// Store connected clients
let clients = {};

io.on('connection', (socket) => {
    console.log('A user connected');

    // Send the initial game state to the connected client
    socket.emit('gameState', gameState);

    // Handle paddle movement
    socket.on('paddleMove', (position) => {
        if (socket === clients.player1) {
            gameState.player1Y = position;
        } else if (socket === clients.player2) {
            gameState.player2Y = position;
        }
        io.emit('gameState', gameState);
    });

    // Handle game code joining
    socket.on('joinGame', (gameCode) => {
        // Implement logic to check the game code and assign players
        if (!clients.player1) {
            clients.player1 = socket;
        } else if (!clients.player2) {
            clients.player2 = socket;
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');

        // Remove the disconnected client from the clients object
        if (socket === clients.player1) {
            delete clients.player1;
        } else if (socket === clients.player2) {
            delete clients.player2;
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

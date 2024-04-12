// file that holds and hosts the server
// code yoinked from:
// https://gamedevacademy.org/create-a-basic-multiplayer-game-in-phaser-3-with-socket-io-part-1/
// https://www.youtube.com/watch?v=CCKsqfBrJhg&list=PLo6lBZn6hgcZ4-xQFjDPfWnONyq9vFnh9&index=7
const express = require('express');           // express module, web framework
const app = express();                        // instance of express called app 
const PORT = process.env.PORT || 8081;
const http = require('http');
const server = http.createServer(app);        // supplied the app to the HTTP server
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(__dirname));           // render static files using express.static

const players = {};                           // players object

app.get('/', function (req, res) {              // tells the server to serve the index.html file as the root page
    res.sendFile(__dirname + '/index.html');
});

// connections and disconnections
io.on('connection', function (socket) {                     // player joining
    console.log ('a caretaker has entered the room');
    // create a new player and add it to the players object
    players[socket.id] = {
        playerID: socket.id,
        cursorPosX: 0,
        cursorPosY: 0,
        mouseDown: false
    };
    // console.log(players);                                // debug check player list
    socket.emit('currentPlayers',players);                  // send the players object to the new player
    socket.broadcast.emit('newPlayer',players[socket.id]);  // update all other players of the new player

    socket.on('disconnect', function() {                    // player disconnecting
        console.log ('a caretaker has left the room');
        // remove the player from the players object
        socket.broadcast.emit('playerDisconnect', socket.id);
        delete players[socket.id];
        socket.disconnect(socket.id);
    });

    socket.on('playerMovement', function (positionData) {   // if a player moved, update the server
        players[socket.id].x = positionData.x;
        players[socket.id].y = positionData.y;
        socket.broadcast.emit('playerMoved', players[socket.id]);
    });
    
});

server.listen(PORT, function () {               // server starts listening on PORT
    console.log(server.address());
    console.log(`Listening on ${server.address().port}`);
})
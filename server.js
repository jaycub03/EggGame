// file that holds and hosts the server
// code yoinked from:
// https://gamedevacademy.org/create-a-basic-multiplayer-game-in-phaser-3-with-socket-io-part-1/
var express = require('express');   // express module, web framework
var app = express();                // instance of express called app  
var server = require('http').Server(app);       // supplied the app to the HTTP server

var io = require('socket.io')(server);  // listen to server
var players = {};                       // players object


app.use(express.static(__dirname));  // render static files using express.static

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
        delete players[socket.id];
        socket.disconnect(socket.id);
    });

    socket.on('playerMovement', function (positionData) {   // if a player moved, update the server
        players[socket.id].x = positionData.x;
        players[socket.id].y = positionData.y;
        socket.broadcast.emit('playerMoved', players[socket.id]);
    });
    
});

server.listen(8081, function () {               // server starts listening on port 8081
    console.log(`Listening on $(server.address().port)`);
})
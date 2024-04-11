// file that holds and hosts the server
// code yoinked from:
// https://gamedevacademy.org/create-a-basic-multiplayer-game-in-phaser-3-with-socket-io-part-1/
var express = require('express');   // express module, web framework
var app = express();                // instance of express called app  
var server = require('http').Server(app);       // supplied the app to the HTTP server

var io = require('socket.io')(server);   // listen to server

app.use(express.static(__dirname));  // render static files using express.static

app.get('/', function (req, res) {              // tells the server to serve the index.html file as the root page
    res.sendFile(__dirname + '/index.html');
});

// connections and disconnections
io.on('connection', function (socket) {
    console.log ('a caretaker has entered the room');
    socket.on('disconnect', function() {
        console.log ('a caretaker has left the room');
    });
});

server.listen(8081, function () {               // server starts listening on port 8081
    console.log(`Listening on $(server.address().port)`);
})
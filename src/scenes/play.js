const { Time } = require("phaser");

// Class copied from professor Altice's PaddleParkourP3
class play extends Phaser.Scene {
    constructor() {
        super('play');
    }

    preload() {
        
    }

    create() {
        // server and multiplayer stuff
        const self = this;
        this.socket = io();
        this.otherPlayers = this.add.group();
        this.socket.on('currentPlayers', function (players){    // add other players to game
            Object.keys(players).forEach(function (id) {
                if (players[id].playerID == self.socket.id) {
                    addPlayer(self, players[id]);
                } else {
                    addOtherPlayers(self, players[id]);
                }
            });
        });
        this.socket.on('newPlayer', function (playerInfo){
            addOtherPlayers(self, playerInfo);
        });
        this.socket.on('playerDisconnect', function (playerID){       // remove other players from game
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerID == otherPlayer.playerID) {
                    otherPlayer.destroy();
                }
            });
        });
        this.socket.on('playerMoved', function (playerInfo) {   // when other players move, update the client
            self.otherPlayers.getChildren().forEach(function (otherPlayer) {
                if (playerInfo.playerID == otherPlayer.playerID) {
                    otherPlayer.setPosition(playerInfo.x, playerInfo.y);
                }
            });
        });



        let counter = 0;
        eggAlive = true;
        this.temp = defaultTemp;
        this.clickCount = 0;
        this.isTweening = false;
        // Background stuff 
        this.background = this.add.image(0,0, 'background').setOrigin(0).setScale(1);

        // temperature Arrows
        this.coldArrow = this.add.image( screenWidth*3/4 - 139, screenHeight/3 + 100, 'coldArrow').setOrigin(0).setScale(2);
        this.hotArrow = this.add.image( screenWidth*3/4 - 140, screenHeight/3 + 30, 'hotArrow').setOrigin(0).setScale(2);
        this.coldArrow.setInteractive()
        this.hotArrow.setInteractive()
        
        // The egg
        this.egg = this.add.image(screenWidth/10 + 50, screenHeight*3/4 - 150, 'egg').setScale(15);
        this.egg.setInteractive()
        // The text in the top left
        this.counterTxt = this.add.text(screenWidth/4 + 70,20, "Click Count: " + this.clickCount).setFontSize(60).setOrigin(0)
        this.tempTxt = this.add.text(screenWidth/4 + 70,100, "Temperature: " + this.temp).setFontSize(60)

        this.socket.on('clickUpdate', function (clicks) {   // update client click count when the server receives a click
            self.counterTxt.text = ( "Click Count: " + this.clickCount);
            self.clickCount++;
            if (clicks.clickCount >= 10000){
                console.log("going endscreen");
                self.scene.start('endscreen');
            }
        });
        // https://github.com/phaserjs/examples/blob/master/public/src/game%20objects/shapes/rectangle.js
        // https://phaser.discourse.group/t/how-to-tween-sprite-in-phaser-3/4526


        //  on click reference
        // https://stackoverflow.com/questions/63667506/how-to-detect-click-on-the-images-in-phaser3
        
        this.egg.on('pointerdown', ()=> {
            // When the egg is clicked it should play the egg bounce animation, inspired by cookie clicker
            console.log(this.clickCount);
            // when a player clicks, send to the server
            this.socket.emit('playerClick', {
                clickCount: this.clickCount
            })

            if ( !this.isTweening ){
                this.isTweening = true
                this.tweens.add({
                    targets: this.egg,
                    scaleX: 16,
                    scaleY: 16 ,
                    yoyo: true,
                    duration: 100,
                    ease: 'Sine.easeInOut',
                    onComplete:  ()=> {
                        // Reset the flag to false when the tween completes
                        this.isTweening = false;
                    }
        
                })
            }

            // if(this.clickCount >= 10) {
            //     console.log  ("going endscreen")
            //     this.scene.start('endscreen')
            // }
         
         }, this.egg)



         // When the arrows are clicked, the temp will increase or decrease
         this.hotArrow.on('pointerdown', ()=> {
            this.temp ++;
            this.tempTxt.text = ( "Temperature: " + this.temp);
         }, this.hotArrow)

         this.coldArrow.on('pointerdown', ()=> {
            
            this.temp --;
            this.tempTxt.text = ( "Temperature: " + this.temp);
         }, this.hotArrow)
        
         // puts the player into the game as a sprite/object
         function addPlayer(self, playerInfo){
            self.cursor = self.physics.add.image(playerInfo.cursorPosX, playerInfo.cursorPosY, 'egg');
        }

        // puts other players into the game as a sprite/object
        function addOtherPlayers(self, playerInfo) {
            const otherPlayer = self.physics.add.image(playerInfo.cursorPosX, playerInfo.cursorPosY, 'egg');
            otherPlayer.playerID = playerInfo.playerID;
            self.otherPlayers.add(otherPlayer);
        }

    }

    update() {
        if (this.cursor) {
            // move cursor
            this.cursor.x = this.input.activePointer.x;
            this.cursor.y = this.input.activePointer.y;

            // emit cursor movement
            var x = this.cursor.x;
            var y = this.cursor.y;
            if (this.cursor.oldPosition && (x!= this.cursor.oldPosition.x || y!= this.cursor.oldPosition.y)) {
                this.socket.emit('playerMovement', {
                    x: this.cursor.x,
                    y: this.cursor.y
                });
            }

            // old position data
            this.cursor.oldPosition = {
                x: this.cursor.x,
                y: this.cursor.y
            };
        }
    }

    update(){
        if ( this.temp < healthyMin || this.temp > healthyMax ) {
            counter += delta; // increase the counter if the temp is out of range 
        } else if ( counter !=0){
            counter = 0
        }

        if (counter > 20000){ // If the temp has been out of the health range for 5 seconds, roll to kill the egg
            if ( Phaser.Math.Between(1, 20) == 2){
                eggAlive = false;
            }
        }
    }
}
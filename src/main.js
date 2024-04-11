// This is main! It establishes all of the settings for the phaser canvas, 
// like the canvas size and location in the webpage.
let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 500,
    height: 300,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },

    backgroundColor: '#4488aa',
    zoom: 2,
    scene: [ load, mainmenu, play, endscreen ]
}

let hatchHours = 10
let hatchDays = 0
let screenWidth = 500
let screenHeight = 300

const game = new Phaser.Game(config)
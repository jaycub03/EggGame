// This is main! It establishes all of the settings for the phaser canvas, 
// like the canvas size and location in the webpage.
let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 2100,
    height: 1500,
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },


    backgroundColor: '#4488aa',
    zoom: .5,
    scene: [ load, mainmenu, play, endscreen ],
    render: {
        pixelArt: true,
        antialias: true
    },

    scale : {
        //mode : Phaser.scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }

}

// egg info https://extension.psu.edu/programs/4-h/get-involved/teachers/embryology/teacher-resources/supporting-subject-matter/incubation/science-of-incubation/temperature#:~:text=Incubator%20temperature%20should%20be%20maintained,the%20egg%20may%20not%20hatch.
let maxTemp = 130 // Idk if we need these but I figured there's no point in giving it some gigantic range. We 
// We can easily remove these later if they don't feel right. 
let minTemp = 90 

// These are the healthy range of temps for the egg. If it is out of this range,
let healthyMin = 97
let healthyMax = 101
let defaultTemp = 99
let eggAlive = true;

let hatchHours = 10
let hatchDays = 0
let screenWidth = 2100
let screenHeight = 1500

const game = new Phaser.Game(config)
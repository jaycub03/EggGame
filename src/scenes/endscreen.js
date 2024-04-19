class endscreen extends Phaser.Scene {
    constructor() {
        super('endscreen');
    }

    preload() {


    }

    create() {

        if (eggAlive){
            this.add.image (screenWidth/2, screenHeight/2, 'win')
        } else {
            this.add.image (screenWidth/2, screenHeight/2, 'loss').setScale(.85)

        }

    }
}
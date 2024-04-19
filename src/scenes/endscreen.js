class endscreen extends Phaser.Scene {
    constructor() {
        super('endscreen');
    }

    preload() {
        //loads dragon image
        this.load.image('dragon', 'assets/dragon.png')


    }

    create() {
        //dragon in middle of screen
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'dragon');

        //display egg has hatched   
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'THE EGG HAS HATCHED', {
            font: '32px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5,0.5)
        //restart text for R to restart
        this.restartTxt = this.add.text(screenWidth/2, screenHeight -40, 'Press R to get a new egg', {
            font: '18px',
            fill: '#ffffff'
        }).setOrigin(0.5)
        //restart key is R
        this.restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        //if R is pressed restart and go back to mainmenu
        this.restartKey.on('down', function() {
            this.scene.start('mainmenu')
        }, this)
        if (gameVars.alive){
            this.add.image (screenWidth/2, screenHeight/2, 'win')
        } else {
            this.add.image (screenWidth/2, screenHeight/2, 'loss').setScale(.85)

        }

    }
}
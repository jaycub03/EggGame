class mainmenu extends Phaser.Scene {
    constructor() {
        super('mainmenu')
    }

    create() {
        this.egg = this.add.image(screenWidth/2, screenHeight/2, 'egg').setScale(.5);
        this.egg.setInteractive()
        this.egg.on('pointerdown', ()=> {
            // When the egg is clicked it should play the egg bounce animation, inspired by cookie clicker
            
            console.log("clicked");
            this.scene.start('play')
        })
        
    }

    update(time, delta) {
    }
}
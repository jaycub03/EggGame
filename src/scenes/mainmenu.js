class mainmenu extends Phaser.Scene {
    constructor() {
        super('mainmenu')
    }
    

    create() {
        this.egg = this.add.image(screenWidth/2, screenHeight/2, 'egg').setScale(.5);
        this.egg.setInteractive()
        this.egg.on('pointerdown', ()=> {
            // When the egg is clicked it should play the egg bounce animation, inspired by cookie clicker
            
            //console.log("clicked");
            this.scene.start('play')
        })
        this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'Click to start taking care of your egg', {
            font: '28px Times New Roman',
            fill: '#ffffff'
        }).setOrigin(0.5,0.5)
    }

    update(time, delta) {
    }
}
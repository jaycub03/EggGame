class mainmenu extends Phaser.Scene {
    constructor() {
        super('mainmenu')
    }
    

    create() {
        let bg = this.add.image(screenWidth/2, screenHeight/2, 'background')
        bg.setInteractive()
        bg.on('pointerdown', () => {
            console.log("background clicked")
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
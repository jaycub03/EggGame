class mainmenu extends Phaser.Scene {
    constructor() {
        super('mainmenu')
    }

    create() {
        
        this.scene.start('play')
    }

    update(time, delta) {
    }
}
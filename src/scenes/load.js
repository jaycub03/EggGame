class load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        this.load.image('egg', 'assets/Egg.png')

    }

    create() {


        this.scene.start('mainmenu')
    }
}
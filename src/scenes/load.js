class load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        this.load.image('egg', 'assets/Egg.png')
        this.load.image('titleImage', 'assets/title.jpg')
        this.load.image('background','assets/eggbackground.png')
    }

    create() {


        this.scene.start('mainmenu')
    }
}
class load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        this.load.image('egg', 'assets/Egg.png')
        this.load.image('titleImage', 'assets/title.jpg')
        this.load.image('background','assets/eggbackground.png')

        this.load.image('coldArrow','assets/coldArrow.png')
        this.load.image('hotArrow','assets/hotArrow.png')
    }

    create() {


        this.scene.start('mainmenu')
    }
}
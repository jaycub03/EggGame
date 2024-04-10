// Class copied from professor Altice's PaddleParkourP3
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
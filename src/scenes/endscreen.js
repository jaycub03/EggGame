class endscreen extends Phaser.Scene {
    constructor() {
        super('endscreen');
    }

    preload() {


    }

    create() {


        this.scene.start('mainmenu')
    }
}
// Class copied from professor Altice's PaddleParkourP3
class play extends Phaser.Scene {
    constructor() {
        super('play');
    }

    preload() {
        this.egg = this.add.image(screenWidth/2, screenHeight/2, 'egg').setOrigin(0,0);

    }

    create() {

        
    }
}
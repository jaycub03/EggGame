class load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        this.load.image('egg', 'assets/Egg.png')
        this.load.image('titleImage', 'assets/title.jpg')
        this.load.image('background','assets/eggbackground.png')
        this.load.image('dvd','assets/dvd.png')
        this.load.image('coldArrow','assets/coldArrow.png')
        this.load.image('hotArrow','assets/hotArrow.png')
        this.load.image('sky','assets/sky.png')
        this.load.image('city','assets/city.png')
        this.load.image('loss','assets/loss.jpg')
        this.load.image('point','assets/point.png')
        this.load.image('win1','assets/EggHatch1.png')
        this.load.image('win2','assets/EggHatch2.png')
        this.load.image('win3','assets/EggHatch3.png')

    }

    create() {
        

        this.scene.start('mainmenu')
    }
}
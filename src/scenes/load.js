class load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        this.load.image('egg', 'assets/Egg.png')
        this.load.image('titleImage', 'assets/title.jpg')
        //credit:https://pixabay.com/music/beats-tvari-tokyo-cafe-159065/
        //loads lofi audio
        this.load.audio('lofi', 'assets/lofi.mp3')
        this.load.image("background", "assets/lofiroom.png")
    }

    create() {


        this.scene.start('mainmenu')
    }
}
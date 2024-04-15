// Class copied from professor Altice's PaddleParkourP3
class play extends Phaser.Scene {
    constructor() {
        super('play');
    }

    preload() {
        
    }

    create() {
        this.clickCount = 0;
        this.isTweening = false;

        this.background = this.add.image(0,0, 'background').setOrigin(0).setScale(1);
        
        this.egg = this.add.image(screenWidth/10 + 50, screenHeight*3/4 - 100, 'egg').setScale(15);
        this.egg.setInteractive()
        this.counterTxt = this.add.text(20,20, this.clickCount)
        // https://github.com/phaserjs/examples/blob/master/public/src/game%20objects/shapes/rectangle.js
        // https://phaser.discourse.group/t/how-to-tween-sprite-in-phaser-3/4526


        //  on click reference
        // https://stackoverflow.com/questions/63667506/how-to-detect-click-on-the-images-in-phaser3
        
        this.egg.on('pointerdown', ()=> {
            // When the egg is clicked it should play the egg bounce animation, inspired by cookie clicker
            this.clickCount++;
            console.log(this.clickCount);
            
            if ( !this.isTweening ){
                this.isTweening = true
                this.tweens.add({
                    targets: this.egg,
                    scaleX: 16,
                    scaleY: 16 ,
                    yoyo: true,
                    duration: 100,
                    ease: 'Sine.easeInOut',
                    onComplete:  ()=> {
                        // Reset the flag to false when the tween completes
                        this.isTweening = false;
                    }
        
                })
            }
         
         }, this.egg)
        
        
    }
}
// Class copied from professor Altice's PaddleParkourP3
class play extends Phaser.Scene {
    constructor() {
        super('play');
    }

    preload() {
        //credit:https://pixabay.com/music/beats-tvari-tokyo-cafe-159065/
        //loads lofi audio
        this.load.audio('lofi', 'assets/lofi.mp3')
        
    }

    create() {
        this.sound.play('lofi', {
            loop:true
        })
        this.clickCount = 0;
        this.isTweening = false;
        this.egg = this.add.image(screenWidth/2, screenHeight/2, 'egg');
        this.egg.setInteractive()
        this.counterTxt = this.add.text(20, 20, this.clickCount, {
            font: '18px Arial',
            fill: '#ffffff'
        })
        // https://github.com/phaserjs/examples/blob/master/public/src/game%20objects/shapes/rectangle.js
        // https://phaser.discourse.group/t/how-to-tween-sprite-in-phaser-3/4526


        //  on click reference
        // https://stackoverflow.com/questions/63667506/how-to-detect-click-on-the-images-in-phaser3
        
        this.egg.on('pointerdown', ()=> {
            // When the egg is clicked it should play the egg bounce animation, inspired by cookie clicker
            this.clickCount++;
            this.counterTxt.setText(' ' + this.clickCount)
            console.log(this.clickCount);
            
            if ( !this.isTweening ){
                this.isTweening = true
                this.tweens.add({
                    targets: this.egg,
                    scaleX: 1.2,
                    scaleY: 1.2,
                    yoyo: true,
                    duration: 150,
                    ease: 'Sine.easeInOut',
                    onComplete:  ()=> {
                        // Reset the flag to false when the tween completes
                        this.isTweening = false;
                    }
        
                })
            }

            if(this.clickCount >= 10) {
                console.log  ("going endscreen")
                //stops the track so it doesnt play the next screen
                this.sound.stopByKey('lofi')
                //starts endscreen
                this.scene.start('endscreen')
            }
         
         }, this)
        
    }
}
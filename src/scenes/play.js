// const { Time } = require("phaser");

// Class copied from professor Altice's PaddleParkourP3
class play extends Phaser.Scene {
    constructor() {
        super('play');
    }

    preload() {
        
    }

    create() {
        this.sky = this.add.image( screenWidth/2 + 150, screenHeight/2 - 300, 'sky').setScale(2);
        this.city = this.add.image(screenWidth/2 + 10,screenHeight/2 - 80, 'city').setScale(1.7)
        
        this.dvdSpeedx = 1;
        this.dvdSpeedy = 1;
        this.dvd = this.add.image(screenWidth*3/4 + 300 , screenHeight/2 , 'dvd').setScale(1/2);

        this.cameras.main.setBackgroundColor(0x000);
        this.counter = 0;
        eggAlive = true;
        this.temp = defaultTemp;
        this.clickCount = 0;
        this.isTweening = false;
        // Background stuff 
        this.background = this.add.image(0,0, 'background').setOrigin(0).setScale(1);

        // temperature Arrows
        this.coldArrow = this.add.image( screenWidth*3/4 - 139, screenHeight/3 + 100, 'coldArrow').setOrigin(0).setScale(2);
        this.hotArrow = this.add.image( screenWidth*3/4 - 140, screenHeight/3 + 30, 'hotArrow').setOrigin(0).setScale(2);
        this.coldArrow.setInteractive()
        this.hotArrow.setInteractive()
        
        // The egg
        this.egg = this.add.image(screenWidth/10 + 50, screenHeight*3/4 - 150, 'egg').setScale(.75);
        this.egg.setInteractive()

        // The text in the top left
        this.counterTxt = this.add.text(screenWidth/4 + 70,20, "Click Count: " + this.clickCount).setFontSize(60).setOrigin(0)
        this.tempTxt = this.add.text(screenWidth/4 + 70,100, "Temperature: " + this.temp).setFontSize(60)

        // https://github.com/phaserjs/examples/blob/master/public/src/game%20objects/shapes/rectangle.js
        // https://phaser.discourse.group/t/how-to-tween-sprite-in-phaser-3/4526


        //  on click reference
        // https://stackoverflow.com/questions/63667506/how-to-detect-click-on-the-images-in-phaser3
        
        

        this.egg.on('pointerdown', ()=> {
            // When the egg is clicked it should play the egg bounce animation, inspired by cookie clicker
            this.clickCount++;

            this.counterTxt.text = ( "Click Count: " + this.clickCount);
            console.log(this.clickCount);
            
            if ( !this.isTweening ){
                this.isTweening = true
                this.tweens.add({
                    targets: this.egg,
                    scaleX: .9,
                    scaleY: .9 ,
                    yoyo: true,
                    duration: 150,
                    ease: 'Sine.easeInOut',
                    onComplete:  ()=> {
                        // Reset the flag to false when the tween completes
                        this.isTweening = false;
                    }
        
                })
            }
         
         }, this.egg)



         // When the arrows are clicked, the temp will increase or decrease
         this.hotArrow.on('pointerdown', ()=> {
            this.temp ++;
            this.tempTxt.text = ( "Temperature: " + this.temp);
         }, this.hotArrow)

         this.coldArrow.on('pointerdown', ()=> {
            
            this.temp --;
            this.tempTxt.text = ( "Temperature: " + this.temp);
         }, this.hotArrow)
        
        
    }

    update(time, delta){

        if (this.dvd.x < screenWidth*3/4 + 25) {
            this.dvdSpeedx =1
        } else if ( this.dvd.x > screenWidth - 30){
            this.dvdSpeedx = -1
        }
        this.dvd.setX (this.dvd.x + this.dvdSpeedx)

        if (this.dvd.y > screenHeight/2 + 300) {
            this.dvdSpeedy =-1
        } else if ( this.dvd.y <screenHeight/2 - 160){
            this.dvdSpeedy = 1
        }
        this.dvd.setY (this.dvd.y + this.dvdSpeedy)

        
        if ( this.temp < healthyMin || this.temp > healthyMax ) {
            this.counter += time.delta; // increase the counter if the temp is out of range 
        } else if ( this.counter !=0){
            this.counter = 0
        }

        if (this.counter > 20000){ // If the temp has been out of the health range for 5 seconds, roll to kill the egg
            if ( Phaser.Math.Between(1, 20) == 2){
                eggAlive = false;
            }
        }
    }
}
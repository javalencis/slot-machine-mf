import { Character } from "./Character.js";

class CharacterBot extends Character{
    static stopMoveBot= false
    stop() {

        let interval = setInterval(() => {
            if (Math.abs(this.velX) <= 2){
                
                this.timeInterval = 100;
                if (this.x <=  this.width * 2  && this.x>= this.width * 2 -1) {
                    CharacterBot.stopMoveBot = true;
                    clearInterval(interval);
                }
            } else {
                if (this.direction > 0) {
                    this.velX -= 0.02;
                } else {
                    this.velX += 0.02;
                }
            }
        }, this.timeInterval);
    }

    
    update() {
        if(CharacterBot.stopMoveBot){
            this.velX = 0
        }
        this.moveX();
        if (this.direction === -1) {
            if (this.x <= -this.width) {
                this.inScene = false
            } else {
                this.inScene = true
            }
        } else {
            if (this.x >= this.width * 3) {
                this.inScene = false
            } else {
                this.inScene = true
            }
        }
    }
}


export {CharacterBot}
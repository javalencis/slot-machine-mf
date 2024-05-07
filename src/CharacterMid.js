import { Character } from "./Character.js";

class CharacterMid extends Character{
    static stopMoveMid= false
    stop() {

        let interval = setInterval(() => {
            if (Math.abs(this.velX) <= 2){
                
                this.timeInterval = 100;
                if (this.x <=  this.width * 2 +2 && this.x>= this.width * 2 -2) {
                    CharacterMid.stopMoveMid = true;
                    clearInterval(interval);
                }
            } else {
                if (this.direction > 0) {
                    this.velX -= 0.1;
                } else {
                    this.velX += 0.1;
                }
            }
        }, this.timeInterval);
    }

    
    update() {
        if(CharacterMid.stopMoveMid){
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


export {CharacterMid}
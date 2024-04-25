class Character {
    constructor(x, y, width, height, direction,img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.direction = direction;
        this.velX = 0;
        this.img = img;
        this.inScene = true;
    }

    setVelX(velX) {
        this.velX = this.direction * velX;
    }

    moveX() {
        this.x += this.velX;
    }
    getX(){
        return this.x
    }
    draw(ctx) {
        this.width = this.img.width;
        this.height = this.img.height;
        ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
    }

    update() {
        this.moveX();
        if(this.x <= -this.width){
            this.inScene = false
        }else{
            this.inScene = true
        }
    }



}

export {Character}
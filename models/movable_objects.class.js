class MovableObjects extends DrawableObjects {
    speed = 0.2;
    otherDirection = false;
    speedy = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity(){
        setInterval(() => {
            if (this.ifAboveGround() || this.speedy > 0) {   
                this.y -= this.speedy;   
                this.speedy -= this.acceleration;
            }
        }, 1000 / 25);
    }

    ifAboveGround(){
        if(this instanceof ThrowableObjects){
            return true;
        }else{
            return this.y < 152;
        }
    }
   
    // character is colliding with mo
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&     //+ mo.width &&   
            this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.2;
    }

    isDeath() {
        return this.energy == 0;
    }

    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
        // this.walking_sound.playbackRate = 1.2;    
    }   
 
    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedy = 25;
    }
}

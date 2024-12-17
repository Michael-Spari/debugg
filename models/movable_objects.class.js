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
 
    ifAboveGround() {
        if (this instanceof ThrowableObjects) {
            return this.y < 380; // Beispiel: Bodenhöhe für Flaschen (Canvas-Höhe anpassen)
        } else {
            return this.y < 230; // Bodenhöhe für andere Objekte
        }
    }

    ifGrounded() {
        this.y == 230;
        return true;
    }
   
    // character is colliding with mo
    isColliding(mo) {
        return this.x + this.width > mo.x &&   // Rechte Seite von "this" überlappt linke Seite von "mo"
               this.x < mo.x + mo.width &&    // Linke Seite von "this" überlappt rechte Seite von "mo"
               this.y + this.height > mo.y && // Untere Seite von "this" überlappt obere Seite von "mo"
               this.y < mo.y + mo.height;     // Obere Seite von "this" überlappt untere Seite von "mo"
    }

    // bottle is colliding with mo
    isCollidingWithBottle(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&   // Rechte Seite von "this" überlappt linke Seite von "mo"
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // Untere Seite von "this" überlappt obere Seite von "mo"
                this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&    // Linke Seite von "this" überlappt rechte Seite von "mo"
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;     // Obere Seite von "this" überlappt untere Seite von "mo"
    }
    

    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        console.log('Bug energy:', this.energy); // Debug-Ausgabe
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.2;
    }

    isDeath() {
        return this.energy <= 0;
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

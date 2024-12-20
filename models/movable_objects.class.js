class MovableObjects extends DrawableObjects {
    speed = 0.1;
    otherDirection = false;
    speedy = 0; // Geschwindigkeit in y-Richtung
    acceleration = 2.5; // Schwerkraft
    energy = 100;
    lastHit = 0; // Zeitpunkt des letzten Treffers
    targetHit; // Zielposition des Hammers nach dem Treffen des Bugs

    offset = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    }

    // Funktion die die Schwerkraft auf Objekte anwendet
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
            return this.y < 580; // Beispiel: Bodenhöhe für Hammer (Canvas-Höhe anpassen)
        } else {
            return this.y < 230; // Bodenhöhe für andere Objekte
        }
    }

    isColliding(mo) {
        return this.x + this.offset.x + this.width - this.offset.width > mo.x + mo.offset.x &&
            this.y + this.offset.y + this.height - this.offset.height > mo.y + mo.offset.y &&
            this.x + this.offset.x < mo.x+ mo.offset.x  + mo.width - mo.offset.width &&
            this.y + this.offset.y < mo.y + mo.offset.y + mo.height - mo.offset.height;
    }
    
    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        console.log('energy:', this.energy); // Debug-Ausgabe
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
        let i = this.currentImage % images.length; // Index des Bildes
        let path = images[i]; // Pfad des Bildes
        this.img = this.imageCache[path]; // Ausgewähltes Bild wird geladen
        this.currentImage++; // welches Bild wird als nächstes angezeigt
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

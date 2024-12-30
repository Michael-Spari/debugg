class ThrowableObjects extends MovableObjects {
    isFalling = false; // Atribute für fallenden Hammer   
    // targetHit = 500; // Zielposition des Hammers nach dem Treffen des Bugs

    constructor(x, y) {
        super().loadImage('img/debugger/6_hammer/strahl.png');
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.throw();
        // this.throwLeft();       
    }
    
    throw() {
        this.speedy = 5;  // Geschwindigkeit in y-Richtung
        this.applyGravity(); // schwerkraft aus MovableObjects wird angewendet
        setInterval(() => { // Hammer wird nach rechts geworfen
            this.x += 25; // Hammer wird nach rechts geworfen
        }, 25); // Geschwindigkeit des Hammers
    }

    throwLeft() {
        this.throw = 5; // Geschwindigkeit in y-Richtung
        setInterval(() => {
            this.x -= 25; // Hammer wird nach links geworfen
        }, 25); // Geschwindigkeit des Hammers
    }

    // funktion die den Hammer beim treffen der Bugs fallen lässt    
    startFalling() {
        this.isFalling = true; // Hammer fällt wenn er auf Bug trifft
        this.applyGravityHammer(); // schwerkraft aus MovableObjects wird angewendet
    }

    applyGravityHammer() {
        setInterval(() => {
            if (this.y < this.targetHit) { // Prüfen ob Hammer noch nicht am Boden ist
                this.y -= this.speedy; // Position aktualisieren und Hammer nach oben bewegen
                this.speedy -= this.acceleration; // Beschleunigung anwenden und Hammer fallen lassen
            } else {
                this.y = this.targetHit; // Zielposition festlegen und Hammer dort platzieren
                this.isFalling = false; // Fallmodus wenn Hammer Zielposition erreicht hat
            }
        }, 1000 / 60);
    }

}
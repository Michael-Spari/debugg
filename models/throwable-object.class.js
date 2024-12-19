class ThrowableObjects extends MovableObjects {
    isFalling = false; // Atribute für fallenden Hammer   
    // targetHit = 500; // Zielposition des Hammers nach dem Treffen des Bugs

    constructor(x, y) {
        super().loadImage('img/debugger/6_hammer/strahl.png');
        this.x = x;
        this.y = 300;
        this.width = 80;
        this.height = 80;
        this.throw();       
    }
    
    throw() {
        this.speedy = 5;
        this.applyGravity();
        setInterval(() => {
            this.x += 25;
            this.y -= 0;
        }, 25);
    }

    // funktion die den Hammer beim treffen der Bugs fallen lässt    
    startFalling() {
        this.isFalling = true; // Hammer fällt wenn er auf Bug trifft
        // this.targetY = 500; // Zielposition des Hammers nach dem Treffen des Bugs
        this.applyGravityHammer(); // schwerkraft aus MovableObjects wird angewendet
    }

    applyGravityHammer() {
        if (this.isFalling) {
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

}
class Spray extends ThrowableObjects {


    constructor(x, y, direction) {
        super(x, y); // Position an die Basisklasse übergeben
        this.loadImage('img/debugger/6_hammer/strahl.png');
        this.otherDirection = direction === 'left'; // Speichere, ob das Spray nach links geworfen wird
        this.throw(direction); // Das Spray in die entsprechende Richtung werfen
    }

    throw(direction) {
        this.speedX = direction === 'left' ? -25 : 25; // Geschwindigkeit basierend auf der Richtung setzen
        this.applyGravity(); // Schwerkraft anwenden (falls benötigt)

        // Bewegung basierend auf der Geschwindigkeit
        setInterval(() => {
            this.x += this.speedX;
        }, 25);
    }

    // Funktion, die das Objekt beim Treffen eines Ziels fallen lässt
    startFalling(targetHit) {
        this.isFalling = true; // Fallmodus aktivieren
        this.applyGravityHammer(targetHit);
    }

    // Anpassung der Schwerkraft, wenn das Objekt fällt
    applyGravityHammer(targetHit) {
        setInterval(() => {
            if (this.y < targetHit) {
                this.y += this.speedy; // Position nach unten bewegend
                this.speedy += this.acceleration; // Beschleunigung anwenden
            } else {
                this.y = targetHit; // Zielposition erreichen
                this.isFalling = false; // Fallmodus deaktivieren
            }
        }, 1000 / 60);
    }
}
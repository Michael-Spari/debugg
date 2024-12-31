class ThrowableObjects extends MovableObjects {
    isFalling = false; // Zustand, ob das Objekt fällt
    speedy = 5; // Geschwindigkeit in y-Richtung

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
    }

    // Methode, die das Objekt in eine Richtung wirft
    throw(direction) {
        this.applyGravity(); // Schwerkraft aus MovableObjects anwenden

        setInterval(() => {
            if (direction === 'left') {
                this.x -= 25; // Nach links bewegen
            } else if (direction === 'right') {
                this.x += 25; // Nach rechts bewegen
            }
        }, 25); // Geschwindigkeit des Objekts
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

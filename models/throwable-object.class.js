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
}

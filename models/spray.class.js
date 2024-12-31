class Spray extends ThrowableObjects {
    constructor(x, y, direction) {
        super(x, y); // Position an die Basisklasse übergeben
        this.loadImage('img/debugger/6_hammer/strahl.png');
        this.throw(direction); // Das Spray in die entsprechende Richtung werfen
    }
}
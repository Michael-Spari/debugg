class SprayCounter extends DrawableObjects {
    static instance;

    constructor() {
        if (SprayCounter.instance) {
            return SprayCounter.instance;
        }
        super();
        this.loadImage('img/debugger/6_hammer/strahl.png'); // Spray-Bild laden
        this.x = 15;
        this.y = 70;
        this.width = 40;
        this.height = 40;
        this.sprayCount = 35; // Startanzahl der Sprays
        SprayCounter.instance = this;
    }

    static getInstance() {
        if (!SprayCounter.instance) {
            SprayCounter.instance = new SprayCounter();
        }
        return SprayCounter.instance;
    }

    decrement() {
        if (this.sprayCount > 0) {
            this.sprayCount--;
            console.log('SprayCounter decremented to:', this.sprayCount); // Log the decrement
        }
    }

    getCount() {
        return this.sprayCount;
    }

    setCount(count) {
        this.sprayCount = count;
        console.log('SprayCounter set to:', this.sprayCount); // Log the new count
    }

    draw(ctx) {
        super.draw(ctx); // Spray-Bild zeichnen
        // Hintergrund für den Zähler
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(this.x + 50 + 5, this.y + 10); // Startpunkt oben links
        ctx.arcTo(this.x + 50 + 40, this.y + 10, this.x + 50 + 40, this.y + 30, 5); // Oben rechts
        ctx.arcTo(this.x + 50 + 40, this.y + 30, this.x + 50, this.y + 30, 5); // Unten rechts
        ctx.arcTo(this.x + 50, this.y + 30, this.x + 50, this.y + 10, 5); // Unten links
        ctx.arcTo(this.x + 50, this.y + 10, this.x + 50 + 40, this.y + 10, 5); // Oben links
        ctx.closePath();
        ctx.fill();

        // Text für den Zähler
        ctx.font = '14px mpluscoad';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'right'; // Text rechts ausrichten
        ctx.textBaseline = 'middle'; // Text vertikal zentrieren
        ctx.fillText(this.sprayCount, this.x + 50 + 35, this.y + 20); // Text zeichnen
    }
}




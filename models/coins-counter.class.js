class CoinsCounter extends DrawableObjects {
    static instance;

    constructor() {
        if (CoinsCounter.instance) {
            return CoinsCounter.instance;
        }
        super();
        this.loadImage('img/debugger/9_coins/daCoins.png'); // Coin-Bild laden
        this.x = 15;
        this.y = 50;
        this.width = 50;
        this.height = 50;
        this.coinCount = 0; // Anzahl der Münzen
        CoinsCounter.instance = this;
    }

    static getInstance() {
        if (!CoinsCounter.instance) {
            CoinsCounter.instance = new CoinsCounter();
        }
        return CoinsCounter.instance;
    }

    increment() {
        this.coinCount++;
        console.log('CoinsCounter incremented to:', this.coinCount); // Log the increment
    }

    draw(ctx) {
        super.draw(ctx); // Coin-Bild zeichnen
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(this.x + 50 + 5, this.y + 10); // Startpunkt oben links
        ctx.arcTo(this.x + 50 + 40, this.y + 10, this.x + 50 + 40, this.y + 30, 5); // Oben rechts
        ctx.arcTo(this.x + 50 + 40, this.y + 30, this.x + 50, this.y + 30, 5); // Unten rechts
        ctx.arcTo(this.x + 50, this.y + 30, this.x + 50, this.y + 10, 5); // Unten links
        ctx.arcTo(this.x + 50, this.y + 10, this.x + 50 + 40, this.y + 10, 5); // Oben links
        ctx.closePath();
        ctx.fill();
        ctx.font = '14px mpluscoad';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'right'; // Text rechts ausrichten
        ctx.textBaseline = 'middle'; // Text vertikal zentrieren
        ctx.fillText(this.coinCount, this.x + 50 + 35, this.y + 20); // Text zeichnen
    }
}



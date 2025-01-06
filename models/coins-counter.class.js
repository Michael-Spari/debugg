/**
 * Represents a singleton counter for counting coins.
 * @class CoinsCounter
 * @extends DrawableObjects
 */
class CoinsCounter extends DrawableObjects {
    /**
     * Holds the single instance of CoinsCounter.
     * @static
     * @type {CoinsCounter}
     */
    static instance;

    /**
     * Creates an instance of the CoinsCounter class.
     * Initializes the position, size, and coin count.
     * If an instance already exists, it returns the existing instance.
     */
    constructor() {
        if (CoinsCounter.instance) {
            return CoinsCounter.instance;
        }
        super();
        this.loadImage('img/debugger/9_coins/daCoins.png');
        this.x = 15;
        this.y = 40;
        this.width = 40;
        this.height = 40;
        this.coinCount = 0;
        CoinsCounter.instance = this;
    }

    /**
     * Returns the single instance of CoinsCounter. If no instance exists, creates one.
     * @static
     * @returns {CoinsCounter} The instance of CoinsCounter.
     */
    static getInstance() {
        if (!CoinsCounter.instance) {
            CoinsCounter.instance = new CoinsCounter();
        }
        return CoinsCounter.instance;
    }

    /**
     * Increments the coin count by one.
     * Logs the updated coin count to the console.
     */
    increment() {
        this.coinCount++;
        console.log('CoinsCounter incremented to:', this.coinCount);
    }

    /**
     * Draws the coin counter on the canvas.
     * @param {CanvasRenderingContext2D} ctx The drawing context of the canvas.
     */
    draw(ctx) {
        super.draw(ctx);
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(this.x + 50 + 5, this.y + 10);
        ctx.arcTo(this.x + 50 + 40, this.y + 10, this.x + 50 + 40, this.y + 30, 5);
        ctx.arcTo(this.x + 50 + 40, this.y + 30, this.x + 50, this.y + 30, 5);
        ctx.arcTo(this.x + 50, this.y + 30, this.x + 50, this.y + 10, 5);
        ctx.arcTo(this.x + 50, this.y + 10, this.x + 50 + 40, this.y + 10, 5);
        ctx.closePath();
        ctx.fill();
        ctx.font = '14px mpluscoad';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.coinCount, this.x + 50 + 35, this.y + 20);
    }
}




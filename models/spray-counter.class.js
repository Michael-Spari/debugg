/**
 * A singleton class to manage and display the spray count in the game.
 * The SprayCounter keeps track of how many sprays are available and provides methods to modify and display the count.
 * @class SprayCounter
 * @extends DrawableObjects
 */
class SprayCounter extends DrawableObjects {
    /**
     * Singleton instance of the SprayCounter class.
     * @static
     * @type {SprayCounter}
     */
    static instance;

    /**
     * Creates an instance of the SprayCounter class, initializing the spray count and position.
     * Ensures only one instance of SprayCounter is created (singleton pattern).
     * @constructor
     */
    constructor() {
        // Ensure only one instance of SprayCounter exists (singleton pattern)
        if (SprayCounter.instance) {
            return SprayCounter.instance;
        }
        super();
        this.loadImage('img/debugger/6_hammer/strahl.png');
        
        /**
         * The x-coordinate of the spray counter.
         * @type {number}
         */
        this.x = 15;

        /**
         * The y-coordinate of the spray counter.
         * @type {number}
         */
        this.y = 70;

        /**
         * The width of the spray counter.
         * @type {number}
         */
        this.width = 40;

        /**
         * The height of the spray counter.
         * @type {number}
         */
        this.height = 40;

        /**
         * The current number of sprays available.
         * @type {number}
         */
        this.sprayCount = 35;

        // Set the singleton instance
        SprayCounter.instance = this;
    }

    /**
     * Returns the singleton instance of the SprayCounter.
     * If no instance exists, a new one is created.
     * @static
     * @returns {SprayCounter} The instance of SprayCounter.
     */
    static getInstance() {
        if (!SprayCounter.instance) {
            SprayCounter.instance = new SprayCounter();
        }
        return SprayCounter.instance;
    }

    /**
     * Increments the spray count by a given amount.
     * The spray count cannot exceed the maximum value.
     * @param {number} amount The amount to increase the spray count by.
     */
    incrementBy(amount) {
        this.sprayCount = Math.min(this.sprayCount + amount);
    }

    /**
     * Decrements the spray count by 1.
     * Ensures that the spray count does not go below 0.
     */
    decrement() {
        if (this.sprayCount > 0) {
            this.sprayCount--;
        }
    }

    /**
     * Retrieves the current spray count.
     * @returns {number} The current spray count.
     */
    getCount() {
        return this.sprayCount;
    }

    /**
     * Sets the spray count to a specific value.
     * @param {number} count The new spray count value.
     */
    setCount(count) {
        this.sprayCount = count;
    }

    reset() {
        this.sprayCount = 35;
      }

    /**
     * Draws the spray counter on the canvas.
     * @param {CanvasRenderingContext2D} ctx The canvas context to draw on.
     */
    draw(ctx) {
        super.draw(ctx);

        // Draw the background of the spray counter
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(this.x + 50 + 5, this.y + 10);
        ctx.arcTo(this.x + 50 + 40, this.y + 10, this.x + 50 + 40, this.y + 30, 5);
        ctx.arcTo(this.x + 50 + 40, this.y + 30, this.x + 50, this.y + 30, 5);
        ctx.arcTo(this.x + 50, this.y + 30, this.x + 50, this.y + 10, 5);
        ctx.arcTo(this.x + 50, this.y + 10, this.x + 50 + 40, this.y + 10, 5);
        ctx.closePath();
        ctx.fill();

        // Draw the spray count text
        ctx.font = '14px mpluscoad';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.sprayCount, this.x + 50 + 35, this.y + 20);
    }
}





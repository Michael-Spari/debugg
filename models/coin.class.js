/**
 * Represents a coin that extends the MovableObjects class.
 * @class Coin
 * @extends MovableObjects
 */
class Coin extends MovableObjects {
    /**
     * Y-coordinate position of the coin.
     * @type {number}
     */
    y = this.y;

    /**
     * X-coordinate position of the coin.
     * @type {number}
     */
    x = this.x;

    /**
     * The height of the coin.
     * @type {number}
     */
    height = 50;

    /**
     * The width of the coin.
     * @type {number}
     */
    width = 50;

    /**
     * Array holding the image path(s) of the coin.
     * @type {string[]}
     */
    IMAGES_COINS = [
        'img/debugger/9_coins/daCoins.png',
    ];

    /**
     * Creates an instance of the Coin class.
     * Initializes the coin image.
     */
    constructor() {
        super();
        this.loadImage('img/debugger/9_coins/daCoins.png');
    }
}

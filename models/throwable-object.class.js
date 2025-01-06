/**
 * Class representing throwable objects in the game.
 * This class extends the `MovableObjects` class and manages the behavior of objects that can be thrown.
 * @class ThrowableObjects
 * @extends MovableObjects
 */
class ThrowableObjects extends MovableObjects {
    
    /**
     * Indicates whether the object is falling.
     * @type {boolean}
     */
    isFalling = false;

    /**
     * The speed at which the object falls or moves.
     * @type {number}
     */
    speedy = 5;

    /**
     * Creates an instance of the ThrowableObjects class.
     * Initializes the object's position, size, and other properties.
     * @constructor
     * @param {number} x The x-coordinate of the object.
     * @param {number} y The y-coordinate of the object.
     */
    constructor(x, y) {
        super();
        
        /**
         * The x-coordinate of the throwable object.
         * @type {number}
         */
        this.x = x;

        /**
         * The y-coordinate of the throwable object.
         * @type {number}
         */
        this.y = y;

        /**
         * The width of the throwable object.
         * @type {number}
         */
        this.width = 80;

        /**
         * The height of the throwable object.
         * @type {number}
         */
        this.height = 80;
    }
}


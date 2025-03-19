/**
 * Represents a platform object in the game.
 * It can be interacted with and may change its appearance when collided.
 * @class Plattform
 * @extends MovableObjects
 */
class Plattform extends MovableObjects {
    /**
     * Creates an instance of the Plattform object and initializes its properties.
     * @constructor
     */
    constructor() {
        super();
        this.img = new Image();
        this.img.src = 'img/debugger/plattforms/plattform-4.png';

        /**
         * The x-coordinate of the platform.
         * @type {number}
         */
        this.x = 3300;

        /**
         * The y-coordinate of the platform.
         * @type {number}
         */
        this.y = 300;

        /**
         * The width of the platform.
         * @type {number}
         */
        this.width = 150;

        /**
         * The height of the platform.
         * @type {number}
         */
        this.height = 150;

        /**
         * A flag indicating if the platform has been collided with.
         * @type {boolean}
         */
        this.collided = false;
    }

    /**
     * Checks if the platform has been collided with.
     * If it has, the platform's appearance is updated.
     * @returns {boolean} Returns true if the platform has been collided with, otherwise false.
     */
    isChecked() {
        if (this.collided === true) {
            this.img.src = 'img/debugger/plattforms/plattform-1.png';  // Change appearance after collision
        }
        return this.collided;
    }
}


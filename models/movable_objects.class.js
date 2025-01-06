/**
 * Class representing movable objects in the game.
 * Inherits from the DrawableObjects class.
 */
class MovableObjects extends DrawableObjects {
    /**
     * The speed at which the object moves horizontally.
     * @type {number}
     */
    speed = 0.1;

    /**
     * A flag indicating if the object is moving in the opposite direction.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * The speed of the object along the y-axis (vertical speed).
     * @type {number}
     */
    speedy = 0;

    /**
     * The acceleration applied to the object's speed in the y-axis.
     * @type {number}
     */
    acceleration = 2.5;

    /**
     * The energy level of the object.
     * @type {number}
     */
    energy = 100;

    /**
     * The timestamp of the last time the object was hit.
     * @type {number}
     */
    lastHit = 0;

    /**
     * The object that was hit, if any.
     * @type {Object}
     */
    targetHit;

    /**
     * Offset properties for the object (x, y, width, height).
     * Used for collision detection and positioning.
     * @type {Object}
     */
    offset = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };

    /**
     * Applies gravity to the object by adjusting its vertical position.
     * The object falls if above the ground or if it is moving upwards.
     * This method is called periodically.
     */
    applyGravity() {
        setInterval(() => {
            if (this.ifAboveGround() || this.speedy > 0) {   
                this.y -= this.speedy;   
                this.speedy -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * The condition differs for throwable objects.
     * @returns {boolean} - True if the object is above the ground, false otherwise.
     */
    ifAboveGround() {
        if (this instanceof ThrowableObjects) {
            return this.y < 580;
        } else {
            return this.y < 230;
        }
    }

    /**
     * Checks if this object is colliding with another movable object.
     * @param {MovableObjects} mo - The other movable object to check for collision.
     * @returns {boolean} - True if the objects are colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.offset.x + this.width - this.offset.width > mo.x + mo.offset.x &&
            this.y + this.offset.y + this.height - this.offset.height > mo.y + mo.offset.y &&
            this.x + this.offset.x < mo.x + mo.offset.x + mo.width - mo.offset.width &&
            this.y + this.offset.y < mo.y + mo.offset.y + mo.height - mo.offset.height;
    }

    /**
     * Reduces the energy of the object when it is hit.
     * Energy decreases by 2 on each hit.
     */
    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }

    /**
     * Checks if the object is hurt, based on the time since the last hit.
     * @returns {boolean} - True if the object is hurt (hit recently), false otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.2;
    }

    /**
     * Checks if the object is dead, based on its energy level.
     * @returns {boolean} - True if the object is dead (energy <= 0), false otherwise.
     */
    isDeath() {
        return this.energy <= 0;
    }

    /**
     * Plays the animation for the object by cycling through a series of images.
     * @param {Array<string>} images - An array of image paths to be used for animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by applying a vertical speed (speedy).
     */
    jump() {
        this.speedy = 25;
    }
}

/**
 * Represents a throwable spray object that can move and fall with gravity.
 * Extends the ThrowableObjects class.
 */
class Spray extends ThrowableObjects {
    /**
     * Creates an instance of the Spray class.
     * @param {number} x - The initial x-coordinate of the spray.
     * @param {number} y - The initial y-coordinate of the spray.
     * @param {string} direction - The direction of the spray ('left' or 'right').
     */
    constructor(x, y, direction) {
      super(x, y);
      this.loadImage('img/debugger/6_hammer/strahl.png');
      this.otherDirection = direction === 'left';
      this.throw(direction);
    }
  
    /**
     * Initiates the throw movement of the spray in the specified direction.
     * @param {string} direction - The direction of the throw ('left' or 'right').
     */
    throw(direction) {
      this.speedX = direction === 'left' ? -25 : 25;
      this.applyGravity();
  
      this.throwInterval = setInterval(() => {
        this.x += this.speedX;
      }, 25);
    }
  
    /**
     * Starts the falling behavior of the spray object.
     * @param {number} targetHit - The y-coordinate where the spray should stop falling.
     */
    startFalling(targetHit) {
      this.isFalling = true;
      this.applyGravityHammer(targetHit);
    }
  
    /**
     * Applies gravity to the spray object while it is falling.
     * @param {number} targetHit - The y-coordinate where the spray should stop falling.
     */
    applyGravityHammer(targetHit) {
      this.gravityInterval = setInterval(() => {
        if (this.y < targetHit) {
          this.y += this.speedy;
          this.speedy += this.acceleration;
        } else {
          this.y = targetHit;
          this.isFalling = false;
          clearInterval(this.gravityInterval);
        }
      }, 1000 / 60);
    }
  
    /**
     * Clears all active intervals associated with the spray object.
     */
    clearIntervals() {
      clearInterval(this.throwInterval);
      clearInterval(this.gravityInterval);
    }
  }
  

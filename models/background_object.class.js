/**
 * Represents a background object in the game.
 * Extends the `MovableObjects` class to allow movement if necessary.
 */
class BackgroundObject extends MovableObjects {
  
    /** 
     * The width of the background object. 
     * @type {number}
     */
    width = 720;
  
    /** 
     * The height of the background object. 
     * @type {number}
     */
    height = 480;
  
    /**
     * Creates an instance of a background object.
     * @param {string} imagePath - The file path of the image to load for the background object.
     * @param {number} x - The x-coordinate position of the background object.
     * @param {number} y - The y-coordinate position of the background object.
     */
    constructor(imagePath, x, y) {
      super().loadImage(imagePath);
      this.x = x;
      this.y = y;
    }
  }
  
/**
 * Represents a drawable object with image and position properties.
 * Provides methods to load and draw images on a canvas, along with bounding box visualization.
 * @class DrawableObjects
 */
class DrawableObjects {
    /**
     * The x-coordinate position of the object.
     * @type {number}
     */
    x = 100;

    /**
     * The y-coordinate position of the object.
     * @type {number}
     */
    y = 100;

    /**
     * The height of the object.
     * @type {number}
     */
    height = 180;

    /**
     * The width of the object.
     * @type {number}
     */
    width = 100;

    /**
     * The image associated with the object.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * Cache for images loaded into the object.
     * @type {Object}
     */
    imageCache = {};

    /**
     * The index of the currently displayed image in the sequence.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Loads an image from the specified path and sets it as the object's image.
     * @param {string} path - The path to the image to be loaded.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object's image on the canvas at its current position and size.
     * @param {CanvasRenderingContext2D} ctx - The drawing context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a red bounding box around the object for debugging purposes.
     * The box is drawn only if the object is an instance of specific classes.
     * @param {CanvasRenderingContext2D} ctx - The drawing context of the canvas.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Bug || this instanceof Endboss || this instanceof ThrowableObjects || this instanceof BigEndboss || this instanceof Coin || this instanceof DeathFly) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Draws a blue bounding box around the object with offsets for debugging purposes.
     * The box is drawn only if the object is an instance of specific classes.
     * @param {CanvasRenderingContext2D} ctx - The drawing context of the canvas.
     */
    drawOffsetFrame(ctx) {
        if (this instanceof Character || this instanceof Bug || this instanceof Endboss || this instanceof ThrowableObjects || this instanceof BigEndboss || this instanceof Coin || this instanceof Cloud || this instanceof DeathFly || this instanceof Plattform || this instanceof Comando) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.x + this.offset.x,
                this.y + this.offset.y,
                this.width - this.offset.width,
                this.height - this.offset.height
            );
            ctx.stroke();
        }
    }

    /**
     * Loads an array of images and caches them for later use.
     * @param {string[]} arr - An array of image paths to be loaded.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}


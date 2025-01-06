/**
 * Represents a cloud object in the game.
 * Extends the `MovableObjects` class and handles animations and movement for clouds.
 */
class Cloud extends MovableObjects {
    /** The vertical position of the cloud. */
    y = 20;

    /** The height of the cloud. */
    height = 150;

    /** The width of the cloud. */
    width = 500;

    /**
     * Images used for the cloud animation.
     * @type {string[]}
     */
    IMAGES_FLY = [
        'img/debugger/5_background/2_second_layer/fly_1.png',
        'img/debugger/5_background/2_second_layer/fly_2.png',
        'img/debugger/5_background/2_second_layer/fly_1.png',
        'img/debugger/5_background/2_second_layer/fly_2.png',
        'img/debugger/5_background/2_second_layer/fly_1.png',
        'img/debugger/5_background/2_second_layer/fly_2.png',
        'img/debugger/5_background/2_second_layer/fly_1.png',
        'img/debugger/5_background/2_second_layer/fly_2.png',
    ];

    /**
     * Creates a new cloud object.
     * Loads images, sets a random horizontal position, and starts the animation.
     */
    constructor() {
        super().loadImage('img/debugger/5_background/2_second_layer/fly_1.png');
        this.loadImages(this.IMAGES_FLY);
        this.x = Math.random() * 5000;
        this.animate();
    }

    /**
     * Moves the cloud to the left by a fixed amount.
     */
    moveLeft() {
        this.x -= 1.2;
    }

    /**
     * Animates the cloud by moving it left and playing its animation frames.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
            this.playAnimation(this.IMAGES_FLY);
        }, 1000 / 240); // High frame rate for smooth movement
    }
}

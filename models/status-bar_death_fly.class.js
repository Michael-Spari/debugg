/**
 * Class representing the status bar for the death fly's health in the game.
 * This class manages the display of the death fly's health using different images based on the health percentage.
 * @class StatusBarDeathFly
 * @extends DrawableObjects
 */
class StatusBarDeathFly extends DrawableObjects {

    /**
     * Array of images representing the different stages of the enemy's health.
     * Each image corresponds to a specific health percentage.
     * @type {string[]}
     */
    IMAGES = [
        'img/debugger/statusbar/enemy_health/e0.png',
        'img/debugger/statusbar/enemy_health/e20.png',
        'img/debugger/statusbar/enemy_health/e30.png',
        'img/debugger/statusbar/enemy_health/e40.png',
        'img/debugger/statusbar/enemy_health/e50.png',
        'img/debugger/statusbar/enemy_health/e60.png',
        'img/debugger/statusbar/enemy_health/e70.png',
        'img/debugger/statusbar/enemy_health/e80.png',
        'img/debugger/statusbar/enemy_health/e90.png',
        'img/debugger/statusbar/enemy_health/e100.png',
    ];

    /**
     * The current health percentage of the death fly.
     * @type {number}
     */
    percentage = 100;

    /**
     * Creates an instance of the StatusBarDeathFly class, loading the images and setting the initial health percentage.
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        
        /**
         * The x-coordinate of the status bar.
         * @type {number}
         */
        this.x = -555;

        /**
         * The y-coordinate of the status bar.
         * @type {number}
         */
        this.y = 0;

        /**
         * The width of the status bar.
         * @type {number}
         */
        this.width = 150;

        /**
         * The height of the status bar.
         * @type {number}
         */
        this.height = 40;

        // Set the initial percentage to 100 (full health)
        this.setPercentage(100);
    }

    /**
     * Sets the health percentage of the death fly and updates the corresponding image.
     * @param {number} percentage The health percentage to set (from 0 to 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;

        // Resolve the image based on the health percentage
        let path = this.IMAGES[this.resolveImage()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current health percentage.
     * Returns an index that corresponds to the appropriate health image.
     * @returns {number} The index of the image representing the current health percentage.
     */
    resolveImage() {
        if (this.percentage == 100) {
            return 9;
        } else if (this.percentage >= 90) {
            return 8;
        } else if (this.percentage >= 80) {
            return 7;
        } else if (this.percentage >= 70) {
            return 6;
        } else if (this.percentage >= 60) {
            return 5;
        } else if (this.percentage >= 50) {
            return 4;
        } else if (this.percentage >= 40) {
            return 3;
        } else if (this.percentage >= 30) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}

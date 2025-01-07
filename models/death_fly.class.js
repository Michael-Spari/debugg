/**
 * Represents a DeathFly enemy that extends the MovableObjects class.
 * Handles movement, attack, and animation for the DeathFly.
 * @class DeathFly
 * @extends MovableObjects
 */
class DeathFly extends MovableObjects {
    /**
     * The y-coordinate position of the DeathFly.
     * @type {number}
     */
    y = 35;

    /**
     * The height of the DeathFly.
     * @type {number}
     */
    height = 400;

    /**
     * The width of the DeathFly.
     * @type {number}
     */
    width = 400;

    /**
     * The energy of the DeathFly.
     * @type {number}
     */
    energy = 100;

    /**
     * The speed of the DeathFly.
     * @type {number}
     */
    speed = 3;

    /**
     * The offset values for collision detection and position adjustments.
     * @type {Object}
     * @property {number} x - Horizontal offset.
     * @property {number} y - Vertical offset.
     * @property {number} width - Width offset.
     * @property {number} height - Height offset.
     */
    offset = {
        x: 30,
        y: 100,
        width: 260,
        height: 260,
    };

    /**
     * Array of image paths for the walking animation of the DeathFly.
     * @type {string[]}
     */
    IMAGES_WALK = [
        'img/debugger/8_death_fly/walking/death_fly_1.png',
        'img/debugger/8_death_fly/walking/death_fly_2.png',
    ];

    /**
     * Array of image paths for the attack animation of the DeathFly.
     * @type {string[]}
     */
    IMAGES_ATACK = [
        'img/debugger/8_death_fly/attack/death_fly_attack.png',
    ];

    /**
     * Array of image paths for the death animation of the DeathFly.
     * @type {string[]}
     */
    IMAGES_DEATH = [
        'img/debugger/8_death_fly/death/death_fly_death.png',
    ];

    /**
     * Creates an instance of the DeathFly class.
     * Initializes the image, position, movement properties, and animation states.
     * @param {Object} character - The character object to interact with.
     */
    constructor(character) {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_ATACK);
        this.x = 5750;
        this.Character = character;
        this.isAttacking = false;
        this.originalWidth = this.width;
        this.walkDirection = 'left';
        this.maxWalkDistance = 100;
        this.startingX = this.x;
        this.animate();
    }

    /**
     * Reduces the DeathFly's energy when it is hit.
     * If energy reaches 0, it will stop.
     */
    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Moves the DeathFly to the left if it is not dead or attacking.
     */
    moveLeft() {
        if (!this.isDeath() && !this.isAttacking) {
            this.x -= this.speed;
        }
    }

    /**
     * Moves the DeathFly to the right if it is not dead or attacking.
     */
    moveRight() {
        if (!this.isDeath() && !this.isAttacking) {
            this.x += this.speed;
        }
    }

    /**
     * Starts the animation loop for walking, attacking, and death behaviors.
     */
    animate() {
        setInterval(() => {
            if (this.energy <= 0) {
                this.playAnimation(this.IMAGES_DEATH);
                this.speed = 0;
                if (this.y < 500) this.y += 8;
            } else if (!this.isAttacking) {
                this.handleWalkMode();
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 1000 / 25);

        setInterval(() => {
            if (this.Character) {
                const distance = Math.abs(this.Character.x - this.x);
                if (distance <= 300 && this.energy > 0) {
                    this.startAttackAnimation();
                }
            }
        }, 1000 / 25);
    }

    /**
     * Handles the movement logic for walking left and right within the defined distance.
     */
    handleWalkMode() {
        if (this.walkDirection === 'left' && this.x > this.startingX - this.maxWalkDistance) {
            this.moveLeft();
        } else if (this.walkDirection === 'left') {
            this.walkDirection = 'right';
        }

        if (this.walkDirection === 'right' && this.x < this.startingX + this.maxWalkDistance) {
            this.moveRight();
        } else if (this.walkDirection === 'right') {
            this.walkDirection = 'left';
        }
    }

    /**
     * Starts the attack animation and temporarily enlarges the DeathFly's hitbox.
     */
    startAttackAnimation() {
        if (!this.isAttacking) {
            this.isAttacking = true;
            const widthIncrease = 200;
            this.x -= widthIncrease / 0.8;
            this.width += widthIncrease;

            this.playAnimation(this.IMAGES_ATACK);

            setTimeout(() => {
                this.width = this.originalWidth;
                this.x += widthIncrease / 0.8;
                this.isAttacking = false;
            }, 500);
        }
    }
}


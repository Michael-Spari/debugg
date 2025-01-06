/**
 * Represents the Endboss object in the game, extending MovableObjects.
 * Handles the movement, animation, damage, and death behavior of the boss character.
 * @class Endboss
 * @extends MovableObjects
 */
class Endboss extends MovableObjects {
    /**
     * The y-coordinate position of the Endboss.
     * @type {number}
     */
    y = 230;

    /**
     * The height of the Endboss.
     * @type {number}
     */
    height = 200;

    /**
     * The width of the Endboss.
     * @type {number}
     */
    width = 200;

    /**
     * The health (energy) of the Endboss.
     * @type {number}
     */
    energy = 200;

    /**
     * The speed of the Endboss.
     * @type {number}
     */
    speed = 3;

    /**
     * The death sound of the Endboss.
     * @type {HTMLAudioElement}
     */
    death_sound = new Audio('./audio/bugs_sprayed.mp4');

    /**
     * The offset values used for drawing the Endboss' bounding box.
     * @type {Object}
     */
    offset = {
        x: 30,
        y: 60,
        width: 60,
        height: 60,
    }

    /**
     * The walking animation images for the Endboss.
     * @type {string[]}
     */
    IMAGES_WALK = [
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_4.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_1.png',
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_4.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_2.png',
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png',
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_4.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
    ];

    /**
     * The attack animation image for the Endboss.
     * @type {string[]}
     */
    IMAGES_ATACK = [
        'img/debugger/4_enemies_boss_bug/attack/bossbug_attack.png'
    ];

    /**
     * The death animation image for the Endboss.
     * @type {string[]}
     */
    IMAGES_DEATH = [
        'img/debugger/4_enemies_boss_bug/dead/bossbugTot_1.png',
    ];

    /**
     * Creates an instance of the Endboss and initializes the object properties and animations.
     */
    constructor () {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_ATACK);
        this.x = 3200 + Math.random() * 7200;
        this.speed = 2.2 + Math.random() * 8;
        this.animate();
    }

    /**
     * Moves the Endboss to the left.
     */
    moveLeft() {
        if (!this.isDeath()) {
            this.x -= this.speed;
        }
    }

    /**
     * Reduces the Endboss' energy when hit.
     * @param {number} damage - The amount of damage to subtract from the Endboss' energy.
     */
    hit() {
        this.energy -= 50;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Handles the Endboss' animation behavior. Plays the walking or death animation based on the state of the Endboss.
     */
    animate() {
        const intervalId = setInterval(() => {
            if (this.isDeath()) {
                if (!this.death_sound_played) {
                    this.death_sound.play();
                    this.death_sound_played = true;
                }
                this.playAnimation(this.IMAGES_DEATH);
                this.speed = 0;
                if (this.y < 500) this.y += 6;
                else clearInterval(intervalId);
            } else {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALK);
            }

            if (this.x + this.width <= 0) {
                clearInterval(intervalId);
            }
        }, 1000 / 15);
    }
}


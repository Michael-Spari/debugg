/**
 * Represents the main playable character in the game.
 * Extends the `MovableObjects` class and includes movement, animations, and interactions.
 */
class Character extends MovableObjects {

    /** The height of the character. */
    height = 190;

    /** The width of the character. */
    width = 115;

    /** The horizontal position of the character. */
    x = 100;

    /** The vertical position of the character. */
    y = 100;

    /** The movement speed of the character. */
    speed = 2.3;

    /**
     * Collision offset for the character.
     * @type {Object}
     */
    offset = {
        x: 26,
        y: -5,
        width: 60,
        height: 20,
    };

    /** Images used for the walking animation. */
    IMAGES_WALK = [
        'img/debugger/2_character_michael/walk/w-21.png',
        'img/debugger/2_character_michael/walk/w-22.png',
        'img/debugger/2_character_michael/walk/w-23.png',
        'img/debugger/2_character_michael/walk/w-24.png',
        'img/debugger/2_character_michael/walk/w-25.png',
        'img/debugger/2_character_michael/walk/w-26.png',
        'img/debugger/2_character_michael/walk/w-27.png',
        'img/debugger/2_character_michael/walk/w-28.png',
        'img/debugger/2_character_michael/walk/w-29.png',
        'img/debugger/2_character_michael/walk/w-30.png',
        'img/debugger/2_character_michael/walk/w-31.png',
        'img/debugger/2_character_michael/walk/w-32.png',
        'img/debugger/2_character_michael/walk/w-33.png',
        'img/debugger/2_character_michael/walk/w-34.png',
        'img/debugger/2_character_michael/walk/w-35.png',
        'img/debugger/2_character_michael/walk/w-36.png',
        'img/debugger/2_character_michael/walk/w-37.png',
    ];

    /** Images used for the jumping animation. */
    IMAGES_JUMPING = [
        'img/debugger/2_character_michael/jump/jump_10.png',
    ];

    /** Images used for the death animation. */
    IMAGES_DEATH = [
        'img/debugger/2_character_michael/death/death_1.png',
    ];

    /** Images used for the hurt animation. */
    IMAGES_HURT = [
        'img/debugger/2_character_michael/hurt/hurt_10.png',
    ];

    /** Images used when the character is idle on the ground. */
    IMAGES_GROUND = [
        'img/debugger/2_character_michael/walk/w-21.png',
    ];

    /** Images used when the character is idle on the ground. */
    IMAGES_IDLE = [
        'img/debugger/2_character_michael/hocke/hocke_20.png',
    ];

    /** Reference to the game world, providing access to global game state. */
    world;

    /** Audio for the walking sound effect. */
    WALKING_SOUND;

    /** Flag to enable or disable sound. */
    soundEnabled = true;

    /**
     * Creates a new playable character.
     * Loads images, applies gravity, and initializes animations.
     */
    constructor() {
        super().loadImage('img/debugger/2_character_michael/walk/w-21.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.WALKING_SOUND = this.createAndRegisterAudio('./audio/walk.mp4');
        this.checkIdle();
        this.applyGravity();
        this.animate();
    }

    /**
     * Creates an audio element and registers it for global management.
     * @param {string} src - The source of the audio file.
     * @returns {HTMLAudioElement} The registered audio element.
     */
    createAndRegisterAudio(src) {
        const audio = new Audio(src);
        registerSound(audio); // Add audio to the global array
        audio.muted = !soundsEnabled; // Ensure the initial state respects soundsEnabled
        return audio;
    }

    /**
     * Reduces the character's energy when hit.
     * Prevents further damage if the character is already in a hurt state.
     */
    hit() {
        if (!this.isHurt()) {
            this.energy -= 5;
            if (this.energy < 0) {
                this.energy = 0;
            }
            this.lastHit = new Date().getTime();
        }
    }  

    /**
     * Animates the character by checking for key inputs and updating its state.
     * Handles movement, jumping, and switching between animations based on conditions.
     */
    animate() {
        // Bewegung und Interaktion
        setInterval(() => {
            if (!this.isDeath()) {
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                    this.isIdle = false; // Charakter ist nicht idle
                    if (soundsEnabled) {
                        this.WALKING_SOUND.play();
                    }
                }    
                if (this.world.keyboard.LEFT && this.x > 0) {
                    this.moveLeft();
                    this.otherDirection = true;
                    this.isIdle = false; // Charakter ist nicht idle
                    if (soundsEnabled) {
                        this.WALKING_SOUND.play();
                    }
                }   
                if (this.world.keyboard.SPACE && !this.ifAboveGround()) {
                    this.jump();
                    this.isIdle = false; // Charakter ist nicht idle
                }
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60);
    
        // Animationslogik
        setInterval(() => {
            if (this.isDeath()) {
                this.playAnimation(this.IMAGES_DEATH);
                this.speed = 0;
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.ifAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALK);
            } else if (this.isIdle) {
                this.playAnimation(this.IMAGES_IDLE);
            } else {
                this.playAnimation(this.IMAGES_GROUND);
            }
        }, 1000 / 20);
    }
    
     /* Checks if the character is idle for more than 10 seconds.
     * If idle, it triggers the idle animation.
     */
     checkIdle() {
        let lastMoveTime = new Date().getTime();
    
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE) {
                lastMoveTime = new Date().getTime();
                this.isIdle = false; // Charakter bewegt sich
            }
    
            const currentTime = new Date().getTime();
            if (currentTime - lastMoveTime > 10000) { // 10 Sekunden idle
                this.isIdle = true; // Idle-Zustand aktivieren
            }
        }, 1000 / 60);
    }
}


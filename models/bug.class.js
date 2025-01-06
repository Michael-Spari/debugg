/**
 * Represents a Bug enemy in the game.
 * Extends the `MovableObjects` class and includes animations, movement, and interaction logic.
 */
class Bug extends MovableObjects {
  
    /** The vertical position of the bug. */
    y = 305;
  
    /** The horizontal position of the bug. */
    x = 100;
  
    /** The height of the bug. */
    height = 125;
  
    /** The width of the bug. */
    width = 125;
  
    /** The movement speed of the bug. */
    speed = 3;
  
    /** The energy level of the bug. */
    energy = 1;
  
    /** Audio for the death sound effect. */
    death_sound = new Audio('./audio/splash.mp3');
  
    /**
     * Collision offset for the bug.
     * @type {Object}
     */
    offset = {
      x: 30,
      y: 60,
      width: 60,
      height: 80,
    };
  
    /** Images used for the walking animation. */
    IMAGES_WALK = [
      'img/debugger/3_enemies_bug/bug_w_21.png',
      'img/debugger/3_enemies_bug/bug_w_22.png',
    ];
  
    /** Images used for the death animation. */
    IMAGES_DEATH = [
      'img/debugger/3_enemies_bug/bug_w_30_death.png',
    ];
  
    /** Audio for the walking sound effect. */
    walking_sound = new Audio('./audio/bugs_run1.mp3');
  
    /** Tracks whether the death sound has already been played. */
    death_sound_played = false;
  
    /**
     * Creates a new Bug enemy.
     * The bug's position and speed are randomized for variability.
     */
    constructor() {
      super().loadImage('img/debugger/3_enemies_bug/bug_w_21.png');
      this.loadImages(this.IMAGES_WALK);
      this.loadImages(this.IMAGES_DEATH);
      this.x = 200 + Math.random() * 7200; // Random horizontal position.
      this.speed = 2.2 + Math.random() * 8; // Random speed.
      this.animate();
    }
  
    /**
     * Reduces the bug's energy when hit.
     */
    hit() {
      this.energy -= 100;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  
    /**
     * Moves the bug to the left if it is alive.
     */
    moveLeft() {
      if (!this.isDeath()) {
        this.x -= this.speed;
      }
    }
  
    /**
     * Animates the bug, switching between walking and death animations.
     * Handles movement and plays corresponding sounds.
     */
    animate() {
      setInterval(() => {
        if (this.isDeath()) {
          // Play death animation and sound.
          if (!this.death_sound_played) {
            this.death_sound.play();
            this.death_sound_played = true;
          }
          this.playAnimation(this.IMAGES_DEATH);
          this.speed = 0;
          if (this.y < 500) this.y += 4; // Simulate falling.
        } else {
          // Handle walking animation.
          this.moveLeft();
          this.playAnimation(this.IMAGES_WALK);
        }
      }, 1000 / 15); // Animation frame rate.
    }
  }
  

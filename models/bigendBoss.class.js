/**
 * Represents the Big End Boss enemy in the game.
 * Extends the `MovableObjects` class to include movement, animations, and interactions.
 */
class BigEndboss extends MovableObjects {
  
  /** The vertical position of the boss. */
  y = 35;

  /** The height of the boss. */
  height = 400;

  /** The width of the boss. */
  width = 400;

  /** The energy level of the boss. */
  energy = 100;

  /** The movement speed of the boss. */
  speed = 3;

  /**
   * Collision offset for the boss.
   * @type {Object}
   */
  offset = {
    x: 30,
    y: 60,
    width: 260,
    height: 260,
  };

  /** Images used for the walking animation. */
  IMAGES_WALK = [
    'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
    'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
    'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png',
    'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
    'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
    'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_4.png',
    'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_1.png',
    'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png',
    'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
    'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
    'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_1.png',
    'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_4.png',
    'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png',
    'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
    'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
    'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_2.png',
    'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_1.png',
    'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png',
    'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_4.png',
    'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
    'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png',
  ];

  /** Images used for the attacking animation. */
  IMAGES_ATACK = [
    'img/debugger/4_enemies_boss_bug/attack/bossbug_attack.png',
    'img/debugger/4_enemies_boss_bug/attack/bossbug_attack.png',
    'img/debugger/4_enemies_boss_bug/attack/bossbug_attack.png',
    'img/debugger/4_enemies_boss_bug/attack/bossbug_attack.png',
    'img/debugger/4_enemies_boss_bug/attack/bossbug_attack.png',
    'img/debugger/4_enemies_boss_bug/attack/bossbug_attack.png',
    'img/debugger/4_enemies_boss_bug/attack/bossbug_attack.png',
    'img/debugger/4_enemies_boss_bug/attack/bossbug_attack.png',
  ];

  /** Images used for the death animation. */
  IMAGES_DEATH = [
    'img/debugger/4_enemies_boss_bug/dead/bossbugTot_1.png',
  ];

  /**
   * Creates a new Big End Boss.
   * @param {Object} character - The player's character, used for interactions.
   */
  constructor(character) {
    super().loadImage(this.IMAGES_WALK[0]);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_DEATH);
    this.loadImages(this.IMAGES_ATACK);
    this.x = 3750;
    this.Character = character;
    this.isAttacking = false;
    this.originalWidth = this.width;
    this.walkDirection = 'left';
    this.maxWalkDistance = 100;
    this.startingX = this.x;
    this.animate();
  }

  /**
   * Reduces the boss's energy when hit.
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
   * Moves the boss to the left if it is alive and not attacking.
   */
  moveLeft() {
    if (!this.isDeath() && !this.isAttacking) {
      this.x -= this.speed;
    }
  }

  /**
   * Moves the boss to the right if it is alive and not attacking.
   */
  moveRight() {
    if (!this.isDeath() && !this.isAttacking) {
      this.x += this.speed;
    }
  }

  /**
   * Animates the boss, handling walking, attacking, and death states.
   */
  animate() {
    setInterval(() => {
      if (this.isDeath()) {
        this.playAnimation(this.IMAGES_DEATH);
        this.speed = 0;
        if (this.y < 500) this.y += 8; // Simulates falling.
        this.character = null; // Prevent further interactions after death
        this
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
   * Handles the boss's walking logic, switching directions when necessary.
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
   * Initiates the attack animation and temporarily increases the boss's width.
   */
  startAttackAnimation() {
    if (!this.isAttacking) {
      this.isAttacking = true;
      const widthIncrease = 200;
      this.x -= widthIncrease / 0.8; // Adjust position for increased width.
      this.width += widthIncrease;

      this.playAnimation(this.IMAGES_ATACK);

      setTimeout(() => {
        this.width = this.originalWidth;
        this.x += widthIncrease / 0.8; // Restore original position.
        this.isAttacking = false;
      }, 500); // Attack animation duration.
    }
  }
}


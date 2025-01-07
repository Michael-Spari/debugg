/**
 * The World class represents the game world where entities like characters, enemies, and objects exist.
 * It contains the main logic for the game, including collisions, interactions, and displaying status bars.
 */
class World {
    character = new Character();
    enemy = new Bug();
    cloud = new Cloud();
    coin = new Coin();
    spray = new Spray();
    bigEndboss = new BigEndboss(this.character);
    deathFly = new DeathFly(this.character);
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    gameOver = new GameOver();
    finish;
    statusBar = new StatusBar();
    statusBarEnemy = new StatusBarEnemy();
    statusBarDeathFly = new StatusBarDeathFly();
    plattform = new Plattform();
    comando = new Comando();
    coinsCounter = CoinsCounter.getInstance();
    sprayCounter = SprayCounter.getInstance();
    throwableObjects = [];
    lastThrowTime = 0;
    throwCooldown = 800;
    soundEnabled = true;
    SPRAY_SOUND = new Audio('./audio/spray.mp4');
    BIGBUGISHIT_SOUND = new Audio('./audio/bigbughit.mp3');
    DEATHFLY_SOUND = new Audio('./audio/death_fly.mp3');

    /**
     * Constructor for the World class.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is drawn.
     * @param {Object} keyboard - The keyboard object that tracks key inputs.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.finish = new Finish();
        this.coinsCounter = CoinsCounter.getInstance();
        this.sprayCounter = SprayCounter.getInstance();
        this.buttonVisibility = this.gameOver.buttonVisibility.bind(this.gameOver);
        this.startTypewriterEffect = this.finish.startTypewriterEffect.bind(this.finish);
        this.SPRAY_SOUND = this.createAndRegisterAudio('./audio/spray.mp4');
        this.BIGBUGISHIT_SOUND = this.createAndRegisterAudio('./audio/bigbughit.mp3');
        this.DEATHFLY_SOUND = this.createAndRegisterAudio('./audio/death_fly.mp3');
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world for the character to this instance.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the game logic in an interval.
     */
    run() {
        this.runInterval = setInterval(() => {
            this.checkCollisionBugs();
            this.checkCollisionBigEndBoss();
            this.checkCollisionDeathFly();
            this.checkCollisionsPlattform();
            this.checkThrowObjects();
            this.checkSpraySmashBug();
            this.checkSpraySmashEndBoss();
            this.checkSpraySmashDeathFly();
            this.checkBugisDeathandInsertCoin();
            this.characterCollectCoin();
            this.showStatusBarEnemy();
            this.showStatusBarDeathFly();
            this.showGameOver();
            this.showFinish();
        }, 1000 / 10);
    }

    /**
     * Clears all running intervals to stop the game.
     */
    clearIntervals() {
        clearInterval(this.runInterval);
    }

    /**
     * Creates an audio element and registers it for global management.
     * @param {string} src - The source of the audio file.
     * @returns {HTMLAudioElement} The registered audio element.
     */
    createAndRegisterAudio(src) {
        const audio = new Audio(src);
        registerSound(audio); // Add audio to the global array
        audio.muted = !this.soundEnabled; // Ensure the initial state respects soundEnabled
        return audio;
    }

    /**
     * Displays the game over screen if the character's energy is zero or less.
     */
    showGameOver() {
        if (this.statusBar.percentage <= 0) {
            this.gameOver.x = 80;
            this.gameOver.y = 80;
            this.buttonVisibility();
        }
    }

    /**
     * Displays the finish screen if the character reaches the goal.
     */
    showFinish() {
        if (this.comando.isColliding(this.character)) {
            this.startTypewriterEffect();
            this.buttonVisibility();
            this.character.speed = 0;
            this.finish.x = 60;
            this.finish.y = 60;
        }
    }

    /**
     * Displays the enemy's status bar when the character reaches a certain position.
     */
    showStatusBarEnemy() {
        if (this.character.x >= 3100) {
            this.statusBarEnemy.x = 555;
        }
        if (this.character.x <= 3100 || this.bigEndboss.energy <= 0) {
            this.statusBarEnemy.x = -555;
        }
    }

    /**
     * Displays the DeathFly's status bar when the character reaches a certain position.
     */
    showStatusBarDeathFly() {
        if (this.character.x >= 5100) {
            this.statusBarDeathFly.x = 555;
        }
        if (this.character.x <= 5100 || this.deathFly.energy <= 0) {
            this.statusBarDeathFly.x = -555;
        }
    }

    /**
     * The character collects coins if it collides with them.
     */
    characterCollectCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinsCounter.increment();
            }
        });
    }

    /**
     * Checks if the character has thrown objects and whether it has enough spray to throw it.
     */
    checkThrowObjects() {
        const currentTime = Date.now();
        if (this.keyboard.D && currentTime - this.lastThrowTime >= this.throwCooldown) {
            if (this.soundEnabled) this.SPRAY_SOUND.play();
            if (this.sprayCounter.getCount() > 0) {
                const direction = this.character.otherDirection ? 'left' : 'right';
                let spray = new Spray(this.character.x + 25, this.character.y + 80, direction);
                this.throwableObjects.push(spray);
                this.lastThrowTime = currentTime;
                this.sprayCounter.decrement();
            }
        }
    }

    /**
     * Checks if a defeated bug leaves a coin and adds it.
     */
    checkBugisDeathandInsertCoin() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDeath() && !enemy.coinCreated) {
                let coin = new Coin();
                coin.x = enemy.x;
                coin.y = enemy.y;
                this.level.coins.push(coin);
                enemy.coinCreated = true;
            }
        });
    }

    /**
     * Checks if the character collides with a bug and, if so, damages it.
     */
    checkCollisionBugs() {
        for (let enemy of this.level.enemies) {
            if (enemy.energy > 0 && this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                break;
            }
        }
    }

    /**
     * Checks if the character collides with the BigEndboss and, if so, damages it.
     */
    checkCollisionBigEndBoss() {
        if (this.bigEndboss.energy > 0 && this.character.isColliding(this.bigEndboss)) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    /**
     * Checks if the character collides with the DeathFly and, if so, damages it.
     */
    checkCollisionDeathFly() {
        if (this.deathFly.energy > 0 && this.character.isColliding(this.deathFly)) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    /**
     * Checks if the spray collides with a bug and damages it.
     */
    checkSpraySmashBug() {
        this.throwableObjects.forEach((spray) => {
            this.level.enemies.forEach((enemy) => {
                if (!spray.collided && enemy.energy > 0 && spray.isColliding(enemy)) {
                    spray.collided = true;
                    enemy.hit();
                    enemy.energy -= 10;
                    spray.startFalling();
                }
            });
        });
    }

    /**
     * Checks if the spray collides with the BigEndboss and damages it.
     */
    checkSpraySmashEndBoss() {
        this.throwableObjects.forEach((spray) => {
            if (spray.isColliding(this.bigEndboss)) {
                this.bigEndboss.hit();
                this.statusBarEnemy.setPercentage(this.bigEndboss.energy);
                spray.startFalling();
                if (this.soundEnabled) this.BIGBUGISHIT_SOUND.play();
                if (this.bigEndboss.energy <= 0) {
                    this.level.enemies = this.level.enemies.filter(enemy => enemy !== this.bigEndboss);
                }
            }
        });
    }

    /**
     * Checks if the spray collides with the DeathFly and damages it.
     */
    checkSpraySmashDeathFly() {
        this.throwableObjects.forEach((spray) => {
            if (this.deathFly.energy > 0 && spray.isColliding(this.deathFly)) {
                this.deathFly.hit();
                this.statusBarDeathFly.setPercentage(this.deathFly.energy);
                spray.startFalling();
                if (this.soundEnabled) this.DEATHFLY_SOUND.play();
                if (this.deathFly.energy <= 0) {
                    this.level.enemies = this.level.enemies.filter(enemy => enemy !== this.deathFly);
                }
            }
        });
    }

    /**
     * Checks if the character collides with the platform.
     */
    checkCollisionsPlattform() {
        if (this.character.isColliding(this.plattform)) {
            this.handlePlattformCollision();
        }
    }

    /**
     * Handles the collision of the character with the platform.
     */
    handlePlattformCollision() {
        if (!this.plattform.collided) {
            this.plattform.collided = true;
            this.plattform.img.src = 'img/debugger/plattforms/plattform-1.png';
            this.sprayCounter.incrementBy(50);
        }
    }

    /**
     * Draws all objects on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarEnemy);
        this.addToMap(this.statusBarDeathFly);
        this.addToMap(this.coinsCounter);
        this.addToMap(this.sprayCounter);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.comando);
        this.addToMap(this.character);
        this.addToMap(this.bigEndboss);
        this.addToMap(this.deathFly);
        this.addToMap(this.plattform);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.sprays);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.gameOver);
        this.addToMap(this.finish);
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
     * Adds a list of objects to the map.
     * @param {Array} objects - A list of objects to be drawn on the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the map.
     * @param {Object} mo - The object to be drawn on the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image for reversing the character's direction.
     * @param {Object} mo - The object to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image of the object after flipping.
     * @param {Object} mo - The object to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}


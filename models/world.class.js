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
    coinsCounter = CoinsCounter.getInstance(); // nutzt die Singleton-Instanz
    sprayCounter = SprayCounter.getInstance(); // nutzt die Singleton-Instanz
    throwableObjects = []; // Initialize as an empty array
    lastThrowTime = 0;
    throwCooldown = 800;
    SPRAY_SOUND = new Audio('./audio/spray.mp4');
    BIGBUGISHIT_SOUND = new Audio('./audio/bigbughit.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.finish = new Finish();
        this.coinsCounter = CoinsCounter.getInstance(); // steuert die Anzahl der Münzen
        this.sprayCounter = SprayCounter.getInstance(); // steuert die Anzahl der Strahlen
        this.buttonVisibility = this.gameOver.buttonVisibility.bind(this.gameOver); // Bind the method to the gameOver object
        this.startTypewriterEffect = this.finish.startTypewriterEffect.bind(this.finish); // Bind the method to the finish object
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

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
            this.characterCollectCoin(); // Coins einsammeln zuerst ausführen
            this.showStatusBarEnemy();
            this.showStatusBarDeathFly();
            this.showGameOver();
            this.showFinish();
        }, 1000 / 10); // 60 FPS
    }

    clearIntervals() {
        clearInterval(this.runInterval);
    }

    showGameOver() {
        if (this.character.energy <= 0) {
            this.buttonVisibility();
            this.gameOver.x = 80; // Zurück in den sichtbaren Bereich
            this.gameOver.y = 80;
        }
    }

    showFinish() {
        if (this.comando.isColliding(this.character)) {
            this.startTypewriterEffect();
            this.buttonVisibility();
            this.character.speed = 0; // Bewegung stoppen
            this.finish.x = 60; // Zurück in den sichtbaren Bereich
            this.finish.y = 60;
        }
    }

    showStatusBarEnemy() {
        if (this.character.x >= 3100) { // Wenn der Character den Endboss erreicht
            this.statusBarEnemy.x = 555; // Zurück in den sichtbaren Bereich
        }

        if (this.character.x <= 3100) {
            this.statusBarEnemy.x = -555; // Zurück in den unsichtbaren Bereich
        }

        if (this.bigEndboss.energy <= 0) {
            this.statusBarEnemy.x = -555; // Zurück in den unsichtbaren Bereich
        }
    }

    showStatusBarDeathFly() {
        if (this.character.x >= 5100) { // Wenn der Character DeathFly erreicht
            this.statusBarDeathFly.x = 555; // Zurück in den sichtbaren Bereich
        }

        if (this.character.x <= 5100) { // Wenn der Character DeathFly verlässt
            this.statusBarDeathFly.x = -555; // Zurück in den unsichtbaren Bereich
        }

        if (this.deathFly.energy <= 0) { // Wenn DeathFly tot ist
            this.statusBarDeathFly.x = -555; // Zurück in den unsichtbaren Bereich
        }
    }

    characterCollectCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1); // Münze entfernen
                this.coinsCounter.increment(); // Counter erhöhen
                console.log('Coin collected, total:', this.coinsCounter.coinCount); // Log the coin count
            }
        });
    }

    checkThrowObjects() {
        const currentTime = Date.now();
        if (this.keyboard.D && currentTime - this.lastThrowTime >= this.throwCooldown) {
            this.SPRAY_SOUND.play(); // Sound abspielen
            if (this.sprayCounter.getCount() > 0) {
                const direction = this.character.otherDirection ? 'left' : 'right'; // Bestimme die Richtung
                let spray = new Spray(this.character.x + 25, this.character.y + 80, direction);
                this.throwableObjects.push(spray); // Neues Spray dem Array hinzufügen
                this.lastThrowTime = currentTime;
                this.sprayCounter.decrement();
            }
        }
    }

    checkBugisDeathandInsertCoin() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDeath() && !enemy.coinCreated) {
                let coin = new Coin();
                coin.x = enemy.x;
                coin.y = enemy.y;
                this.level.coins.push(coin);
                enemy.coinCreated = true;
                console.log('Coin created', this.level.coins, coin.x, coin.y);
            }
        });
    }

    checkCollisionBugs() {
        this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
            console.log('Character hit enemy! Remaining energy:', this.character.energy);
        }
        });
    }

    checkCollisionBigEndBoss() {
        if (this.character.isColliding(this.bigEndboss) && !this.character.isHurt) {
            this.character.hit();
            this.character.isHurt = true; // Set isHurt to true to prevent multiple hits
            this.statusBar.setPercentage(this.character.energy);
            console.log('Character hit BigEndboss! Remaining energy:', this.character.energy);
            
            // Reset isHurt after a short delay to allow future collisions
            setTimeout(() => {
                this.character.isHurt = false;
            }, 1000); // Adjust the delay as needed
        }
    }
    
    checkCollisionDeathFly() { // Prüfe Kollision mit DeathFly
        if (this.character.isColliding(this.deathFly) && !this.character.isHurt) {
            this.character.hit();
            this.character.isHurt = true; // Set isHurt to true to prevent multiple hits
            this.statusBar.setPercentage(this.character.energy);
            console.log('Character hit DeathFly! Remaining energy:', this.character.energy);
            
            // Reset isHurt after a short delay to allow future collisions
            setTimeout(() => {
                this.character.isHurt = false;
            }, 1000); // Adjust the delay as needed
        }
    }

    checkSpraySmashBug() {
        // Prüfe Kollision mit Sprays für normale Feinde
        this.throwableObjects.forEach((spray) => {
            this.level.enemies.forEach((enemy) => {
                if (spray.isColliding(enemy)) {
                    enemy.hit();
                    enemy.energy -= 10;
                    spray.startFalling();
                    console.log('Collision with Hammer', enemy.energy);
                }
            });
        });
    }

    checkSpraySmashEndBoss() {
        this.throwableObjects.forEach((spray) => {
            if (spray.isColliding(this.bigEndboss)) {
                this.bigEndboss.hit();
                this.statusBarEnemy.setPercentage(this.bigEndboss.energy);
                spray.startFalling();
                console.log('BigEndboss hit! Remaining energy:', this.bigEndboss.energy);
                
                // Play the sound when BigEndboss is hit
                this.BIGBUGISHIT_SOUND.play();
            }
        });
    }

    checkSpraySmashDeathFly() {
        this.throwableObjects.forEach((spray) => {
            // Prüfe Kollision mit DeathFly
            if (spray.isColliding(this.deathFly)) {
                this.deathFly.hit();
                this.statusBarDeathFly.setPercentage(this.deathFly.energy);
                spray.startFalling();
                console.log('DeathFly hit! Remaining energy:', this.deathFly.energy);
            }
        });
    }
    
    checkCollisionsPlattform() {
        if (this.character.isColliding(this.plattform)) {
            this.handlePlattformCollision();
        }
    }

    handlePlattformCollision() {
        if (!this.plattform.collided) {
            this.plattform.collided = true; // Plattform als "benutzt" markieren
            this.plattform.img.src = 'img/debugger/plattforms/plattform-1.png'; // Bild ändern
            this.sprayCounter.incrementBy(50); // Anzahl der Sprays um 50 erhöhen
            console.log('Plattform betreten! Sprays erhöht:', this.sprayCounter.getCount());
        }
    }

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

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
        // mo.drawFrame(this.ctx); // Rahmen um Objekt zeichnen
        // mo.drawOffsetFrame(this.ctx) // Offset-Rahmen um Objekt zeichnen
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }       
}
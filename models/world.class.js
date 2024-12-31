class World {
    character = new Character();
    enemy = new Bug();
    cloud = new Cloud();
    coin = new Coin();
    bigEndboss = new BigEndboss(this.character);
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    gameOver = new GameOver();
    finish;
    statusBar = new StatusBar();
    statusBarEnemy = new StatusBarEnemy();
    plattform = new Plattform();
    coinsCounter = CoinsCounter.getInstance(); // nutzt die Singleton-Instanz
    sprayCounter = SprayCounter.getInstance(); // nutzt die Singleton-Instanz
    throwableObjects = this.level.sprays;; // Initialize as an empty array
    lastThrowTime = 0;
    throwCooldown = 800;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.finish = new Finish();
        this.coinsCounter = CoinsCounter.getInstance(); // steuert die Anzahl der Münzen
        this.sprayCounter = SprayCounter.getInstance(); // steuert die Anzahl der Strahlen
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {           
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkHammerSmashBug();
            this.checkBugisDeathandInsertCoin();
            this.characterCollectCoin(); // Coins einsammeln zuerst ausführen
            this.showStatusBarEnemy();
            this.showGameOver();
            this.showFinish();
        }, 1000 / 10); // 60 FPS
    }

    showGameOver() {
        if (this.character.energy <= 0) { 
        this.gameOver.x = 150; // Zurück in den sichtbaren Bereich
        this.gameOver.y = 100;
        }
    }

    showFinish() {
        if (this.bigEndboss.energy <= 0) {
            this.finish.x = 150; // Zurück in den sichtbaren Bereich
            this.finish.y = 100;
        }
    }

    showStatusBarEnemy() {
        if (this.character.x >= 3100) {
            this.statusBarEnemy.x = 555; // Zurück in den sichtbaren Bereich
        }

        if (this.character.x <= 3100) {
            this.statusBarEnemy.x = -555; // Zurück in den unsichtbaren Bereich
        }

        if (this.bigEndboss.energy <= 0) {
            this.statusBarEnemy.x = -555; // Zurück in den unsichtbaren Bereich   
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
            if (this.sprayCounter.getCount() > 0) { // Prüfen, ob noch Sprays verfügbar sind
                let spray;
    
                // Prüfen, ob der Charakter nach links oder rechts schaut
                if (this.character.throwLeft) {
                    spray = new Spray(this.character.x - 100, this.character.y + 100, 'left'); // Nach links werfen
                } else {
                    spray = new Spray(this.character.x + 100, this.character.y + 100, 'right'); // Nach rechts werfen
                }
    
                this.throwableObjects.push(spray); // Neues Spray dem Array hinzufügen
                this.lastThrowTime = currentTime;
    
                // Zähler um eins reduzieren
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

    checkCollisions() {
        // Prüfe Kollision mit Gegnern
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    
        // Prüfe Kollision mit dem BigEndboss
            if (this.character.isColliding(this.bigEndboss)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        }

    checkHammerSmashBug() {
        this.throwableObjects.forEach((spray) => {
            this.level.enemies.forEach((enemy) => {
                if (spray.isColliding(enemy)) {
                    enemy.energy -= 100;
                    enemy.hit();
                    spray.startFalling();
                    console.log('Collision with Hammer', enemy.energy);
                }
            });
    
            // Prüfe Kollision mit dem BigEndboss
            if (spray.isColliding(this.bigEndboss)) {
                this.bigEndboss.energy -= 100;
                this.bigEndboss.hit();
                this.statusBarEnemy.setPercentage(this.bigEndboss.energy);
                console.log('BigEndboss hit! Remaining energy:', this.bigEndboss.energy);
    
                // Prüfe, ob der Endboss stirbt
                if (this.bigEndboss.energy <= 0) {
                    this.bigEndboss.speed = 0; // Bewegung stoppen
                    this.bigEndboss.isDeath = true; // Markiere ihn als tot
                }
                spray.startFalling();
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarEnemy);
        this.addToMap(this.coinsCounter); 
        this.addToMap(this.sprayCounter);

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addToMap(this.bigEndboss);
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
        mo.drawFrame(this.ctx); // Rahmen um Objekt zeichnen
        mo.drawOffsetFrame(this.ctx) // Offset-Rahmen um Objekt zeichnen
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

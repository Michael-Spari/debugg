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
    statusBar = new StatusBar();
    plattform = new Plattform();
    coinsCounter = new CoinsCounter();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        const gameLoop = () => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkHammerSmashBug();
            this.checkAllEnemiesDead();
            this.checkBugisDeathandInsertCoin();
            this.characterCollectCoin(); // Coins einsammeln
            setTimeout(() => {
                requestAnimationFrame(gameLoop);
            }, 100); // Verzögerung von 100ms hinzufügen, um das Spiel langsamer laufen zu lassen
        };
        gameLoop();
    }

    characterCollectCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1); // Münze entfernen
                this.coinsCounter.increment(); // Counter erhöhen
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let hammer = new ThrowableObjects(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(hammer);
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
        // Prüfe Kollision mit Plattformen
        // if (this.plattform.isColliding(this.character)) {
        //     this.character.y = this.plattform.y - this.character.height; // Auf die Plattform setzen
        //     this.character.speedY = 0; // Fallgeschwindigkeit stoppen
        // }
    
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
        this.throwableObjects.forEach((hammer) => {
            this.level.enemies.forEach((enemy) => {
                if (hammer.isColliding(enemy)) {
                    enemy.energy -= 100;
                    enemy.hit();
                    hammer.startFalling();
                    console.log('Collision with Hammer', enemy.energy);
                }
            });
    
            // Prüfe Kollision mit dem BigEndboss
            if (hammer.isColliding(this.bigEndboss)) {
                this.bigEndboss.energy -= 100;
                console.log('BigEndboss hit! Remaining energy:', this.bigEndboss.energy);
    
                // Prüfe, ob der Endboss stirbt
                if (this.bigEndboss.energy <= 0) {
                    this.bigEndboss.speed = 0; // Bewegung stoppen
                    this.bigEndboss.isDeath = true; // Markiere ihn als tot
                }
    
                hammer.startFalling();
            }
        });
    }

    checkAllEnemiesDead() {
        this.level.enemies.forEach(enemy => enemy.animate());
        this.bigEndboss.animate();
        // setTimeout(() => {
        //     if (this.level.enemies.every(enemy => enemy.isDeath()) && this.bigEndboss.isDeath) {
        //         console.log('Game over');
        //         this.ctx.font = '48px serif';
        //         this.ctx.fillText('Game over', 100, 100);
        //     }
        // }, 1000);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusBar);
        this.addToMap(this.coinsCounter);
        

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addToMap(this.bigEndboss);
        this.addToMap(this.plattform);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
        
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

class World {
    character = new Character();
    enemy = new Bug();
    cloud = new Cloud();
    coin = new Coin();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
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
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkHammerSmashBug();
            this.checkAllEnemiesDead();
        }, 200);
    }
    
    checkThrowObjects() {
        if (this.keyboard.D) {
            let hammer = new ThrowableObjects(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(hammer);
        }
    }

    checkCollisions() {    
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }  

    checkHammerSmashBug() {
        this.throwableObjects.forEach((hammer) => {
            this.level.enemies.forEach((enemy) => {
                if (hammer.isColliding(enemy)) {
                    enemy.energy -= 100; // Energie von "enemy" in der Schleife abziehen
                    enemy.hit(); // makiert den getroffenen Bug
                    hammer.startFalling(); // Hammer fällt nach Treffer
                    console.log('collision with Hammer', enemy.energy);
                }
            });
        });
    }

    checkAllEnemiesDead() {
        // Startet die setInterval-Methode, ob alle Bugs tot sind
        this.level.enemies.forEach(enemy => enemy.animate());
    }  

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);

        // feste Objekte wie Statusbar
        this.addToMap(this.statusBar);

        this.ctx.translate(this.camera_x, 0);

        // bewegliche Objekte wie Character, Bugs, throwableObjects
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);
        
        // Draw wird immer wieder aufgerufen
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
        // mo.drawFrame(this.ctx);
        // mo.drawOffsetFrame(this.ctx)

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
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
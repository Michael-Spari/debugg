class DeathFly extends MovableObjects {
    y = 35;
    height = 400;
    width = 400;
    energy = 100;
    speed = 3; // Geschwindigkeit des Bosses

    offset = {
        x: 30,
        y: 100,
        width: 260,
        height: 260,
    }

    IMAGES_WALK = [
        'img/debugger/8_death_fly/walking/death_fly_1.png', //laufen
        'img/debugger/8_death_fly/walking/death_fly_2.png', //laufen
    ];
    IMAGES_ATACK = [
        'img/debugger/8_death_fly/walking/death_fly_1.png', //angriff
    ];
    IMAGES_DEATH = [
        'img/debugger/8_death_fly/walking/death_fly_1.png', //tod
    ];

    constructor(character) {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_ATACK);
        this.x = 5750;
        this.Character = character;
        this.isAttacking = false;
        this.originalWidth = this.width;
        this.walkDirection = 'left'; // Richtung des Walk-Modus (links/rechts)
        this.maxWalkDistance = 100; // Maximale Distanz, die der Boss vor/zurück geht
        this.startingX = this.x; // Ursprüngliche X-Position speichern
        this.animate();
    }

    hit() {
        this.energy -= 10; // Bug verliert 10 Energie
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        console.log('Bug energy:', this.energy);
    }

    moveLeft() {
        if (!this.isDeath() && !this.isAttacking) {
            this.x -= this.speed;
        }
    }

    moveRight() {
        if (!this.isDeath() && !this.isAttacking) {
            this.x += this.speed;
        }
    }

    animate() {
        // Bewegung und Animation
        setInterval(() => {
            if (this.energy <= 0) {
                this.playAnimation(this.IMAGES_DEATH);
                this.speed = 0; // Bewegung stoppen
                if (this.y < 500) this.y += 8; // Boss fällt zu Boden
            } else if (!this.isAttacking) {
                this.handleWalkMode();
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 1000 / 25);

        // Angriff prüfen
        setInterval(() => {
            if (this.Character) {
                const distance = Math.abs(this.Character.x - this.x);
                if (distance <= 300 && this.energy > 0) {
                    // this.showStatusBarEnemy();
                    this.startAttackAnimation();
                }
            }
        }, 1000 / 25);
    }

    handleWalkMode() {
        // Überprüfen, ob der Boss sich in die ursprüngliche Distanz bewegt hat
        if (this.walkDirection === 'left' && this.x > this.startingX - this.maxWalkDistance) {
            this.moveLeft();
        } else if (this.walkDirection === 'left') {
            this.walkDirection = 'right'; // Richtung wechseln
        }

        if (this.walkDirection === 'right' && this.x < this.startingX + this.maxWalkDistance) {
            this.moveRight();
        } else if (this.walkDirection === 'right') {
            this.walkDirection = 'left'; // Richtung wechseln
        }
    }

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

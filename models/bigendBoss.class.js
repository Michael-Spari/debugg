class BigEndboss extends MovableObjects {
    y = 35;
    height = 400;
    width = 400;
    energy = 500;
    speed = 3; // Geschwindigkeit des Bosses

    offset = {
        x: 30,
        y: 60,
        width: 260,
        height: 260,
    }

    IMAGES_WALK = [
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png', //hoerner zeigen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_4.png', //zähne zeigen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_1.png', //augen guen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png', //hoerner zeigen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_1.png', //augen guen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_4.png', //zähne zeigen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png', //hoerner zeigen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_2.png', //augen rot
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_1.png', //augen guen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png', //hoerner zeigen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_4.png', //zähne zeigen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
    ];
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
    IMAGES_DEATH = [
        'img/debugger/4_enemies_boss_bug/dead/bossbugTot_1.png',
    ];

    constructor(character) {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_ATACK);
        this.x = 3750;
        this.Character = character;
        this.isAttacking = false;
        this.originalWidth = this.width;
        this.walkDirection = 'left'; // Richtung des Walk-Modus (links/rechts)
        this.maxWalkDistance = 100; // Maximale Distanz, die der Boss vor/zurück geht
        this.startingX = this.x; // Ursprüngliche X-Position speichern
        this.animate();
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

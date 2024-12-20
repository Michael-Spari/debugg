class BigEndboss extends MovableObjects {
    y = 35;
    height = 400;
    width = 400;
    energy = 500;

    offset = {
        x: 30,
        y: 60,
        width: 60,
        height: 60,
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

    constructor () {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_ATACK);
        this.x = 3750;
        this.speed = 0 + Math.random() * 0;
        // this.speed = 0.1;
        this.animate();
    }

    moveLeft() {
        if (!this.isDeath()) { // Prüfe Eltern-Methode
            this.x -= this.speed;
            // this.y = 0;
        }
    }

    animate() {
        setInterval(() => {
            if (this.isDeath()) {
                this.playAnimation(this.IMAGES_DEATH);
                this.speed = 0; // Bewegung stoppen
                if (this.y < 500) this.y += 0.1; // Gegner fällt zu Boden
            } else {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 1000 / 10);
    }

    // animate() {
    //     setInterval(() => {
    //         this.playAnimation(this.IMAGES_WALK);
    //     }, 1000 / 20);
    // }
}

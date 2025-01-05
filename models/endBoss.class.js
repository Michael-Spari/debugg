class Endboss extends MovableObjects {
    y = 230;
    height = 200;
    width = 200;
    energy = 200;
    speed = 3; // Geschwindigkeit des Bosses
    death_sound = new Audio('./audio/bugs_sprayed.mp4');

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
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_4.png', //zähne zeigen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_1.png', //augen guend
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png', //hoerner zeigen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_1.png', //augen guen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_4.png', //zähne zeigen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen 
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png', //hoerner zeigen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_2.png', //augen rot
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_1.png', //augen guen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png', //hoerner zeigen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_4.png', //zähne zeigen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        'img/debugger/4_enemies_boss_bug/walk/bossbugWalk_1.png', //laufen
        
    ];
    IMAGES_ATACK = [
        'img/debugger/4_enemies_boss_bug/attack/bossbug_attack.png'

    ];
    IMAGES_DEATH = [
        'img/debugger/4_enemies_boss_bug/dead/bossbugTot_1.png',
    ];

    constructor () {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_ATACK);
        this.x = 3200 + Math.random() * 7200;
        this.speed = 2.2 + Math.random() * 8;
        this.animate();
    }

    moveLeft() {
        if (!this.isDeath()) { // Prüfe Eltern-Methode
            this.x -= this.speed;
        }
    }

    hit() {
        this.energy -= 50; // Bug verliert 10 Energie
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        console.log('Bug energy:', this.energy);
    }

    animate() {
        const intervalId = setInterval(() => {
            if (this.isDeath()) {
                if (!this.death_sound_played) {
                    this.death_sound.play();
                    this.death_sound_played = true;
                }
                this.playAnimation(this.IMAGES_DEATH);
                this.speed = 0; // Bewegung stoppen
                if (this.y < 500) this.y += 6; // Gegner fällt zu Boden
                else clearInterval(intervalId); // Stop the interval when the bug is on the ground
            } else {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALK);
            }

            // Stop the interval if the bug is out of the canvas
            if (this.x + this.width <= 0) {
                clearInterval(intervalId);
            }
        }, 1000 / 15);
    }


    // animate() {
    //     setInterval(() => {
    //         this.playAnimation(this.IMAGES_WALK);
    //     }, 1000 / 20);
    // }
}

class Endboss extends MovableObjects {
    y = 180;
    height = 250;
    width = 250;
    IMAGES_WALK = [
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png', //hoerner zeigen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_4.png', //zähne zeigen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_1.png', //augen guen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png', //hoerner zeigen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_1.png', //augen guen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_4.png', //zähne zeigen 
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png', //hoerner zeigen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_2.png', //augen rot
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_1.png', //augen guen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_3.png', //hoerner zeigen
        'img/debugger/4_enemies_boss_bug/alert/alert_boss_bug_4.png', //zähne zeigen

    ];

    constructor () {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.x = 400;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, 1000 / 20);
    }
}

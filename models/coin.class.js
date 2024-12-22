class Coin extends MovableObjects {
    y = 305;
    x = 218.5852325759734;
    height = 50;
    width = 50;
    
    IMAGES_COINS = [
        'img/debugger/9_coins/daCoins.png',
    ];

    constructor() {
        super();
        // this.enemy = enemy;
        this.loadImage('img/debugger/9_coins/daCoins.png');
        // this.animate();
    }

    // draw(ctx) {
    //     console.log(`Drawing coin at x=${this.x}, y=${this.y}`);
    //     super.draw(ctx);
    // }
    // createCoinIfEnemyIsDead(enemy) {
    //     if (enemy.isDead) {
    //         this.x = enemy.x;
    //         this.y = enemy.y;
    //         this.loadImage(this.IMAGES_COINS[0]);
    //     }
    // }
    
    // animate() {
    //     setInterval(() => {
    //         if (this.enemy && this.enemy.coinCreated === true) {
    //             this.playAnimation(this.IMAGES_COINS);
    //         }
    //     }, 1000 / 60);
    // }
}
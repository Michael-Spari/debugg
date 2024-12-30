class Coin extends MovableObjects {
    y = this.y;
    x = this.x;
    height = 50;
    width = 50;
    
    IMAGES_COINS = [
        'img/debugger/9_coins/daCoins.png',
    ];

    constructor() {
        super();
        this.loadImage('img/debugger/9_coins/daCoins.png');
        // this.animate();
    }

    

}
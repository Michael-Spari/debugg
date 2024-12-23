class Coin extends MovableObjects {
    y = 380;
    x = 218.5852325759734;
    height = 50;
    width = 50;
    
    IMAGES_COINS = [
        'img/debugger/9_coins/daCoins.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.loadImage('img/debugger/9_coins/daCoins.png');
        // this.animate();
    }

    

}
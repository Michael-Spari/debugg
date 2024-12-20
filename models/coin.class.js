class Coin extends MovableObjects {
    y = 380;
    height = 50;
    width = 50;


constructor() {
    super().loadImage('img/debugger/9_coins/daCoins.png');
    this.x = Math.random() * 500;
    // this.animate();
};
}
class Cloud extends MovableObjects {
    y = 20;
    height = 150;
    width = 500;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 2000;
        this.animate();
    }

    moveLeft() {
        this.x -= 0.2;
    }   

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
class Cloud extends MovableObjects {
    y = 20;
    height = 150;
    width = 500;

    IMAGES_FLY = [
        'img/debugger/5_background/2_second_layer/fly_1.png',
        'img/debugger/5_background/2_second_layer/fly_2.png',
        'img/debugger/5_background/2_second_layer/fly_1.png',
        'img/debugger/5_background/2_second_layer/fly_2.png',
        'img/debugger/5_background/2_second_layer/fly_1.png',
        'img/debugger/5_background/2_second_layer/fly_2.png',
        'img/debugger/5_background/2_second_layer/fly_1.png',
        'img/debugger/5_background/2_second_layer/fly_2.png',
    ];
        

    constructor() {
        super().loadImage('img/debugger/5_background/2_second_layer/fly_1.png');
        this.loadImages(this.IMAGES_FLY);
        this.x = Math.random() * 5000;
        this.animate();
    }

    moveLeft() {
        this.x -= 1.2;
    }   

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.playAnimation(this.IMAGES_FLY);
        }, 1000 / 240);
    }
}
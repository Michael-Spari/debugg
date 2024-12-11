class Bug extends MovableObjects {
    y = 380;
    height = 40;
    width = 40;
    IMAGES_WALK = [
        'img/debugger/3_enemies_bug/bug_w_21.png',
        'img/debugger/3_enemies_bug/bug_w_22.png',
    ]

    constructor() {
        super().loadImage('img/debugger/3_enemies_bug/bug_w_21.png');
        this.loadImages(this.IMAGES_WALK);
        this.x = 200 + Math.random() * 500;
        this.speed = 0.3 + Math.random() * 1.0;
        this.animate();
    }
    
    animate() {
        this.moveLeft();
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALK.length;
            let path = this.IMAGES_WALK[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 20);

    }
}
class BackgroundObject extends MovableObjects {

    width = 720;
    height = 480;
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;    
    }
}
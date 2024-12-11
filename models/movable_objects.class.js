class MovableObjects {
    x = 120;
    y = 250;
    img;
    height = 180;
    width = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('move right');
    }   
    moveLeft() {
        console.log('move left');
    }
}
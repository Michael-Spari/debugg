class MovableObjects {
    x = 100;
    y = 100;
    img;
    height = 180;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.2;
    otherDirection = false;
    speedy = 0;
    acceleration = 2.5;

    applyGravity(){
        setInterval(() => {
            if (this.ifAboveGround() || this.speedy > 0) {   
                this.y -= this.speedy;   
                this.speedy -= this.acceleration;
            }
        }, 1000 / 25);
    }

    ifAboveGround(){
        return this.y < 152;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**@param {Array} arr*/

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        console.log('move right');
    }   
    moveLeft() {
        console.log('move left');
    }
 
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}
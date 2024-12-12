class Character extends MovableObjects {
    height = 280;
    width = 150;
    x = 100;
    y = 152;
    speed = 1.3;

    IMAGES_WALK = [
        'img/debugger/2_character_michael/walk/w-21.png',
        'img/debugger/2_character_michael/walk/w-22.png',
        'img/debugger/2_character_michael/walk/w-23.png',
        'img/debugger/2_character_michael/walk/w-24.png',
        'img/debugger/2_character_michael/walk/w-25.png',
        'img/debugger/2_character_michael/walk/w-26.png',
        'img/debugger/2_character_michael/walk/w-27.png',
        'img/debugger/2_character_michael/walk/w-28.png',
        'img/debugger/2_character_michael/walk/w-29.png',
        'img/debugger/2_character_michael/walk/w-30.png',
        'img/debugger/2_character_michael/walk/w-31.png',
        'img/debugger/2_character_michael/walk/w-32.png',
        'img/debugger/2_character_michael/walk/w-33.png',
        'img/debugger/2_character_michael/walk/w-34.png',
        'img/debugger/2_character_michael/walk/w-35.png',
        'img/debugger/2_character_michael/walk/w-36.png',
        'img/debugger/2_character_michael/walk/w-37.png',
    ];
    world;

    constructor() {
        super().loadImage('img/debugger/2_character_michael/walk/w-21.png');
        this.loadImages(this.IMAGES_WALK);
        
        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT&& this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
            
                //walk animation

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.x += this.speed;
            
                //walk animation
            let i = this.currentImage % this.IMAGES_WALK.length;
            let path = this.IMAGES_WALK[i];
            this.img = this.imageCache[path];
            this.currentImage++;
             }

        }, 1000 / 20);

    }

    jump() {
    }
}
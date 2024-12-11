class Character extends MovableObjects {
    height = 250;
    width = 110;
    x = 120;
    y = 180;
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

    constructor() {
        super().loadImage('img/debugger/2_character_michael/walk/w-21.png');
        this.loadImages(this.IMAGES_WALK);
        
        this.animate();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImage % this.IMAGES_WALK.length;
            let path = this.IMAGES_WALK[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 1000 / 20);

    }

    jump() {
    }
}
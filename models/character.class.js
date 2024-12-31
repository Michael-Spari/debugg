class Character extends MovableObjects {
    height = 190;
    width = 115;
    x = 100;
    y = 100;
    speed = 2.3; 

    offset = {
        x: 26,
        y: -5, 
        width: 60,
        height: 20,
    } 

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

    IMAGES_JUMPING = [
        // 'img/debugger/2_character_michael/walk/w-21.png',    
        'img/debugger/2_character_michael/jump/jump_10.png',    
        // 'img/debugger/2_character_michael/walk/w-21.png',  
      
       ];  

    IMAGES_DEATH = [
        'img/debugger/2_character_michael/death/death_1.png',
    ];

    IMAGES_HURT = [
        'img/debugger/2_character_michael/hurt/hurt_10.png',
        // 'img/debugger/2_character_michael/walk/w-21.png',
    ];

    IMAGES_GROUND = [
        'img/debugger/2_character_michael/walk/w-21.png',   
    ];

    world; 
    walking_sound = new Audio('./audio/walk6.mp4');

    constructor() {
        super().loadImage('img/debugger/2_character_michael/walk/w-21.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
   
        this.animate();
    }

    animate() {

        setInterval(() => {
            // this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }

            if (this.world.keyboard.SPACE && !this.ifAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
            
                //walk animation

        setInterval(() => {

            if(this.isDeath()){
                this.playAnimation(this.IMAGES_DEATH);
                this.speed = 0;

            }  else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);

            }  else if (this.ifAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);

            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALK);
            } else {
                this.playAnimation(this.IMAGES_GROUND);
            }
        }, 1000 / 20);
    }
}
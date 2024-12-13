class Bug extends MovableObjects {
    y = 380;
    height = 45;
    width = 45;
    IMAGES_WALK = [
        'img/debugger/3_enemies_bug/bug_w_21.png',
        'img/debugger/3_enemies_bug/bug_w_22.png',
    ]
    walking_sound = new Audio('./audio/bugs_run1.mp3');

    constructor() {
        super().loadImage('img/debugger/3_enemies_bug/bug_w_21.png');
        this.loadImages(this.IMAGES_WALK);
        this.x = 200 + Math.random() * 2500;
        this.speed = 0.3 + Math.random() * 1.0;
        this.animate();
    }
    
    animate() {
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
            this.walking_sound.volume = 0.3; // Set the volume (0.0 to 1.0)
            // this.walking_sound.play();
        }, 1000 / 20);

    }
}
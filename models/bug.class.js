class Bug extends MovableObjects {
    y = 280;
    x = 100;
    height = 145;
    width = 145;
    
    
    IMAGES_WALK = [
        'img/debugger/3_enemies_bug/bug_w_21.png',
        'img/debugger/3_enemies_bug/bug_w_22.png',
    ];

    IMAGES_DEATH = [
        'img/debugger/3_enemies_bug/bug_w_21.png',
    ];

    walking_sound = new Audio('./audio/bugs_run1.mp3');

    constructor() {
        super().loadImage('img/debugger/3_enemies_bug/bug_w_21.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEATH);
        this.x = 200 + Math.random() * 2500;
        this.speed = 0.3 + Math.random() * 1.0;
        this.animate();
    }

    moveLeft() {
        if (!this.isDeath()) { // Prüfe Eltern-Methode
            this.x -= this.speed;
        }
    }

    animate() {
        setInterval(() => {
            if (this.isDeath()) {
                this.playAnimation(this.IMAGES_DEATH);
                this.speed = 0; // Bewegung stoppen
                if (this.y < 500) this.y += 5; // Gegner fällt zu Boden
            } else {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 1000 / 30);
    }
}
    
    // animate() {
    //     setInterval(() => {
    //         this.moveLeft();  
    //     }, 1000 / 60);
        
    //     setInterval(() => {
    //         this.playAnimation(this.IMAGES_WALK);
    //         this.walking_sound.volume = 0.1; // Set the volume (0.0 to 1.0)
    //         // this.walking_sound.play();
    //     }, 1000 / 20);
    // }

class Bug extends MovableObjects {
    y = 370;
    height = 50;
    width = 50;

    constructor() {
        super().loadImage('img/debugger/3_enemies_bug/bug_w_21.png');
        this.x = 200 + Math.random() * 500;
    }

}
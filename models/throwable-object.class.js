class ThrowableObjects extends MovableObjects {

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

    }

    constructor(x, y) {
        super().loadImage('img/debugger/6_hammer/hammer_10.png');
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.throw();       
    }

    throw() {
        this.speedy = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

}
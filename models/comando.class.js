class Comando extends MovableObjects {
    constructor() {
        super();
        this.img = new Image();
        this.img.src = 'img/debugger/plattforms/comando_1.png';
        this.x = 6650;
        this.y = 235;
        this.width = 300;
        this.height = 180;
        this.collided = false; // Status, ob bereits betreten
    }
} 
class Plattform extends MovableObjects {
    constructor() {
        super();
        this.img = new Image();
        this.img.src = 'img/debugger/plattforms/plattform-2.png';
        this.x = 3300;
        this.y = 300;
        this.width = 150;
        this.height = 150;
        this.collided = false; // Status, ob bereits betreten
    }

    isChecked() {
        if (this.collided === true) {
            this.img.src = 'img/debugger/plattforms/plattform-1.png';
        }
        return this.collided;
    }
}

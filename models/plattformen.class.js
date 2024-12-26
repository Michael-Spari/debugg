class Plattform extends DrawableObjects {
    constructor() {
        super();
        this.img = new Image();
        this.img.src = 'img/debugger/plattforms/plattform-1.png';
        this.x = 380;
        this.y = 300;
        this.width = 150;
        this.height = 150;
    }

    // isColliding(character) {
    //     return (
    //         character.x + character.width > this.x &&
    //         character.x < this.x + this.width &&
    //         character.y + character.height > this.y &&
    //         character.y < this.y + this.height
    //     );
    // }
}
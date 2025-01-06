/**
 * Represents a Comando object that extends the MovableObjects class.
 * @class Comando
 * @extends MovableObjects
 */
class Comando extends MovableObjects {
    /**
     * Creates an instance of the Comando class.
     * Initializes the image, position, size, and collision state.
     */
    constructor() {
        super();
        this.img = new Image();
        this.img.src = 'img/debugger/plattforms/comando_1.png';
        this.x = 6650;
        this.y = 235;
        this.width = 300;
        this.height = 180;
        this.collided = false;
    }
}

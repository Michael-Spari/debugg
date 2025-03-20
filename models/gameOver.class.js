/**
 * Represents the Game Over screen that is displayed when the player loses.
 * It includes a restart button to reload the game.
 * @class GameOver
 * @extends DrawableObjects
 */
class GameOver extends DrawableObjects {
    /**
     * Creates an instance of the GameOver object and initializes its properties.
     * @constructor
     * @param {Character} character - The character object, used to reference the character in the game.
     */
    constructor(character) {
        super();
        this.character = character;
        this.loadImage('img/debugger/10_game_over/game_over_2.png');
        this.x = -1000;
        this.y = 80;
        this.width = 500;
        this.height = 300;

        /**
         * The restart button that appears when the game is over.
         * @type {HTMLButtonElement}
         */
        this.button = this.createRestartButton();
    }

    /**
     * Creates the "Restart" button that allows the player to reload the game.
     * @returns {HTMLButtonElement} The created restart button.
     */
    createRestartButton() {
        let existingButton = document.getElementById('restartButton');
        if (existingButton) {
            existingButton.remove(); // Falls bereits vorhanden, entferne ihn
        }

        const button = document.createElement('button');
        button.id = 'restartButton';
        button.innerText = 'Restart';
        button.style.position = 'absolute';
        button.style.cursor = 'pointer';
        button.style.backgroundColor = 'red';
        button.style.borderRadius = '15px';
        button.style.color = 'white';
        button.style.left = '50%';
        button.style.transform = 'translateX(-50%)';
        button.style.top = '50%';
        button.style.transform += ' translateY(-50%)';
        button.style.width = '100px';
        button.style.height = '30px';
        button.style.fontSize = '14px';
        button.style.zIndex = 1000;
        button.style.display = 'none';
        button.onclick = () => {
            const canvas = document.getElementById('canvas');
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            world = new World(canvas, keyboard);
            world.level.enemies = [];
            CoinsCounter.getInstance().reset();
            SprayCounter.getInstance().reset();    
            world.level.loadEnemies();
            button.remove();
          }; 
        document.getElementById('fullscreen').appendChild(button); 
        return button;
    }

    /**
     * Makes the restart button visible when the game is over.
     */
    buttonVisibility() {
        this.button.style.display = 'block';
    }
}


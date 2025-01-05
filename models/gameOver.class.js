class GameOver extends DrawableObjects {
    constructor(character) {
        super();
        this.character = character;
        this.loadImage('img/debugger/10_game_over/game_over_2.png');
        this.x = -1000;
        this.y = 80;
        this.width = 500;
        this.height = 300;
        this.button = this.createRestartButton();
    }

    createRestartButton() {
        const button = document.createElement('button');
        // button.classList.add('button-jump');
        button.innerText = 'Restart';
        button.style.position = 'absolute';
        button.style.backgroundColor = 'red';
        button.style.borderRadius = '15px';
        button.style.color = 'white';
        button.style.left = '50%';
        button.style.transform = 'translateX(-50%)';
        button.style.top = `${this.y + this.height + 20}px`;
        button.style.width = '100px';
        button.style.height = '30px';
        button.style.fontSize = '14px';
        button.style.zIndex = 1000;
        button.style.display = 'none'; // Initially hidden
        button.onclick = () => {
            location.reload();
        };
        document.body.appendChild(button);
        return button;
    }
    buttonVisibility() {
        this.button.style.display = 'block';
    }
}

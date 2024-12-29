class Finish extends DrawableObjects {
    constructor() {
        super();
        this.loadImage('img/debugger/11_finish/finish.png');
        this.x = 1000;
        this.y = 100;
        this.width = 250;
        this.height = 150;

        // Initialisiere die Lauftext-Elemente
        this.textContainer = document.createElement('div');
        this.textContainer.style.zIndex = '1000';
        this.textContainer.id = 'typewriter-container';
        this.textContainer.style.position = 'absolute'; // Position absolute to the canvas
        this.textContainer.style.left = `${this.x}px`;
        this.textContainer.style.top = `${this.y + this.height}px`; // Position below the image
        this.textContainer.style.width = '200px';
        this.textContainer.style.height = '150px';
        this.textContainer.style.backgroundColor = 'black';
        this.textContainer.style.color = 'white';
        this.textContainer.style.fontFamily = 'monospace';
        this.textContainer.style.fontSize = '20px';
        this.textContainer.style.padding = '10px';
        this.textContainer.style.overflow = 'hidden';
        this.textContainer.style.whiteSpace = 'pre-wrap'; // Allow text wrapping

        // Append the text container to the canvas
        const canvas = document.querySelector('canvas');
        canvas.parentNode.insertBefore(this.textContainer, canvas.nextSibling);

        this.text = "Herzlichen Glückwunsch! Du hast das Spiel abgeschlossen. Vielen Dank fürs Spielen!";
        this.displayText = "";
        this.typingIndex = 0;
        this.textSpan = document.createElement('span');
        this.textContainer.appendChild(this.textSpan);

        this.typewriterEffect();
    }

    typewriterEffect() {
        const typingInterval = setInterval(() => {
            if (this.typingIndex < this.text.length) {
                this.displayText += this.text[this.typingIndex];
                this.textSpan.textContent = this.displayText;
                this.typingIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100); // Geschwindigkeit des Tippens
    }

    draw(ctx) {
        super.draw(ctx);
        // Update the position of the text container to follow the image
        this.textContainer.style.left = `${this.x}px`;
        this.textContainer.style.top = `${this.y + this.height}px`;
    }
}
/**
 * Represents the Finish object in the game, displaying a message and coin count when the game is completed.
 * This class extends DrawableObjects to display a finish screen with a typing effect and coin count.
 * @class Finish
 * @extends DrawableObjects
 */
class Finish extends DrawableObjects {
    TYPEWRITER_SOUND;
    soundEnabled = true;

    /**
     * Creates an instance of the Finish object and initializes properties related to the finish screen.
     * @constructor
     */
    constructor() {
        super();
        this.loadImage('img/debugger/11_finish/laptop.png');
        this.x = 1000;
        this.y = 60;
        this.width = 600;
        this.height = 380;
        this.padding = 130;
        this.topPadding = 50;
        this.lineHeight = 20;

        /**
         * The current coin count from the CoinsCounter instance.
         * @type {number}
         */
        this.coinCount = CoinsCounter.getInstance().coinCount;

        /**
         * The message to display on the finish screen, including the coin count.
         * @type {string}
         */
        this.text = `Congratulations! You have debugged the map and collected ${this.coinCount} Developer Akademie coins. Thank you for playing!`;

        /**
         * The text that is currently displayed, for the typewriter effect.
         * @type {string}
         */
        this.displayText = "";

        /**
         * The index of the character being typed in the typewriter effect.
         * @type {number}
         */
        this.typingIndex = 0;

        /**
         * The interval ID for the typing effect.
         * @type {number|null}
         */
        this.typingInterval = null;

        /**
         * The interval ID for updating the coin count.
         * @type {number|null}
         */
        this.coinUpdateInterval = null;

        this.TYPEWRITER_SOUND = this.createAndRegisterAudio('audio/typewriter.mp3');
        this.startCoinUpdate();
    }

    /**
     * Creates an audio element and registers it for global management.
     * @param {string} src - The source of the audio file.
     * @returns {HTMLAudioElement} The registered audio element.
     */
    createAndRegisterAudio(src) {
        const audio = new Audio(src);
        registerSound(audio); // Add audio to the global array
        const storedSoundSetting = localStorage.getItem('soundsEnabled');
        if (storedSoundSetting !== null) {
            soundsEnabled = JSON.parse(storedSoundSetting);
        }
        audio.volume = soundsEnabled ? 1 : 0; // Ensure the initial state respects soundsEnabled
        return audio;
    }

    /**
     * Starts the typewriter effect to display the finish text character by character.
     */
    startTypewriterEffect() {
        this.typingInterval = setInterval(() => {
            if (this.typingIndex < this.text.length) {
                this.displayText += this.text[this.typingIndex];
                this.typingIndex++;
            if(soundsEnabled)
                this.TYPEWRITER_SOUND.play();
            } else {
                clearInterval(this.typingInterval);
                clearInterval(this.coinUpdateInterval);
            }
        }, 500);
    }

    /**
     * Starts the coin update process to refresh the coin count if it changes.
     */
    startCoinUpdate() {
        this.coinUpdateInterval = setInterval(() => {
            const currentCoinCount = CoinsCounter.getInstance().coinCount;
            if (currentCoinCount !== this.coinCount) {
                this.coinCount = currentCoinCount;
                this.text = `Congratulations! You have debugged the map and collected ${this.coinCount} Developer Akademie coins. Thank you for playing!`;
            }
        }, 100);
    }

    /**
     * Wraps the text into multiple lines if it exceeds the specified maximum width.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {string} text - The text to be wrapped.
     * @param {number} x - The x-coordinate for the text start position.
     * @param {number} y - The y-coordinate for the text start position.
     * @param {number} maxWidth - The maximum width before wrapping.
     * @param {number} lineHeight - The height between lines.
     */
    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(" ");
        let line = "";
        let lines = [];
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + " ";
            const testWidth = ctx.measureText(testLine).width;
            if (testWidth > maxWidth && n > 0) {
                lines.push(line);
                line = words[n] + " ";
            } else {
                line = testLine;
            }
        }
        lines.push(line);
        lines.forEach((line, index) => {
            ctx.fillText(line, x, y + index * lineHeight);
        });
    }

    /**
     * Draws the finish screen, including the typing text and the coin icon.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        super.draw(ctx);
        ctx.font = '16px monospace';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        this.wrapText(
            ctx,
            this.displayText,
            this.x + this.padding,
            this.y + this.topPadding,
            this.width - 2 * this.padding,
            this.lineHeight
        );

        // Draw the coin icon
        const iconImage = new Image();
        iconImage.src = 'img/debugger/9_coins/daCoins.png';
        ctx.drawImage(
            iconImage,
            this.x + this.padding,
            this.y + this.height - this.padding - 50, 60, 60);
    }
}



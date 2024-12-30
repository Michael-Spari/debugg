class Finish extends DrawableObjects {
    constructor() {
        super();
        this.loadImage('img/debugger/11_finish/finish.png');
        this.x = 1000; // X-Ausrichtung des Bildes
        this.y = 150; // Y-Ausrichtung des Bildes
        this.width = 520; // Maximale Breite des Bildes
        this.height = 200; // Maximale Höhe des Bildes
        this.lineHeight = 20; // Zeilenhöhe für den Text

        this.text = "Herzlichen Glückwunsch! Du hast das Spiel abgeschlossen. Vielen Dank fürs Spielen!";
        this.displayText = ""; // Der aktuell angezeigte Text
        this.typingIndex = 0; // Der Index des Buchstabens, der gerade getippt wird
        this.typingInterval = null; // Interval für den Schreibmaschineneffekt

        this.startTypewriterEffect(); // Starte den Schreibmaschineneffekt
    }

    startTypewriterEffect() {
        this.typingInterval = setInterval(() => {
            if (this.typingIndex < this.text.length) {
                this.displayText += this.text[this.typingIndex]; // Buchstabe hinzufügen
                this.typingIndex++;
            } else {
                clearInterval(this.typingInterval); // Schreibmaschineneffekt beenden
            }
        }, 100); // Geschwindigkeit des Tippens
    }

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

    draw(ctx) {
        super.draw(ctx);

        // Text-Stil festlegen
        ctx.font = '16px monospace'; // Schriftart und Größe
        ctx.fillStyle = 'white'; // Textfarbe
        ctx.textAlign = 'left'; // Text linksbündig
        ctx.textBaseline = 'top'; // Text-Baseline

        // Text mit Zeilenumbruch zeichnen
        this.wrapText(ctx, this.displayText, this.x, this.y, this.width, this.lineHeight);
    }
}


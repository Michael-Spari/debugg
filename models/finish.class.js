class Finish extends DrawableObjects {
    constructor() {
        super();
        this.loadImage('img/debugger/11_finish/laptop.png');
        this.x = 1000; // X-Ausrichtung des Bildes
        this.y = 60; // Y-Ausrichtung des Bildes
        this.width = 600; // Maximale Breite des Bildes
        this.height = 380; // Maximale Höhe des Bildes
        this.padding = 130; // Abstand links und rechts
        this.topPadding = 50; // Abstand oben
        this.lineHeight = 20; // Zeilenhöhe für den Text

        this.coinCount = CoinsCounter.getInstance().coinCount; // Anfangsstand der Münzen
        this.text = `Herzlichen Glückwunsch! Du hast die Map debuggt und ${this.coinCount} Developer Akademie Coins gesammelt. Vielen Dank fürs Spielen!`;
        this.displayText = ""; // Der aktuell angezeigte Text
        this.typingIndex = 0; // Der Index des Buchstabens, der gerade getippt wird
        this.typingInterval = null; // Interval für den Schreibmaschineneffekt
        this.coinUpdateInterval = null; // Interval für das Abfragen der Münzen
        // this.startTypewriterEffect(); // Starte den Schreibmaschineneffekt
        this.startCoinUpdate(); // Starte das Münz-Update
    }

    startTypewriterEffect() {
        this.typingInterval = setInterval(() => {
            if (this.typingIndex < this.text.length) {
                this.displayText += this.text[this.typingIndex]; // Buchstabe hinzufügen
                this.typingIndex++;
            } else {
                clearInterval(this.typingInterval); // Schreibmaschineneffekt beenden
                clearInterval(this.coinUpdateInterval); // Münz-Update stoppen
            }
        }, 500); // Geschwindigkeit des Tippens
    }

    startCoinUpdate() {
        this.coinUpdateInterval = setInterval(() => {
            const currentCoinCount = CoinsCounter.getInstance().coinCount;
            if (currentCoinCount !== this.coinCount) {
                this.coinCount = currentCoinCount;
                this.text = `Herzlichen Glückwunsch! Du hast die Map debuggt und ${this.coinCount} Developer Akademie Coins gesammelt. Vielen Dank fürs Spielen!`;
            }
        }, 100); // Intervall für das Münz-Update (100ms)
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
        this.wrapText(
            ctx,
            this.displayText,
            this.x + this.padding, // Linker Abstand
            this.y + this.topPadding, // Oberer Abstand (50px)
            this.width - 2 * this.padding, // Verfügbare Breite (Abstand links und rechts abziehen)
            this.lineHeight
        );

        // Zusätzliche Münze zeichnen
        const iconImage = new Image();
        iconImage.src = 'img/debugger/9_coins/daCoins.png'; // Pfad zum Bild
        ctx.drawImage(
            iconImage,
            this.x + this.padding, // Position: Abstand links
            this.y + this.height - this.padding - 50, // Position: Abstand unten
            60, // Breite
            60 // Höhe
        );
    }
}


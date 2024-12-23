class DrawableObjects {
    x = 100;
    y = 100;
    height = 180;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Bug || this instanceof Endboss || this instanceof ThrowableObjects) {
            ctx.beginPath();
            ctx.lineWidth = '0';
            ctx.strokeStyle = '0';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawOffsetFrame(ctx) {
        if (this instanceof Character || this instanceof Bug || this instanceof Endboss || this instanceof ThrowableObjects) {
            ctx.beginPath();
            ctx.lineWidth = '0';
            ctx.strokeStyle = '0';
            ctx.rect(
                this.x + this.offset.x,
                this.y + this.offset.y,
                this.width - this.offset.width,
                this.height - this.offset.height
            );
            ctx.stroke();
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}
